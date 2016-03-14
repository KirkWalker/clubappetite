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

var styles = require('../styles');

var Users = require('../datalayer/User');
var Button = require('../modules/Button');

var result;

class LoginPage extends Component {



  constructor(props) {
      super(props);
      this.state = { inputTxt: 'Username', inputPass: 'Password', data: null, language: "kelowna"};
      this.navigatorObj = props.navigator;
  }

  render() {

      var _this = this;
      return (

        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Please login to Club Appetite.</Text>
          </View>

          <View style={styles.contentForm}>
            <View style={styles.module}>
               <TextInput style={styles.input} onFocus={this.onUserFocus.bind(this)} onBlur={this.onUserBlur.bind(this)} onChangeText={(text) => this.setState({inputTxt: text})} value={this.state.inputTxt} />

               <TextInput style={styles.input} onFocus={this.onPassFocus.bind(this)} onBlur={this.onPassBlur.bind(this)} onChangeText={(text) => this.setState({inputPass: text})} value={this.state.inputPass}  />

               <Button onPress={this._onPressButtonPOST.bind(this)} buttonText="Login" height={50} width={50} />
            </View>
          </View>
          <View style={styles.contentForm}>
            <TouchableOpacity
                onPress={this.gotoRegister.bind(this)}>
                    <Text>Or create your Club Appetite Account</Text>
            </TouchableOpacity>
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
    gotoRegister() {
        this.props.navigator.push({
          id: 'Register',
          name: 'Registration Page',
        });
    }
    _onPressButtonPOST() {

        var username = this.state.inputTxt;
        var password = this.state.inputPass;
        Users.handleLogin(username,password,this);

    }

}

module.exports = LoginPage;