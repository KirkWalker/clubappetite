'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} = React;


var mock_token = 'CAAMHEaDezm4BAMqDHU41mERKbuaa0MMSqrUP1THss8eVUZBH6ZCyOuJZAdkP04nGaQStQk0XDAtP0GZBGuCb0qe50TEiSpZBUw4wFqBOUXBKRUgSJ0O5bX3zgE7IqbyQKxK0Sc7zBykoyYiq4fiIkKk8qPYCW3vuJ5OZCHmUPZBUxM3qGz2Ah0QyJUQbPSvEfUZD';


var styles = require('../styles');
var FBLogin = require('react-native-facebook-login');
var Users = require('../datalayer/User');
var FBLoginManager = require('NativeModules').FBLoginManager;

var result;

class LoginPage extends Component {



  constructor(props) {
      super(props);
      this.state = { data: null};
      this.navigatorObj = props.navigator;
      //console.log(mock_token);
  }

  render() {

      var _this = this;
        //console.log(this.state.data);
        //console.log('end data');
      return (

        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Please login to Facebook.</Text>
          </View>

          <View style={styles.content}>
            <FBLogin
                onLogin={function(data){

                  var newData = '';
                  console.log('Login:onLogin');
                  /*
                  The response is different depending on the platform
                  Nice, this took forever to figure out
                  The FDSDK is incomplete and doesn't work, we resort to old school fetch from url to get image.
                  */
                  if(data.credentials){
                    newData = data.credentials;
                  } else{
                    newData = data;
                  }

                  _this.navigatorObj.push({
                      id: 'MainPage',
                      name: 'Main Page',
                      data: newData,
                  });
                }}
                onLogout={function(e){
                  console.log('Login:onLogout')
                  Users.eraseUsers();
                }}
                onCancel={function(e){console.log(e)}}
                onPermissionsMissing={function(e){console.log(e)}}
              />
          </View>


        </View>

      );
  }
  gotoNext() {
    this.props.navigator.push({
      id: 'MainPage',
      name: 'Main Page',
    });
  }
}

module.exports = LoginPage;