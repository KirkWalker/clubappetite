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




var styles = require('../styles');
var FBLogin = require('react-native-facebook-login');
var Users = require('../datalayer/User');


var result;

class LoginPage extends Component {



  constructor(props) {
      super(props);
      this.state = { data: null};
      this.navigatorObj = props.navigator;

  }

  render() {

      var _this = this;

      return (

        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Please login to Facebook.</Text>
          </View>

          <View style={styles.content}>
            <FBLogin
                onLogin={function(data){
                  console.log('Login:onLogin');
                  console.log('going to main page');
                  _this.navigatorObj.push({
                    id: 'MainPage',
                    name: 'Main Page',
                    data: data,
                  });
                  console.log('done');
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