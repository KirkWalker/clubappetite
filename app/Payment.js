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
} = React;

var styles = require('../styles');

var Users = require('../datalayer/User');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;




class Payment extends Component {

  constructor(props) {
      super(props);
      this.state = {user_profile: []};

      this.details = this.props.details;
      this.amount = this.details.amount;
      this.schedule = this.details.schedule;

  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      Users.getProfile(this);
    });
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

      <View style={paymentStyles.container}>

        <View style={paymentStyles.module, styles.module}>
          <View style={paymentStyles.modulerow}>
              <Text style={paymentStyles.text}>You have selected ${this.amount} / {this.schedule}</Text>
              <TouchableOpacity onPress={() => this.gotoDonate()}><Text style={paymentStyles.bluetext}> - change</Text></TouchableOpacity>
          </View>
        </View>
        <View style={paymentStyles.module2}>
            <Text style={paymentStyles.title}>Please fill in your payment details</Text>


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



}


var paymentStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
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
     flex: 6,
     flexDirection: 'column',
     backgroundColor: 'white',
     width: width*.95,
     marginTop: 10,
     padding: 5,
   },
  moduleclear: {
    flex: 12,
    flexDirection: 'column',
    width: width*.95,
    marginTop: 20,
  },
  modulerow: {
    flexDirection: 'row',
    flex:2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    flex:1,
    marginLeft: 10,
  },
  text: {
    fontSize: 11,
    fontFamily: 'Gill Sans',
  },
    bluetext: {
      fontSize: 11,
      fontFamily: 'Gill Sans',
      color:'blue',
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