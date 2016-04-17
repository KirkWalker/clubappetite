'use strict';

/* Requires */
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  Dimensions,
  TextInput,
  Platform,
  Image,
  PixelRatio,
  ToastAndroid,
  AlertIOS,
} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var mainstyles = require('../styles');
var CheckButton = require('../modules/ButtonLogin');
var CancelButton = require('../modules/ButtonLogin');
var font = 20;
if (PixelRatio.get() <= 2) {
  font = 15;
}

class ReferralCodeModal extends Component {
	constructor(props){
		super(props);
		this.state = { inputCode: '' }
	}

	closeReferralModal(referralCode) {
    this.props.navigator.push({
      id: 'Register',
     	name: 'Registration Page',
     	sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      referralCode: referralCode,
    });
  }

	render() {
		return (
			<View style={styles.container}>
          <Image source={require('../img/logo-white.png')} style={styles.logo} resizeMode="contain"/>
            <Text style={styles.text1}>Do you have a points code to{'\n'}redeem?</Text>
            <Text style={styles.text2}>Enter below to receive you Club{'\n'}Appetite points.</Text>

            <View style={mainstyles.module} marginTop={40}>
            <View style={styles.box}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="ENTER CODE"
                  placeholderTextColor='#1B898A'
                  onChangeText={(text) => this.setState({inputCode: text})}
                  value={this.state.inputCode}
                />
                </View>
              </View>
            </View>
            <View style={styles.module} marginTop={10}>
              <CheckButton
                buttonText="REDEEM"
                color="#f0bb1a"
                textcolor="white"
                onPress={() => {
                    this._onPressButtonPOST();
                }}
              />
            </View>
            <View style={styles.module} marginTop={10}>
              <CancelButton
                onPress={() => {
                  this.props.navigator.pop();
                }}
                buttonText="SKIP"
                marginTop={10}
                color="#1B8889"
                textcolor="white"
              />
            </View>
    	</View>
		);
	}

	_onPressButtonPOST() {
	  console.log('checking code');
	  var DEBUG = true;
	  var SERVER_URL = 'http://restapi.clubappetite.com/api.php';
	  fetch(SERVER_URL + '?controller=api&action=checkreferralcode', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: this.state.inputCode,
      })
	  })
	  .then((response) => response.json())
	  .then((responseData) => {
      if(responseData.result == 'error'){
        console.log('User Class getreferralcode ERROR:',responseData);

        if(Platform.OS === 'ios'){
	        AlertIOS.alert(
	         'Code is not valid',
	         'Please check it and try again.'
	        );
        } else {
          ToastAndroid.show('Code is not valid, Please check it and try again.', ToastAndroid.SHORT);
        }
      } else {
				console.log("input code: " + this.state.inputCode);
				this.closeReferralModal(this.state.inputCode);
      }
	  })
	  .catch(function(error) {
      console.log('getreferralcode request failed', error);
	  })
	  .done();
  }
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		height: height,
		backgroundColor: '#1B8889',
		justifyContent: 'center',
		alignItems: 'center',
	},
	module:{
		backgroundColor: "#eeeeee",
		elevation:2,
		shadowColor: '#000',
		shadowOpacity: .8,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 1
		},
	},
	module1: {
		flex: 2,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop:5,
		marginBottom:5,
	},
	module2: {
		flex: 4,
		backgroundColor: 'white',
		marginTop:5,
		marginBottom:5,
		padding:20,
		alignItems: 'center',
	},
	module3: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 2,
		width:width,
		backgroundColor: 'white',
		marginTop:5,
	},
	code: {
		fontSize:40,
		color:'red',
		fontWeight:'bold',
		fontFamily: 'Gill Sans',
		textAlign:'center',
		lineHeight:80,
		marginBottom:20,
	},
	message: {
		fontSize:16,
		fontFamily: 'Gill Sans',
		lineHeight:30,
		textAlign:'center',
	},
	banner:{
		width:width,
		height:height*.15,
		alignItems: 'stretch',
	},
	generate: {
		backgroundColor: '#4A8A1D',
		paddingLeft:15,
		paddingRight:15,
		paddingTop:5,
		paddingBottom:5,
		borderRadius:50,
	},
	generatetext: {
		fontSize:18,
		color:'white',
		fontWeight:'bold',
		fontFamily: 'Gill Sans',
	},
	logo: {
		width: width*.8,
		height: height*.2,
	},
	text1: {
		fontSize: font,
		fontFamily: 'Gill Sans',
		letterSpacing: 1,
		fontWeight: '400',
		color: '#fff',
		textAlign: 'center',
		marginTop: height*.05
	},
	text2: {
		fontSize: font*.85,
		fontFamily: 'Gill Sans',
		fontWeight: '300',
		color: '#fff',
		letterSpacing: 1,
		textAlign: 'center',
		marginTop: height*.02
	},
	input: {
		padding: 10,
		height: height*.06,
		width: width*.80,
		fontFamily: 'Gill Sans',
	},
	inputContainer: {
        backgroundColor: '#eee',
        overflow: 'hidden',
        padding:0,
        elevation:2,
        shadowColor: '#000',
        borderWidth: 0.5,
        borderColor: '#1B8889',
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 1
        },
    },
	box: {
		width: width*.8,
		height: height*.06,
		backgroundColor: '#eee'
	}
});

module.exports = ReferralCodeModal;