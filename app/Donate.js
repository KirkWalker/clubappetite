'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  Navigator,
  TouchableOpacity,
  Dimensions,
  Image,
  TouchableHighlight,
  InteractionManager,
} = React;

var styles = require('../styles');

var Users = require('../datalayer/User');
var ToggleButton = require('../modules/ToggleButton');
var Button = require('../modules/ButtonLogin');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class Donate extends Component {

  constructor(props) {
      super(props);
      this.state = {user_profile: [], amount: 0, schedule: ''};
  }

  componentDidMount() {

        /*
        This method sets the state variables for the user profile
        It will add a new user on first login or retrieve current info
        If not logged in it will redirect to login page

        successful result is an object: this.state.user_profile
        */

        this.mounted = true;
        Users.getProfile(this);
  }

  componentWillUnmount() {
      this.mounted = false;
  }


  render() {

    var data = [];
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


  setAmount(amt) {
    this.setState({amount: amt});
  }

  setSchedule(amt) {
    this.setState({schedule: amt});
  }


  renderScene(route, navigator) {


  //schedule

    return (
      <View style={[donateStyles.container, {backgroundColor: '#efefef'}]}>


          <View style={donateStyles.module}>
            <Text style={donateStyles.title}>Select Your Amount</Text>
            <View style={donateStyles.modulerow}>

              <ToggleButton onPress={() => this.setAmount(10)} text='$10' compareValue={this.state.amount} />
              <ToggleButton onPress={() => this.setAmount(25)} text='$25' compareValue={this.state.amount} />
              <ToggleButton onPress={() => this.setAmount(50)} text='$50' compareValue={this.state.amount} />
              <ToggleButton onPress={() => this.setAmount(100)} text='$100' compareValue={this.state.amount} />

            </View>
          </View>

          <View style={donateStyles.module2}>
             <Text style={donateStyles.title}>Select Your Schedule</Text>
             <View style={donateStyles.modulerow}>
               <ToggleButton onPress={() => this.setSchedule('One Time')} text='One Time' compareValue={this.state.schedule} />
               <ToggleButton onPress={() => this.setSchedule('Bi-Weekly')} text='Bi-Weekly' compareValue={this.state.schedule} />
             </View>
             <View style={donateStyles.modulerow}>
               <ToggleButton onPress={() => this.setSchedule('Monthly')} text='Monthly' compareValue={this.state.schedule} />
               <ToggleButton onPress={() => this.setSchedule('Annually')} text='Annually' compareValue={this.state.schedule} />
             </View>
            <View style={donateStyles.modulerow2}>
             {(() => {
               if(this.state.schedule != '' && this.state.amount>0) {
               return (

                  <View style={{marginBottom:10}}>
                    <View style={donateStyles.alert}>
                      <Text style={donateStyles.alerttext}>You have selected ${ this.state.amount } / { this.state.schedule }</Text>
                    </View>

                    <Button buttonText="Continue" marginTop={10} onPress={this.gotoPayment.bind(this)} />
                  </View>


                )
             }
          })()}
            </View>
          </View>

          <View style={donateStyles.moduleclear}>
             <Text style={donateStyles.subtitle}>Cancel At Any Time</Text>
             <Text style={donateStyles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
             sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
             quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
             Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>

          </View>


      </View>
    );
  }
  gotoPayment() {
    this.props.navigator.push({
      id: 'Payment',
      name: 'Payment Page',
      details: {amount:this.state.amount, schedule:this.state.schedule}
    });
  }
}

var donateStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    paddingTop: 20,
  },
  module: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: 'white',
    width: width*.95,
    marginTop: 10,
    padding: 5,
  },
   module2: {
     flex: 8,
     flexDirection: 'column',
     backgroundColor: 'white',
     width: width*.95,
     marginTop: 10,
     padding: 5,
   },
  moduleclear: {
    flex: 10,
    flexDirection: 'column',
    width: width*.95,
    marginTop: 20,
  },
  modulerow: {
    marginTop: 5,
    flexDirection: 'row',
    flex:2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modulerow2: {
    flexDirection: 'row',
    flex:6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    flex:2,
    marginLeft: 10,
  },
  text: {
    fontSize: 11,
    fontFamily: 'Gill Sans',
  },
  alert: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
    marginBottom:10,
    width: width*.85,
  },
  alerttext: {
    fontSize: 11,
    fontFamily: 'Gill Sans',
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Gill Sans',
  },
  grey: {
    backgroundColor: '#efefef',
  },
  white: {
    backgroundColor: '#ffffff',
  },
});

module.exports = Donate;