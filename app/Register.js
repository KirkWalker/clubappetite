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

/* Stylesheets */
var styles = require('../styles');

/* Datalayer */
var Users = require('../datalayer/User');
var SubLocalities = require('../datalayer/Sublocalities');

/* Modules */
var SignupButton = require('../modules/ButtonLogin');
var CancelButton = require('../modules/ButtonLogin');
var ReferralCode = require('../app/ReferralCodeModal');
var Autocomplete = require('../modules/Autocomplete');

/* Dimensions */
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

/* Register Page */
class Register extends Component {
  constructor(props) {
    super(props);
    var code = (this.props.referralCode == undefined ? '' : this.props.referralCode);
    this.state = {
      inputTxt: '',
      inputPass: '',
      inputEmail: '',
      location: "",
      sublocalities: [],
      sublocalitiesIds: [],
      locationIndex: 0,
      referralCode: code,
      query: '',
    };
    this.navigatorObj = props.navigator;
  }

  componentDidMount() {
    this.mounted = true;
    InteractionManager.runAfterInteractions(() => {
      SubLocalities.getSubLocalities(this);
    });
  }

  componentWillUnmount() {
      this.mounted = false;
  }

  render() {
    // Used for autocomplete. This is the string inputted by the user.
    const { query } = this.state;
    // The generated array of suggestions (see findSublocality method for more info)
    const sublocalities = this.findSublocality(query);
    // comp is used  to help 'close' the autocomplete suggestions once a suggestion is chosen
    // it's used in the Autocomplete component, as shown here:
    //     data={sublocalities.length === 1 && comp(query, sublocalities[0]) ? [] : sublocalities}
    // this ternary statement returns an empty array (thus 'closing' it) once the suggested array has
    // only one option available, and that option is also written in the input field (which happens when
    // an option is clicked)
    const comp = (s, s2) => s.toLowerCase().trim() === s2.toLowerCase().trim();

    return (
      <View>
        <View style={registerStyles.bgContainer}>
          <Image style={registerStyles.background} source={require('../img/splash-bg-ex.jpg')} resizeMode={Image.resizeMode.cover}/>
        </View>

        <View style={registerStyles.container} marginTop={30}>
          <Image source={require('../img/ClubAppetiteLogo.png')} style={registerStyles.logo} marginLeft={5} resizeMode={Image.resizeMode.contain}/>
        </View>

        <View style={registerStyles.container} marginTop={40}>

          <View style={styles.module} marginTop={height*0.083}>
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

          {/*
            * Autocomplete Component for location selection
            *
            * Rendered last because z-index is determined by render order. Putting it at the end gives it the highest
            * z-index, meaning that the generated listview will be above the other elements, rather than below.
            * It's position is absolute and is not determined by flexbox values.
            *
            * See declarations at the top of 'render()' for more information.
            */}
          <Autocomplete
            containerStyle={registerStyles.autocompleteContainer}
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="SELECT A FOOD BANK"
            placeholderTextColor='#1B898A'

            data={sublocalities.length === 1 && comp(query, sublocalities[0]) ? [] : sublocalities}
            defaultValue={query}
            onChangeText={text => this.setState({query: text})}
            renderItem={data => (
              <TouchableOpacity onPress={() => this.handlePress(data)}>
                <Text>{data}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }


  redeemCodeModal() {
    var linktext = 'Got a Referral code?';
    var color = 'blue';
    if(this.state.referralCode != ''){
        linktext = 'Refferal Code: ' + this.state.referralCode;
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

  findSublocality(query) {
    // escapes any special characters to prevent any crashes
    let temp = query.trim();
    temp = temp.replace(/\\/g, "\\\\");
    temp = temp.replace(/\[/g, "\\[");
    temp = temp.replace(/\*/g, "\\*");
    temp = temp.replace(/\(/g, "\\(");
    temp = temp.replace(/\)/g, "\\)");
    temp = temp.replace(/\+/g, "\\+");

    if (temp === '') {
      return [];
    }

    // searches state.sublocalities array and returns any matches with 'temp'
    const { sublocalities } = this.state;
    const regex = new RegExp(`${temp.trim()}`, 'i');
    return sublocalities.filter(locality => locality.search(regex) >= 0);
  }

  handlePress(data) {
    // sets the value of query (and therefore the input box) to the pressed option
    this.setState({query: data});

    // iterates through the sublocalities array and sets the registration state variables
    for(i = 0; i < this.state.sublocalities.length; i++) {
      if (this.state.sublocalities[i] === data) {
        this.setState({locationIndex: i, selectedOption: data, location: data})
      }
    }
  }

  openReferralModal(referralCode) {
    this.props.navigator.push({
      id: 'ReferralCodeModal',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      referralCode: referralCode,
    });
  }



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
  // position is set to 'absolute' so that the listview
  // goes 'on top' of the items below it
  // otherwise the listview will move all items below it down
  autocompleteContainer: {
    flex: 1,
    left: width*0.0718,
    position: 'absolute',
    right: width*0.0718,
    top: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    width: width*.7,
    height: height*.18,
    alignItems: 'stretch',
  },
  moduleButtons: {
    flexDirection: 'column'
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