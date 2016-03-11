'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  Picker,
    TouchableHighlight,
    TouchableOpacity,
    ToastAndroid,
    TextInput,
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
      this.state = { inputTxt: 'Username', inputPass: 'Password', data: null, language: "kelowna"};
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
            <Text style={styles.title}>Please login to Club Appetite.</Text>
          </View>


{/*

I think we have to abandon this as the user must choose from one of our pre-defined regions

          <View style={styles.facebook}>
            <FBLogin
                onLogin={function(data){

                  var newData = '';
                  console.log('Login:onLogin');

                 // The response is different depending on the platform
                  //Nice, this took forever to figure out
                  //The FDSDK is incomplete and doesn't work, we resort to old school fetch from url to get image.

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

            <Text>Or login with your Club Appetite Account</Text>
*/}

                <View style={styles.contentForm}>
                  <View style={styles.module}>

                  <Picker
                                  style={styles.picker}
                                  selectedValue={this.state.language}
                                  onValueChange={(lang) => this.setState({language: lang})}>
                                  <Picker.Item label="Please choose your location" value="" />
                                  <Picker.Item label="Kelowna" value="kelowna" />
                                  <Picker.Item label="Vancouver" value="vancouver" />
                                </Picker>
                    <TextInput style={styles.input} onFocus={this.onUserFocus.bind(this)} onBlur={this.onUserBlur.bind(this)} onChangeText={(text) => this.setState({inputTxt: text})} value={this.state.inputTxt} />
                    <TextInput style={styles.input} onFocus={this.onPassFocus.bind(this)} onBlur={this.onPassBlur.bind(this)} onChangeText={(text) => this.setState({inputPass: text})} value={this.state.inputPass}  />
                  </View>

                  <View style={styles.module}>
                    <TouchableHighlight onPress={this._onPressButtonPOST.bind(this)} style={styles.button}>
                    <Text>Login</Text>
                    </TouchableHighlight>
                  </View>



                </View>

<View style={styles.contentForm}>
                <Text>Or create your Club Appetite Account</Text>
</View>
<View style={styles.banner}>

<Text>Banner ad</Text>
</View>
        </View>

      );
  }
  onUserFocus() {
  	if(this.state.inputTxt == "Username") {
  		this.setState({inputTxt: ''});
  	}
  }

  onUserBlur() {
  	if(this.state.inputTxt == "") {
  		this.setState({inputTxt: 'Username'});
  	}
  }

  onPassFocus() {
  	if(this.state.inputPass == "Password") {
  		this.setState({inputPass: ''});
  	}
  }

  onPassBlur() {
  	if(this.state.inputPass == "") {
  		this.setState({inputPass: 'Password'});
  	}
  }
  gotoNext() {
    this.props.navigator.push({
      id: 'MainPage',
      name: 'Main Page',
    });
  }

    _onPressButtonPOST() {


      //var username = this.state.inputTxt;
      //console.log('State :', this.state.inputTxt);
      var username = this.state.inputTxt;
      var password = this.state.inputPass;

      fetch('http://cj.kirkwalker.ca/api/login/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      })
      .then((response) => response.json())
      .then((responseData) => {

   		var resData = JSON.parse(responseData);

          console.log('Response:', resData);

  	  	if(resData.res == 'error'){
  	  		//ToastAndroid.show('Login Has Failed', ToastAndroid.SHORT);
  	  	} else {

  	  		//this.gotoNext();
  	  	}

  	})
      .catch(function(error) {
        console.log('request failed', error);

      })
      .done();

    }

    status(response) {
      if (response.status >= 200 && response.status < 300) {
        return response
      }
      throw new Error(response.statusText)
    }

    json(response) {
      return response.json()
    }


}

module.exports = LoginPage;