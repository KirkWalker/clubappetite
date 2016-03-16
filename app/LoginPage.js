'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  Image,
  Dimensions,
  Picker,
    TouchableHighlight,
    TouchableOpacity,
    ToastAndroid,
    TextInput,
} = React;

var styles = require('../styles');

var Users = require('../datalayer/User');
var Button = require('../modules/ButtonLogin');

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var result;

class LoginPage extends Component {



  constructor(props) {
      super(props);
      this.state = { inputTxt: '', inputPass: '', data: null, language: "kelowna"};
      this.navigatorObj = props.navigator;
  }

  render() {

      var _this = this;
      return (

        <View style={styles.container}>

          <View style={loginStyles.container}>
            <Image source={require('../img/logo.png')} style={loginStyles.logo} />
          </View>

          <View style={styles.contentForm} top={40}>
            <View style={styles.module}>
               <TextInput placeholder="USERNAME" placeholderTextColor='#1B898A' style={styles.input} onChangeText={(text) => this.setState({inputTxt: text})} value={this.state.inputTxt} />
               <TextInput placeholder="PASSWORD" placeholderTextColor='#1B898A' style={styles.input} onChangeText={(text) => this.setState({inputPass: text})} value={this.state.inputPass}  />
               <Button onPress={this._onPressButtonPOST.bind(this)} buttonText="LOG IN" style={loginStyles.button}/>
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

var loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  logo: {
    width: width*.75,
    height: height*.18,
    alignItems: 'stretch',
    resizeMode: 'contain' 
  },

});

module.exports = LoginPage;