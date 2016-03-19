'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  Navigator,
  TouchableOpacity,
  InteractionManager,
  Dimensions,
  TextInput,
} = React;

var styles = require('../styles');

var Users = require('../datalayer/User');
var Transactions = require('../datalayer/Transactions');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var Button = require('../modules/ButtonLogin');
var CheckBox = require('../modules/Checkbox');


class Payment extends Component {

  constructor(props) {
      super(props);
      this.state = {
          user_profile: [],
          checked: false,
          inputFN: '',
          inputLN: '',
          inputCC: '',
          inputCCV: '',
          inputEXPM: '',
          inputEXPY: '',
      };

      this.details = this.props.details;
      this.amount = this.details.amount;
      this.schedule = this.details.schedule;

  }

  componentDidMount() {
    this.mounted = true;
    InteractionManager.runAfterInteractions(() => {
      Users.getProfile(this);
    });
  }

  componentWillUnmount() {
      this.mounted = false;
  }

  render() {

    var data = [];
    data.push(Users.getImageUrl(this));
    data.push(this.props.openDrawer);

    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={styles.navbar}
                routeMapper={NavigationBarRouteMapper(data)} />
          } />
    );
  }
  renderScene(route, navigator) {
    return (

      <View style={styles.container}>

        <View style={paymentStyles.module} marginBottom={20} marginTop={10}>
          <View style={paymentStyles.modulerow}>
              <Text style={paymentStyles.text}>You have selected ${this.amount} / {this.schedule}</Text>
              <TouchableOpacity onPress={() => this.gotoDonate()}><Text style={paymentStyles.bluetext}> - change</Text></TouchableOpacity>
          </View>
        </View>
        <View style={paymentStyles.moduletext} marginBottom={10}>
            <Text style={paymentStyles.title}>Please fill in your payment details</Text>
        </View>
        <View style={paymentStyles.module}>
          <View style={styles.inputContainer}>
            <TextInput placeholder="First Name" placeholderTextColor='#1B898A' style={styles.input} onChangeText={(text) => this.setState({inputFN: text})} value={this.state.inputFN} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor='#1B898A' onChangeText={(text) => this.setState({inputLN: text})} value={this.state.inputLN}  />
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Credit Card Num" placeholderTextColor='#1B898A' onChangeText={(text) => this.setState({inputCC: text})} value={this.state.inputCC}  />
          </View>
          <View style={paymentStyles.modulerow}>
              <View style={[styles.inputContainer]}>
                <TextInput style={[styles.input,{width:width*.248}]} placeholder="CCV" placeholderTextColor='#1B898A' onChangeText={(text2) => this.setState({inputCCV: text2})} value={this.state.inputCCV}  />
              </View>

              <View style={styles.inputContainer}>
                <TextInput style={[styles.input,{width:width*.248}]} placeholder="Exp Month" placeholderTextColor='#1B898A' onChangeText={(text) => this.setState({inputEXPM: text})} value={this.state.inputEXPM}  />
              </View>

               <View style={styles.inputContainer}>
                 <TextInput style={[styles.input,{width:width*.248}]} placeholder="Exp Year" placeholderTextColor='#1B898A' onChangeText={(text) => this.setState({inputEXPY: text})} value={this.state.inputEXPY}  />
               </View>
          </View>
          <View style={paymentStyles.modulerow} marginTop={30}>
               <CheckBox
                 label=''
                 checked={this.state.checked}
                 onChange={(checked) => this.setState({checked: checked})}
               />
               <View style={[styles.labelContainer,{flexDirection: 'row'}]}>
                <TouchableOpacity onPress={this.gotoTerms.bind(this)} style={{flexDirection: 'row'}}>
                    <Text style={styles.label}>I agree to the </Text>
                    <Text style={[paymentStyles.bluetext,{paddingTop:2}]}>terms and conditions</Text>
                </TouchableOpacity>
               </View>
          </View>
          <View style={paymentStyles.modulerow} marginTop={30}>
            <Button buttonText="Continue" marginTop={30} onPress={this.doPost.bind(this)} />
          </View>


        </View>
      </View>
    );
  }

    gotoDonate() {
      this.props.navigator.push({
        id: 'Donate',
        name: 'Donations Page',
      });
    }


    gotoTerms() {
      this.props.navigator.push({
        id: 'Terms',
        name: 'Terms Page',
      });
    }


    doPost() {

        var details = {
          inputFN: this.state.inputFN,
          inputLN: this.state.inputLN,
          inputCC: this.state.inputCC,
          inputCCV: this.state.inputCCV,
          inputEXPM: this.state.inputEXPM,
          inputEXPY: this.state.inputEXPY,
          checked: this.state.checked,
        }



        if(Transactions.verifyCCForm(details)) {


            var user_profile = this.state.user_profile;
            var amount = (this.amount);

            Users.addPoints(user_profile,amount,details.inputFN,details.inputLN);

            this.props.navigator.push({
              id: 'ThankYou',
              name: 'Thank You Page',
              points: (amount*100),
            });

        }

    }

}


var paymentStyles = StyleSheet.create({

  module: {
    flexDirection: 'column',
     alignItems: 'center',
  },
  moduletext: {
      flexDirection: 'column',
      alignSelf: 'flex-start',
      alignItems: 'center',
      justifyContent: 'center',
  },
  modulerow: {
    flexDirection: 'row',
    flex:2,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    flex:1,
    marginLeft: 10,
  },
  text: {
    lineHeight:20,
    fontFamily: 'Gill Sans',
    textAlignVertical:'center',
  },
  bluetext: {
    lineHeight:20,
    fontFamily: 'Gill Sans',
    color:'blue',
    textAlignVertical:'bottom',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Gill Sans',
  },
  buttoncontainer: {
    flex: 1,
    marginRight:5,
    marginLeft:5,
    alignItems: 'center',
    justifyContent: 'center',
    height: height*.05,
    borderWidth:1,
    borderColor:'#efefef'
    //
  },
  grey: {
    backgroundColor: '#efefef',
  },
  white: {
    backgroundColor: '#ffffff',
  },
  button: {
    fontSize: 12,
    fontFamily: 'Gill Sans',
    alignSelf: 'center',
  },
});


module.exports = Payment;