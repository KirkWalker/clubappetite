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
} = React

var DB = require('./DB.js');
var FBLoginManager = require('NativeModules').FBLoginManager;

module.exports = {


    eraseUsers(){
        /*
        This does not remove the data from the server.
        Login will sync the server with new data if needed
        */
        DB.users.erase_db(function(removed_data){
           console.log('Users: remove data result');
           console.log(removed_data);
           console.log('------------------');
        });

    },
    handleLogout(){
        var _this=this;
        console.log("Users :onLogout!");

        /*
        Handles the logout process with Facebook first
        Then we remove the local data set
        The apps main views look for the dataset and force user to login if absent
        */

        FBLoginManager.logout(function(error, data){
          if (!error) {
            _this.eraseUsers();
          } else {
            console.log(error, data);
          }
        });

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
                _this.props.data is the packet sent from the Login module.
                If this data is present, we need to insert into the database
                When a user logs out, the data is deleted from the local store.

                Saves user profile to local data store
                Async call, it runs last and in the back ground
                When completed, it repopulates the state variable and refreshes the DOM
                */
                if(_this.props.data){

                   console.log("DataLayer : Adding User");

                   var data = _this.props.data;

                   fetch('https://graph.facebook.com/me?fields=id,email,first_name,last_name,gender,link,picture,locale,name,timezone,updated_time,verified&access_token='+data.token, {method: "GET"})
                   .then(response => response.json())
                   .then(json => {
                      console.log('facebook response');

                        //console.log(newStuff);

                        DB.users.add(json,function(result){

                            /*
                            We send a one time post to the server.
                            The server will either add the user or update the users last login time

                            successful result will return additional profile information, like points
                            */

                            _this.setState({user_profile: json}); //<--this runs very last and forces the dom to refresh
                        });


                   })
                   .done();






                } else {

                    /*
                    The user has not logged in with facebook and no data packet was received from Login.
                    We send them back to login again as something has gone wrong
                    */
                    console.log('moving to login');
                    _this.props.navigator.push({id: 'LoginPage'});

                }

            } else {


                /*
                The user has logged in with facebook and a record has been returned from the local database.
                First we must check the server to see if anything has changed since the user last used the app
                This may happen if we introduce a web console and manually add tokens to a user account or similar
                We update our state with this result set once completed
                */

                var nk = [];
                for(var key in results.rows){
                    nk.push(results.rows[key]);
                }
                _this.setState({user_profile:nk[0]});
            }

        })


    }
};