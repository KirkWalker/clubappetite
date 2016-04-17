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
  ScrollView,
  PixelRatio,
  TextInput
} = React;

var styles = require('../styles');

var Users = require('../datalayer/User');
var ToggleButton = require('../modules/ToggleButton');
var Button = require('../modules/ButtonLogin');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var font = 22;

if (PixelRatio.get() <= 2) {
  font = 18;
}

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
    requestAnimationFrame(() => {
        this.setState({amount: amt});
    });
  }

  setSchedule(amt) {
      requestAnimationFrame(() => {
        this.setState({schedule: amt});
      });
  }


  renderScene(route, navigator) {


  //schedule
//
    return (
      <View style={[donateStyles.container, {backgroundColor: '#efefef'}]}>
          <Image source={require('../img/donate-header.jpg')} style={donateStyles.header} resizeMode='contain'>
            <View style={donateStyles.headerBg}>
              <TextInput 
                style={donateStyles.headerText}
                placeholder='DONATE TO YOU FOOD BANK'
                editable={false}
                placeholderTextColor='#fff'
                />
              <TextInput 
                style={donateStyles.headerText}
                placeholder='take care of your community'
                editable={false}
                placeholderTextColor='#fff'
                />
            </View>
          </Image>
          <ScrollView>
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
             <Text style={donateStyles.subtitle}>Cancel at Anytime</Text>
             <Text style={donateStyles.text}>By using and/or visiting this Service (collectively including all content, functionality and tools available through the ClubAppetite.com domain and Club Appetite’s mobile apps), you signify your agreement to (1) these terms and conditions (the ‘Terms of Service’), (2)Club Appetite’s privacy policy, found at http://www.ClubAppetite.com/privacy and incorporated here by reference and also incorporated here by reference. If you do not agree to any of these terms, the Club Appetite’s privacy policy, or the Community Guidelines, please do not use the Club Appetite Service. Changes in these Terms are almost certain to happen. We’ll announce changes over our website, and we may notify you of changes by sending an email to the address you have provided to us. You are free to decide whether to accept the changes in the terms or to stop using our Service. If you continue to use our Service after the effectiveness of that update, you agree to be bound by such modiﬁcations or revisions. Such revisions shall become effective ten (10) days after the notiﬁcation has been sent.</Text>
          </View>
        </ScrollView>

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
    marginTop: height*0.11,
  },
  header: {
    width: width,
    // top: -width*.74,
    height: height*.253,
    justifyContent: 'flex-end',
  },
  module: {
    flexDirection: 'column',
    backgroundColor: 'white',
    width: width*.95,
    marginTop: 10,
    padding: 5,
  },
   module2: {
     flexDirection: 'column',
     backgroundColor: 'white',
     width: width*.95,
     marginTop: 10,
     padding: 5,
   },
  moduleclear: {
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
    color: '#a3a3a3',
  },
  text: {
    fontSize: 11,
    fontFamily: 'Gill Sans',
    color: '#a3a3a3'
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
    color: '#a3a3a3'
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Gill Sans',
    color: '#a3a3a3'
  },
  grey: {
    backgroundColor: '#efefef',
  },
  white: {
    backgroundColor: '#ffffff',
  },
  headerBg: {
    bottom: height*.03,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    padding:0,
    elevation:2,
    shadowColor: '#000',
    borderColor: '#1B8889',
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
        height: 2,
        width: 1
    },
    alignItems: 'center',
  },
  headerText: {
    fontSize: font,
    textAlign: 'center',
    padding: 10,
    height: height*.04,
    width: width,
    backgroundColor: 'transparent',
    fontFamily: 'Gill Sans',
  },
});

module.exports = Donate;