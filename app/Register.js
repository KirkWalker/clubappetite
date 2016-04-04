

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  PickerIOS,
  Picker,
  Image,
  Dimensions,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  InteractionManager,
  Navigator,
} = React;

var styles = require('../styles');
var Users = require('../datalayer/User');
var SubLocalities = require('../datalayer/Sublocalities');
var SignupButton = require('../modules/ButtonLogin');
var CancelButton = require('../modules/ButtonLogin');
var ReferralCodeModal = require('../app/ReferralCodeModal');


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

let RegionList = Picker;
let PickerItem = RegionList.Item;

var FMPicker = require('../modules/ApplePicker');

class Register extends Component {

  constructor(props) {
      super(props);
      this.state = {
          inputTxt: '',
          inputPass: '',
          inputEmail: '',
          location: "",
          sublocalities: [],
          sublocalitiesIds: [],
          locationIndex: 0,
          selectedOption: 'not chosen',
          referralCode: '',
      };
      this.navigatorObj = props.navigator;
  }


  componentDidMount() {
    this.mounted = true;
    InteractionManager.runAfterInteractions(() => {
      SubLocalities.getSubLocalities(this);
    });

    //this.redeemCode = this.redeemCode.bind(this);
  }

  componentWillUnmount() {
      this.mounted = false;
  }



  render() {

    var start = ['Please choose a location:'];
    var end = this.state.sublocalities;
    var data = start.concat(end);

    return (

      <View>

          <View style={registerStyles.bgContainer}>
              <Image style={registerStyles.background} source={require('../img/splash-bg-ex.jpg')} />
          </View>

        <View style={registerStyles.container} marginTop={30}>
          <Image source={require('../img/ClubAppetiteLogo.png')} style={registerStyles.logo} marginLeft={5} />
        </View>

        <View style={registerStyles.container} marginTop={40}>


            {(() => {
                switch (Platform.OS) {
                  case "android":   return this.androidPicker(data);
                  default:      return this.iosPicker(data);
                }
            })()}

          <View style={styles.module} marginTop={3}>
            <View style={styles.inputContainer}>
              <TextInput placeholder="USERNAME" placeholderTextColor='#1B898A' style={styles.input} onChangeText={(text) => this.setState({inputTxt: text})} value={this.state.inputTxt} />
            </View>

            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="PASSWORD" placeholderTextColor='#1B898A' onChangeText={(text) => this.setState({inputPass: text})} value={this.state.inputPass}  />
            </View>

            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="EMAIL" placeholderTextColor='#1B898A' onChangeText={(text) => this.setState({inputEmail: text})} value={this.state.inputEmail}  />
            </View>

          </View>

          <View style={styles.module} marginTop={10}>
            <SignupButton onPress={this._onPressButtonPOST.bind(this)} buttonText="SIGN-UP" color="#009999" textcolor="white" />
          </View>

          <View style={styles.module} marginTop={10}>
            <CancelButton onPress={this.gotoLogin.bind(this)} buttonText="CANCEL" marginTop={10} color="#efefef" textcolor="#999999" />
          </View>
          {(() => {

               return this.redeemCodeModal();

          })()}



        </View>





      </View>
    );
  }


  redeemCodeModal() {

        console.log('redeem');
        var linktext = 'Got a Referral code?';
        var color = 'blue';
        if(this.state.referralCode != ''){
            linktext = 'Referral Code:' + this.state.referralCode;
            color = 'red';
        }

        return(


          <View style={styles.module} marginTop={20}>
            <Text
                style={{color:color}}
                onPress={()=>{
                    this.openReferralModal(this.state.referralCode);
                }}>
                {linktext}
            </Text>
          </View>

        )

  }

  openReferralModal(referralCode) {
    this.props.navigator.push({
      id: 'ReferralCodeModal',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      referralCode: referralCode,
    });
  }



    iosPicker(data) {
        return(
        <View>
            <Text>Current Location: {this.state.selectedOption}</Text>
            <Text
                style={{color:'blue'}}
                onPress={()=>{
                    this.refs.picker.setoptions(data);
                    this.refs.picker.show();
                }}>
                Click here to select your location
            </Text>

            <FMPicker ref={'picker'} options={data}
                onSubmit={(option)=>{
                    if(option == 'Please choose a location:') {
                        this.setState({selectedOption: 'not chosen'})
                    }else {
                        this.setState({selectedOption: option, location: option})
                    }
                }}
            />
        </View>
    )}





    androidPicker(data) {
        return(


        <RegionList
            style={registerStyles.picker}
            selectedValue={this.state.locationIndex}
            onValueChange={(locationIndex) => this.setState({locationIndex: locationIndex, location: data[locationIndex]})}>
              {data.map((regionName, locationIndex) => (
                <PickerItem
                style={{height: 50, margin:0,padding:0}}
                  key={'region_' + locationIndex}
                  value={locationIndex}
                  label={regionName}
                />
                ))}
        </RegionList>


    );}


    gotoLogin() {
      this.props.navigator.push({
        id: 'LoginPage',
        name: 'Login Page',
      });
    }
    gotoNext() {
      this.props.navigator.push({
        id: 'MainPage',
        name: 'Main Page',
      });
    }
    _onPressButtonPOST() {


      Users.handleRegister(this);

    }

}

var registerStyles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center'
},
  logo: {
    width: width*.7,
    height: height*.18,
    alignItems: 'stretch',
    resizeMode: 'contain'
  },
moduleButtons: {
  flexDirection: 'column'
},
  bgContainer: {
    position: 'absolute'
  },
  background: {
    width: width,
    height: height,//*.25,
    position: 'absolute',
    bottom: -height,
    flex: 1,
    resizeMode: 'cover'
  },
   picker: {
       backgroundColor: '#efefef',
       width: width*.80,
       borderWidth:1,
       borderColor:'#999999',
       height: height*.06,
       color: "#1B898A",
       elevation:2,
   },
       basicContainer:{
           flex: 1,
           justifyContent: 'center',
           alignItems: 'center',
       },
       modalContainer:{
           position:'absolute',
           bottom:0,
           right:0,
           left:0,
           width:width,
           height:height,
           justifyContent: 'center',
           alignItems: 'center',
           padding:0,
           backgroundColor: '#F5FCFF',
       },
});

module.exports = Register;