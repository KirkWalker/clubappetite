'use strict';

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
} = React;

var styles = require('../styles');
var Users = require('../datalayer/User');
var Regions = require('../datalayer/Regions');
var Button = require('../modules/ButtonLogin');

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

let RegionList = Platform.OS === 'ios' ? PickerIOS : Picker;
let PickerItem = RegionList.Item;

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputTxt: '',
      inputPass: '',
      inputEmail: '',
      location: "Kelowna",
      regions: ['Kelowna','Vancouver'],
      regionIds: ['1','2'],
      locationIndex: 0,
    };
    this.navigatorObj = props.navigator;

  }

  render() {

    let data = this.state.regions;
    //let selectionString = data[this.state.locationIndex];
    console.log('current state location:',this.state.location);
    console.log('current state locationIndex:',this.state.locationIndex);
    return (

      <View style={styles.container}>

        <View style={registerStyles.container}>
          <Image source={require('../img/logo.png')} style={registerStyles.logo}/>
        </View>

        <View style={styles.contentForm} top={40}>
          <View style={styles.module}>
            <Text>Please choose a region:</Text>
            <RegionList
            style={styles.picker}
            selectedValue={this.state.locationIndex}
            onValueChange={(locationIndex) => this.setState({locationIndex: locationIndex, location: data[locationIndex]})}>
              {data.map((regionName, locationIndex) => (
                <PickerItem
                key={'region_' + locationIndex}
                value={locationIndex}
                label={regionName}
                />
                ))}
              </RegionList>

              {/*<Text>You selected: {selectionString}</Text>*/}
              <TextInput style={styles.input} placeholder="USERNAME" onChangeText={(text) => this.setState({inputTxt: text})} value={this.state.inputTxt} />
              <TextInput style={styles.input} placeholder="PASSWORD" onChangeText={(text) => this.setState({inputPass: text})} value={this.state.inputPass}  />
              <TextInput style={styles.input} placeholder="EMAIL" onChangeText={(text) => this.setState({inputEmail: text})} value={this.state.inputEmail}  />
          </View>

          <View style={styles.module}>
            <View style={registerStyles.moduleButtons}>
              <Button style={registerStyles.button} onPress={this._onPressButtonPOST.bind(this)} buttonText="SIGN-UP" />
              <Button style={registerStyles.button} onPress={this.gotoLogin.bind(this)} buttonText="CANCEL" />
            </View>

          </View>

        </View>

        <View style={styles.contentForm}></View>
        <View style={styles.banner}>
          <Text>Banner ad</Text>
        </View>
      </View>
  );
}

componentDidMount() {

  Regions.getRegions(this);


}

onEmailFocus() {
  if(this.state.inputEmail == "Email") {
    this.setState({inputEmail: ''});
  }
}

onEmailBlur() {
  if(this.state.inputEmail == "") {
    this.setState({inputEmail: 'Email'});
  }
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
  justifyContent: 'center',
  alignItems: 'center'
},
logo: {
  width: 300,
  height: 110,
},
button: {
  paddingTop: 30,
},
moduleButtons: {
  flexDirection: 'column'
}

});

module.exports = Register;