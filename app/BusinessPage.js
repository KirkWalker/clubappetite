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
} from 'react-native';

var DEBUG = true;
if (DEBUG) {console.log("BusinessPAGE DEBUG flag set\n---------------------");}

var styles = require('../styles');

var Directory = require('../datalayer/Directory.js');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');

/* BusinessDirectory Component */
class BusinessPage extends Component {

  constructor(props) {
    super(props);
    this.state = {user_profile: this.props.user_profile}
  }

  componentDidMount() {
    if (DEBUG) {console.log("Received business_id "+this.props.business_info.id);}
    this.mounted = true;
    ;
    //Directory.getDirectoryData(this);
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

  renderScene(route, navigator) {
  	return (
      <ScrollView>
        <View style={PageStyles.BusinessPageContainer}>
        	<View style={PageStyles.logoContainer}>
            <Image
              source={{uri: this.props.business_info.sponsor_img2}}
              style={PageStyles.logo}
            />
          </View>

          <View style={PageStyles.addressContainer}>
            <Text style={PageStyles.greenText}>{this.props.business_info.sponsor_address}</Text>
            <Text style={PageStyles.greenText}>Kelowna, BC    V1Z 5H9</Text>
          </View>

          <View style={PageStyles.separator}/>

          <View style={PageStyles.contactContainer}>
            <View style={PageStyles.contactRow}>
              <Image style={PageStyles.icon} source={require('../img/email-icon-sm.png')}/>
              <Text style={PageStyles.grayText}>{this.props.business_info.sponsor_email}</Text>
            </View>
            <View style={PageStyles.contactRow}>
              <Image style={PageStyles.icon} source={require('../img/phone-icon-sm.png')}/>
              <Text style={PageStyles.grayText}>{this.props.business_info.sponsor_tel}</Text>
            </View>
            <View style={PageStyles.contactRow}>
              <Image style={PageStyles.icon} source={require('../img/website-icon-sm.png')}/>
              <Text style={PageStyles.grayText}>{this.props.business_info.sponsor_url}</Text>
            </View>
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
    paddingTop: 70,
    alignItems: 'center',
    // borderColor: 'green', borderWidth: 5,
  },
  logo: {
    resizeMode: 'contain',
// borderColor: 'green', borderWidth: 5,
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
    // borderColor: 'red', borderWidth: 5,
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
    // borderColor: 'blue', borderWidth:5,
  },
  separator: {
    flex: 10,
    height: 10,
    backgroundColor: '#f2f2f2',
    // borderColor: 'orange', borderWidth:5,
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
    resizeMode: 'contain',
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
});

module.exports = BusinessPage;