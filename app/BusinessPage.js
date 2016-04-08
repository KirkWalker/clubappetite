'use strict';

/* Requires */
import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  View,
  Navigator,
  Dimensions,
  PixelRatio,
  ScrollView,
  Modal,
  Linking,
  TouchableOpacity,
} from 'react-native';

var DEBUG = true;
if (DEBUG) {console.log("BusinessPAGE DEBUG flag set\n---------------------");}

var styles = require('../styles');
var Button = require('../modules/Button');

var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');
var Users = require('../datalayer/User');


/* BusinessPage Component */
class BusinessPage extends Component {

  constructor(props) {
    super(props);
    this.state = {user_profile: []}
  }

  componentDidMount() {
    if (DEBUG) {console.log("Received business_id "+this.props.business_info.id);}
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
        }
      />
    );
  }

  openPhoneModal() {
    this.props.navigator.push({
      id: 'PhoneModal',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      phoneNumber: this.props.business_info.sponsor_tel,
    });
  }
  openWebModal() {
    this.props.navigator.push({
      id: 'WebModal',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      website: this.props.business_info.sponsor_url,
    });
  }

  renderScene(route, navigator) {
  	return (
      <ScrollView>
        <View style={PageStyles.BusinessPageContainer}>
        	<View style={PageStyles.logoContainer}>
            <Image
              source={{uri: this.props.business_info.sponsor_img2}}
              style={PageStyles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={PageStyles.addressContainer}>
            <Text style={PageStyles.greenText}>{this.props.business_info.sponsor_address}</Text>
            <Text style={PageStyles.greenText}>{this.props.business_info.sponsor_city}    {this.props.business_info.sponsor_postal_code}</Text>
          </View>

          <View style={PageStyles.separator}/>

          <View style={PageStyles.contactContainer}>
            <View style={PageStyles.contactRow}>
              <Image style={PageStyles.icon} resizeMode="contain" source={require('../img/email-icon.png')}/>
              <Text style={PageStyles.grayText}>{this.props.business_info.sponsor_email}</Text>
            </View>

            <TouchableOpacity
              style={PageStyles.contactRow}
              onPress={() => {
                this.openPhoneModal();
              }}
            >
              <Image style={PageStyles.icon} resizeMode="contain" source={require('../img/phone-icon.png')}/>
              <Text style={PageStyles.grayText}>{this.props.business_info.sponsor_tel}</Text>
            </TouchableOpacity>


            <TouchableOpacity 
              style={PageStyles.contactRow}
              onPress={() => {
                this.openWebModal();
              }}
            >
              <Image style={PageStyles.icon} resizeMode="contain" source={require('../img/website-icon.png')}/>
              <Text style={PageStyles.grayText}>{this.props.business_info.sponsor_url}</Text>
            </TouchableOpacity>

          </View>

          <View style={PageStyles.separator}/>
        </View>
      </ScrollView>
  	);
  }
}

//Variables for styling. Used for scaling.
var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const PageStyles = StyleSheet.create({
  BusinessPageContainer: {
    backgroundColor: '#f2f2f2',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: HEIGHT,
  },
  logoContainer: {
    flex: 60,
    paddingTop: HEIGHT*0.11,
    alignItems: 'center',
  },
  logo: {
    width: WIDTH*0.60,
    height: HEIGHT *0.15,
    alignItems: 'stretch',
  },

  addressContainer: {
    flex: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',

    //shadows android
    elevation: 2,
    //shadows iOS
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  contactContainer: {
    flex: 160,
    justifyContent: 'center',
    backgroundColor: 'white',

    //shadows android
    elevation: 2,
    //shadows iOS
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  separator: {
    flex: 10,
    height: 10,
    backgroundColor: '#f2f2f2',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingLeft: 20,
  },
  icon: {
    width: WIDTH*0.15,
    height: WIDTH*0.15,
    marginRight: 25,
  },
  greenText: {
    fontSize: 15,
    fontFamily: 'Gill Sans',
    color: 'rgb(027, 135, 136)',
    fontWeight: '500',
  },
  grayText: {
    fontSize: 15,
    fontFamily: 'Gill Sans',
    color: 'gray',
    fontWeight: '500',
  },
  modalContainer: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: 'rgb(027, 135, 136)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
  },
  modalText: {
    fontSize: 23,
    fontFamily: 'Gill Sans',
    color: 'white',
    fontWeight: '500',
    padding: WIDTH*0.05,
  },
  callingIcon: {
    width: WIDTH*0.20,
    height: WIDTH*0.20,
  },
  callingButton: {
    width: WIDTH*0.30,
    paddingLeft: WIDTH*0.03,
    paddingRight: WIDTH*0.03,
  },
});

module.exports = BusinessPage;