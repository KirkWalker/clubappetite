'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  Image,
  Dimensions,
  PixelRatio,
  Platform,
  Linking,
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
var font = 23;

if (PixelRatio.get() <= 2) {
  font = 20;
}

var result;

class LoginPage extends Component {



  constructor(props) {
      super(props);
      this.state = { inputTxt: '', inputPass: '', data: null, language: "kelowna"};
      this.navigatorObj = props.navigator;
  }

  openLink() {
    var website = 'http://www.clubappetite.com';
    console.log(website);
    Linking.canOpenURL(website).then(supported => {
      if (supported) {
        console.log("Opening link...");
        return Linking.openURL(website);
      } else {
        console.log("Can\'t open this URI.");
      }
    });
  }

  render() {

      var _this = this;
      return (

        <View>

          <View style={loginStyles.bgContainer}>
              <Image style={loginStyles.background} source={require('../img/splash-bg-ex.jpg')} resizeMode={Image.resizeMode.cover}/>
          </View>

          <View style={loginStyles.container} marginTop={50}>
            <Image source={require('../img/ClubAppetiteLogo.png')} style={loginStyles.logo} resizeMode={Image.resizeMode.contain}/>
          </View>

          <View style={loginStyles.container} marginTop={40}>
            <Text style={loginStyles.slogan}>Welcome to Club Appetite{'\n'} where we work to feed our local communities.</Text>
          </View>

          <View style={loginStyles.container} marginTop={20}>
            <View style={styles.module}>

               <View style={styles.inputContainer}>
                <TextInput placeholder="EMAIL" placeholderTextColor='#1B898A' style={styles.input} onChangeText={(text) => this.setState({inputTxt: text})} value={this.state.inputTxt} />
               </View>
               
               <View style={styles.inputContainer}>
                <TextInput placeholder="PASSWORD" placeholderTextColor='#1B898A' style={styles.input} onChangeText={(text) => this.setState({inputPass: text})} value={this.state.inputPass}  />
               </View>

            </View>
            <View style={styles.module} marginTop={10}>
                <Button onPress={this._onPressButtonPOST.bind(this)} buttonText="SIGN IN" marginTop={10} />
            </View>
            <View style={styles.module} marginTop={10}>
                <Button onPress={this.gotoRegister.bind(this)} buttonText="CREATE NEW ACCOUNT" marginTop={10} color="#efefef" textcolor="#999999" />
            </View>

          </View>
          <Text>{'\n\n\n\n'}</Text>
          <TouchableOpacity onPress={() => {this.openLink()}}><Text style={loginStyles.web}>www.clubappetite.com</Text></TouchableOpacity>
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

        var email = this.state.inputTxt;
        var password = this.state.inputPass;
        Users.handleLogin(email,password,this);
    }

}
var webFont = font*.8;
if (Platform.OS === 'ios'){
  webFont = font;
}

var loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width*.75,
    height: height*.18,
    alignItems: 'stretch',
  },
  slogan: {
    width: width*.70,
    textAlign: 'center',
    color:'#F0BB1A',
    fontSize: 16,
    fontWeight:'500',
    fontFamily: 'Gill Sans'
  },
  bgContainer: {
    position: 'absolute'
  },
  background: {
    width: width,
    height: height,
    position: 'absolute',
    bottom: -height,
    flex: 1,
  },
  web: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Gill Sans',
    fontSize: webFont,
    fontWeight: '300',
    // top: height*.05,
    position: 'relative',
    letterSpacing: 2
  }
});

module.exports = LoginPage;