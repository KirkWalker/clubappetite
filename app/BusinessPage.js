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
} from 'react-native';

var styles = require('../styles');

var Users = require('../datalayer/User');
var Directory = require('../datalayer/Directory.js');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');

/* BusinessDirectory Component */
class BusinessPage extends Component {

  constructor(props) {
    super(props);
    this.state = {user_profile: []}
  }

  componentDidMount() {
      this.mounted = true;
      Users.getProfile(this);
      Directory.getDirectoryData(this);
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
        }
      />
    );
  }

  renderScene(route, navigator) {
  	return (
      <View style={PageStyles.BusinessPageContainer}>
      	<View style={PageStyles.logoContainer}>
          <Image
            source={require('../img/logo.png')}
            style={PageStyles.logo}
          />
        </View>

        <View style={PageStyles.addressContainer}>
          <Text style={PageStyles.greenText}>1234 Road Name</Text>
          <Text style={PageStyles.greenText}>Kelowna, BC    V1Z 5H9</Text>
        </View>

        <View style={PageStyles.separator}/>

        <View style={PageStyles.contactContainer}>
          <View style={PageStyles.contactRow}>
            <Image style={PageStyles.icon} source={require('../img/email-icon.png')}/>
            <Text style={PageStyles.grayText}>name@email.com</Text>
          </View>
          <View style={PageStyles.contactRow}>
            <Image style={PageStyles.icon} source={require('../img/phone-icon.png')}/>
            <Text style={PageStyles.grayText}>1 250-425-6324</Text>
          </View>
          <View style={PageStyles.contactRow}>
            <Image style={PageStyles.icon} source={require('../img/website-icon.png')}/>
            <Text style={PageStyles.grayText}>www.websitename.com</Text>
          </View>
        </View>
      </View>
  	);
  }
}

// Variables for styles. Used for scaling to different screen sizes.
var TEXT_SIZE = (PixelRatio.get() <= 2) ? 15 : 21;
var PADDING = PixelRatio.get();

var LOGO_WIDTH = PixelRatio.getPixelSizeForLayoutSize(115);
var LOGO_HEIGHT = PixelRatio.getPixelSizeForLayoutSize(57); 
var ICON_WIDTH = PixelRatio.getPixelSizeForLayoutSize(20);
var ICON_HEIGHT = PixelRatio.getPixelSizeForLayoutSize(20);
var WINDOW_HEIGHT = Dimensions.get('window').height;

const PageStyles = StyleSheet.create({
  BusinessPageContainer: {
    backgroundColor: '#F2F2F2',
    paddingTop: 70,
    flexDirection: 'column',
    height: WINDOW_HEIGHT,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
  },
  addressContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: PADDING*13,

    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  greenText: {
    color: 'rgb(027, 135, 136)',
    fontSize: TEXT_SIZE,
    fontWeight: '500',
    fontFamily: 'Gill Sans',
  },
  grayText: {
    fontSize: TEXT_SIZE,
    fontWeight: '500',
    color: 'gray',
    fontFamily: 'Gill Sans',
    paddingLeft: PADDING*18,
  },
  separator: {
    backgroundColor: '#F2F2F2',
    height: PADDING*15,
  },
  contactContainer: {
    backgroundColor: 'white',
    padding: PADDING*10,

    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: PADDING*5,
  },
  icon: {
    width: ICON_WIDTH,
    height: ICON_HEIGHT,
    resizeMode: 'contain',
  },
});

module.exports = BusinessPage;