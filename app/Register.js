'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  PickerIOS,
  Picker,
  Platform,
    TouchableHighlight,
    TouchableOpacity,
    ToastAndroid,
    TextInput,
} = React;

var styles = require('../styles');
var Users = require('../datalayer/User');
var SubLocalities = require('../datalayer/Sublocalities');
var Button = require('../modules/Button');

let RegionList = Platform.OS === 'ios' ? PickerIOS : Picker;
let PickerItem = RegionList.Item;

class Register extends Component {

  constructor(props) {
      super(props);
      this.state = {
          inputTxt: 'Username',
          inputPass: 'Password',
          inputEmail: 'Email',
          location: "Kelowna",
          sublocalities: ['Kelowna','Vancouver'],
          sublocalitiesIds: ['1','2'],
          locationIndex: 0,
      };
      this.navigatorObj = props.navigator;

  }

  render() {

      let data = this.state.sublocalities;
      //let selectionString = data[this.state.locationIndex];
      console.log('current state sublocalities:',this.state.location);
      console.log('current state locationIndex:',this.state.locationIndex);
      return (

        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Please register with Club Appetite.</Text>
          </View>


                <View style={styles.contentForm}>
                  <View style={styles.module}>

                      <Text>Please choose a Charity:</Text>
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

                      <TextInput style={styles.input} onFocus={this.onUserFocus.bind(this)} onBlur={this.onUserBlur.bind(this)} onChangeText={(text) => this.setState({inputTxt: text})} value={this.state.inputTxt} />
                      <TextInput style={styles.input} onFocus={this.onPassFocus.bind(this)} onBlur={this.onPassBlur.bind(this)} onChangeText={(text) => this.setState({inputPass: text})} value={this.state.inputPass}  />
                      <TextInput style={styles.input} onFocus={this.onEmailFocus.bind(this)} onBlur={this.onEmailBlur.bind(this)} onChangeText={(text) => this.setState({inputEmail: text})} value={this.state.inputEmail}  />

                  </View>

                  <View style={styles.module}>
                    <View style={styles.moduleButtons}>

                        <Button onPress={this._onPressButtonPOST.bind(this)} buttonText="Register" height={50} width={50} />
                        <Button onPress={this.gotoLogin.bind(this)} buttonText="Cancel" height={50} width={50} />

                    </View>
                  </View>

                </View>

                <View style={styles.contentForm}>





                </View>
                <View style={styles.banner}>

                <Text>Banner ad</Text>
                </View>
        </View>

      );
    }

    componentDidMount() {

        SubLocalities.getSubLocalities(this);


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

module.exports = Register;