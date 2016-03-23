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

var SERVER_URL = 'http://restapi.clubappetite.com/api.php';
var DEBUG = false;

module.exports = {

    getReferalCode(_this){

        DEBUG = false;

        var _user_profile = _this.state.user_profile;
        var token = _user_profile.token;
        var name = _user_profile.name;

        if(DEBUG) { console.log('token:', token); }

        //http://restapi.clubappetite.com/api.php?controller=api&action=getreferralcode&token=
        fetch(SERVER_URL + '?controller=api&action=getreferralcode', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token: token,
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            if(responseData.result == 'error'){
                console.log('User Class getreferralcode ERROR:',responseData);
            } else {

                if(DEBUG) { console.log('getreferralcode: responseData=', responseData); }
                DB.users.update({name: name}, { refer_code: responseData.details.refer_code }, function(updated_table){
                    if(DEBUG) { console.log('done updating code:', updated_table.users); }

                    _user_profile.refer_code = responseData.details.refer_code;
                    _this.setState({user_profile: _user_profile});

                })

            }
        })
        .catch(function(error) {
            console.log('getreferralcode request failed', error);
        })
        .done();


    },

    addPoints(_user_profile,_amount,_first_name,_last_name){

        //DEBUG = true;

        var token = _user_profile.token;
        var current_points = _user_profile.user_points;
        var name = _user_profile.name;

        if(DEBUG) { console.log('name:', name); }
        if(DEBUG) { console.log('_user_profile:', _user_profile); }

        var new_points = Number(current_points) + (Number(_amount)*100);

        if(new_points>0){
            //http://restapi.clubappetite.com/api.php?controller=api&action=transaction&token=1xT7Q6Fb7wfX847fQvpUI6Scq3NWGzC8gTA&first_name=kirk&last_name=walker&amount=10
            fetch(SERVER_URL + '?controller=api&action=transaction', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  token: token,
                  first_name: _first_name,
                  last_name: _last_name,
                  amount: _amount,
                })
            })
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.result == 'error'){
                    console.log('User Class ERROR:',responseData);
                } else {

                    if(DEBUG) { console.log('updatePoints: responseData=', responseData); }


                    DB.users.update({name: name}, { user_points: new_points, first_name: _first_name, last_name:_last_name }, function(updated_table){
                        if(DEBUG) { console.log('done adding points:', updated_table.users); }
                    })

                }
            })
            .catch(function(error) {
                console.log('updateToken request failed', error);
            })
            .done();

        }
    },


    eraseUsers(){
        var value = AsyncStorage.removeItem('db_store');

        /*
        This does not remove the data from the server.
        Login will sync the server with new data if needed
        */

        DB.users.erase_db(function(removed_data){
            if(DEBUG){
               console.log('Users: remove data result 1');
               console.log(removed_data);
               console.log('------------------ 1');
            }

        });


    },
    eraseInfopages(){
        /*
        Don't use this. We want to store infopage data after logout
        */
        DB.infopage.erase_db(function(removed_data){
            if(DEBUG){
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
        //_this.eraseInfopages();

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


        var self = this;

        /*
        Check to see if this user is already logged in once with Facebook
        If a record exists in the local datalayer we skip ahead and set the state
        with the result set
        */


        if (_this.mounted === true){ //very important, keep this from firing multiple times.


            DB.users.get_all(function(results){

                if(results.totalrows == 0){ // user not in local datalayer

                    /*
                    The user has not logged in.
                    We send them back to login again as something has gone wrong
                    */
                    if(DEBUG) { console.log('moving to login',results); }
                    if(_this.nologin == undefined){
                        _this.props.navigator.push({id: 'LoginPage'});
                    }

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

                    if(DEBUG) { console.log('User profile found:',results); }


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

                            self.eraseUsers();
                            _this.props.navigator.push({id: 'LoginPage'});


                        } else {

                            if(DEBUG) { console.log('updateToken: responseData=', responseData); }


                             if(responseData.token){

                                var token = responseData.token;

                                if(DEBUG) { console.log('updateToken:db',token); }
                                //var userid = _this.state.user_profile.userid;
                                var name = _this.state.user_profile.name;

                                DB.users.update({name: name}, { token: token }, function(updated_table){
                                    data.token = token;
                                    _this.setState({user_profile:data});
                                    if(DEBUG) { console.log('done updating users:', updated_table); }
                                })

                             } else {
                                _this.setState({user_profile:data});
                             }

                        }




                    })
                    .catch(function(error) {
                        console.log('updateToken request failed', error);
                        _this.setState({user_profile:data});
                    })
                    .done();


                }

            })
        }

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
                    if(DEBUG) {
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

    },
    handleRegister(_this){

        var username = _this.state.inputTxt;
        var password = _this.state.inputPass;
        var email = _this.state.inputEmail;
        var loc = _this.state.location;
        var referralCode = _this.state.referralCode;
        var sublocality = _this.state.sublocalitiesIds[_this.state.locationIndex];
        var API_REQUEST = 'HandleRegister:';
        var error_message = '';

        if(username == '' || password == '' || email == '') {
            error_message = 'Please fill in all the form fields';
        } else if(email.indexOf("@") == -1 || email.indexOf(".") == -1) {
            error_message = 'Please enter a valid email';
        } else if(loc == 'Please choose a location:' || loc == '') {
           error_message = 'Please choose a location';
        }

        if(error_message !=''){
            if(Platform.OS === 'ios'){
                AlertIOS.alert(
                 error_message,
                 'Please try again.'
                );
            } else {
                ToastAndroid.show(error_message, ToastAndroid.SHORT);
            }


        } else {


            console.log(API_REQUEST+"data:",SERVER_URL + '?controller=api&action=register');


            fetch(SERVER_URL + '?controller=api&action=register', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: username,
                  password: password,
                  email: email,
                  sublocality: sublocality,
                  referralCode: referralCode,
                })
            })
            .then((response) => response.json())
            .then((responseData) => {

                if(responseData.result == 'error'){

                    console.log(API_REQUEST+' ERROR:',responseData);

                    if(Platform.OS === 'ios'){
                        AlertIOS.alert(
                         responseData.details,
                         'Please try again.'
                        );
                    } else {
                        ToastAndroid.show(responseData.details, ToastAndroid.SHORT);
                    }
                } else if(responseData.result == 'success'){
                    console.log(API_REQUEST+' SUCCESS:',responseData);
                    var user_data = responseData;
                    delete user_data.result;
                    DB.users.add(user_data,function(result){
                        if(DEBUG) {
                        console.log('adding user');
                        console.log(result);
                        }
                        _this.gotoNext();
                    });

                } else {

                     console.log(API_REQUEST+' FAILED', responseData);

                }


            })
            .catch(function(error) {
                console.log(API_REQUEST+' CONNECTION FAILURE:', error);
            })
            .done();
        }
    },

    updateProfile(_data,_this) {


        var API_REQUEST = 'updateProfile:';
        var _user = _data.credentials;


        var api = `https://graph.facebook.com/v2.3/${_user.userId}?fields=name,email,first_name,last_name,gender,link,picture,locale,timezone&access_token=${_user.token}`;
        var _token = _this.state.user_profile.token;


        if(DEBUG) {console.log('Facebook API:',api);}
        if(DEBUG) {console.log('Facebook _user:',_user);}

        if(_token == undefined || _user == undefined){

            console.log('No token:',_user);

        }else{
            fetch(api)
              .then((response) => response.json())
              .then((responseData) => {

                var URL = SERVER_URL + '?controller=api&action=updateuser&token='+_token;
                if(DEBUG) {console.log('Facebook Response:',responseData);}
                if(DEBUG) {console.log('Update with token:',_token);}
                if(DEBUG) {console.log(API_REQUEST+" URL:",URL);}

                fetch(URL, {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        first_name: responseData.first_name,
                        last_name: responseData.last_name,
                        gender: responseData.gender,
                        link: responseData.link,
                        locale: responseData.locale,
                        token: _token,
                    }),
                })
                .then((response2) => response2.json())
                .then((responseData2) => {

                    if(responseData2.result == 'error'){
                        console.log(API_REQUEST+' ERROR:',responseData2);
                    } else {
                        console.log(API_REQUEST+' SUCCESS:',responseData2);

                        _this.setState({
                          user : _data,
                          info : {
                            name : responseData.name,
                            email: responseData.email,
                            first_name: responseData.first_name,
                            last_name: responseData.last_name,
                            gender: responseData.gender,
                            link: responseData.link,
                            picture: responseData.picture,
                            locale: responseData.locale,
                          },
                        });

                    }


                 })
                 .done();

              })
              .done();

        }


    }


};