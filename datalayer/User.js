/**
 * User Model
 *
 * Class to manipulate the User data store and handle user login process
 *
 * React Native Version 0.20.0
 *
 *
 * @category   Data Model
 * @package    User.js
 * @author     Kirk Walker <kirk.walker@clubappetite.com>
 * @version    1.0
 * @since      File available since Release 1.0
 */
var React = require('react-native');
var {
  View,
  Text,
  Platform,
  ToastAndroid,
  AlertIOS,
  AsyncStorage,
} = React

var DB = require('./DB.js');

var SERVER_URL = 'http://appdev.appsolutemg.com/api.php';
var debug = false;

module.exports = {

    eraseUsers(){

        //async eraseUsers(){
        //var value = await AsyncStorage.removeItem('db_store');
        //console.log('Asyc:',value);

        //var value = await AsyncStorage.getItem('db_store');
        //console.log('Asyc:',value);

        /*
        This does not remove the data from the server.
        Login will sync the server with new data if needed

*/
        DB.users.erase_db(function(removed_data){
            //if(debug){
               console.log('Users: remove data result 1');
               console.log(removed_data);
               console.log('------------------ 1');

               DB.users.get_all(function(results2){
                   console.log('Users: remove data check');
                   console.log(results2);
                   console.log('------------------');
               });
               //_this.eraseInfopages();
            //}
        });


    },
    eraseInfopages(){
            /*
            This does not remove the data from the server.
            Login will sync the server with new data if needed
            */
            DB.infopage.erase_db(function(removed_data){
                if(debug){
                   console.log('Infopage: remove data result');
                   console.log(removed_data.results);
                   console.log('------------------');
                }
            });

    },

    handleLogout(){
        var _this=this;
        console.log("Users :onLogout!");

        /*
        Handles the logout process
        We remove the local data set
        The apps main views look for the dataset and force user to login if absent
        */
        _this.eraseUsers();


   },
   getImageUrl(_this){

        /*
        Function to pull the image URL from the profile object
        */
        var pictureData = _this.state.user_profile.picture;
        var nk = [];
        for(var key in pictureData){
            nk.push(pictureData[key].url);
        }
        return nk[0];
    },
    getProfile(_this){

        /*
        Check to see if this user is already logged in once with Facebook
        If a record exists in the local datalayer we skip ahead and set the state
        with the result set
        */
        DB.users.get_all(function(results){

            if(results.totalrows == 0){ // user not in local datalayer

                /*
                The user has not logged in.
                We send them back to login again as something has gone wrong
                */
                if(debug) { console.log('moving to login',results); }
                _this.props.navigator.push({id: 'LoginPage'});


            } else {

                /*
                The user has logged in and a record has been returned from the local database.
                First we must check the server to see if anything has changed since the user last used the app
                This may happen if we introduce a web console and manually add tokens to a user account or similar
                We update our state with this result set once completed
                */

                var data = [];



                for(var key in results.rows){
                    data.push(results.rows[key]);
                }

                /*
                We should check that the token hasn't expired
                If it has we get a new one and update the database
                */
                data = data[0];

                if(debug) { console.log('User profile found:',results); }


                fetch(SERVER_URL + '?controller=api&action=token', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      token: data.token,
                      id: data.userid
                    })
                })
                .then((response) => response.json())
                .then((responseData) => {



                    if(responseData.result == 'error'){
                        console.log('User Class ERROR:',responseData);
                    } else {

                        if(debug) { console.log('updateToken: responseData=', responseData); }


                         if(responseData.token){

                            var token = responseData.token;

                            if(debug) { console.log('updateToken:db',token); }
                            //var userid = _this.state.user_profile.userid;
                            var name = _this.state.user_profile.name;

                            DB.users.update({name: name}, { token: token }, function(updated_table){
                                data.token = token;
                                _this.setState({user_profile:data});
                                if(debug) { console.log('done updating users:', updated_table); }
                            })

                         } else {
                            _this.setState({user_profile:data});
                         }

                    }




                })
                .catch(function(error) {
                    console.log('updateToken request failed', error);
                })
                .done();

                _this.setState({user_profile:data});
            }

        })


    },

    handleLogin(_username,_password,_this){
        fetch(SERVER_URL + '?controller=api&action=login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: _username,
              password: _password,
            })
        })
        .then((response) => response.json())
        .then((responseData) => {

            var resData = JSON.parse(responseData);
            if(resData.result == 'error'){
                if(Platform.OS === 'ios'){
                    AlertIOS.alert(
                     'Login Has Failed',
                     'Please try again.'
                    );
                } else {
                    ToastAndroid.show('Login Has Failed', ToastAndroid.SHORT);
                }
            } else {
                var user_data = resData;
                delete user_data.result;
                //console.log(user_data);

                DB.users.add(user_data,function(result){
                    if(debug) {
                    console.log('adding user');
                    console.log(result);
                    }
                    _this.gotoNext();
                });

            }

        })
        .catch(function(error) {
            console.log('Login request failed', error);
        })
        .done();

    }

};