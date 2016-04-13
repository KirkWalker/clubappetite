'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  Dimensions,
  View,
  Text,
  Navigator,
  Image,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  InteractionManager,
  PixelRatio,
} = React;

var styles = require('../styles');
var Users = require('../datalayer/User');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');
var BannerAd = require('../modules/BannerAds');

var {width,height} = Dimensions.get('window');
var font = 20;
var fontWeight;

if (PixelRatio.get() <= 2) {
  font = 12.5;
  fontWeight = '400';
}

if (width > 500 && height > 1000) {
  font = 44;
  fontWeight = '400';
}

class MainPage extends Component {


  constructor(props) {
        super(props);
        this.state = {user_profile: [], banner_ad: []};
        //result = props.bannerads.getAdData(this);

  }

  componentDidMount() {

        /*
        This method sets the state variables for the user profile
        It will add a new user on first login or retrieve current info
        If not logged in it will redirect to login page

        successful result is an object: this.state.user_profile
        */

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

    var _this = this;
    var Username = this.state.user_profile.name;
    var Email = this.state.user_profile.email;
    var hasPoints = false;
    var points = 0;
    if(this.state.user_profile.user_points != undefined){
      hasPoints = true;
      points = this.state.user_profile.user_points;
    }

    return (
    <View style={styles.container}>      
      <Image source={require('../img/home-points-container.png')} style={mainStyles.pointsContainer} resizeMode={Image.resizeMode.contain}>
        <View style={mainStyles.pointsTextContainer}>
          <Text style={mainStyles.accountText}>YOUR ACCOUNT</Text>
          <Text style={mainStyles.pointsAmount}>{points}</Text>
          <Text style={mainStyles.pointsLabel}>POINTS</Text>
        </View>
      </Image>

      <View style={mainStyles.buttonsContainer}>
        <View style={mainStyles.buttons}>
          <TouchableOpacity onPress={this.gotoCartPage.bind(this)}>
            <Image source={require('../img/home-cart-icon.png')} style={mainStyles.icon} resizeMode={Image.resizeMode.contain}/>
          </TouchableOpacity>
          <Text style={mainStyles.neededNowText}>NEEDED{'\n'}  NOW</Text>
        </View>
        <View style={mainStyles.buttons}>
          <TouchableOpacity onPress={this.gotoDealsPage.bind(this)}>
            <Image source={require('../img/home-shop-icon.png')} style={mainStyles.icon} resizeMode={Image.resizeMode.contain}/>
          </TouchableOpacity>
          <Text style={mainStyles.shopText}>   SHOP{'\n'}APPETITE</Text>
        </View>
        <View style={mainStyles.buttons}>
          <TouchableOpacity onPress={this.gotoMessagesPage.bind(this)}>
            <Image source={require('../img/home-message-icon.png')} style={mainStyles.icon} resizeMode={Image.resizeMode.contain}/>
          </TouchableOpacity>
          <Text style={mainStyles.messagesText}>MESSAGES{'\n'}</Text>
        </View>
      </View>

      <BannerAd refThis={_this} pageName={'MainPage'} />
    </View>

    );
  }
  gotoMessagesPage() {
    this.props.navigator.push({
      id: 'Messages',
      name: 'Messages',
    });
  }
  gotoCartPage() {
      this.props.navigator.push({
        id: 'Cart',
        name: 'Shopping Cart',
      });
  }
  gotoDealsPage() {
      this.props.navigator.push({
        id: 'Deals',
        name: 'Deals Page',
      });
  }

}

var pointsFont = font*2;
var accountFont = font*.6;
var pointsLabelFont = font*.8;
if (Platform.OS === 'ios'){
  pointsFont = font*3;
  accountFont = font*.85;
  pointsLabelFont = font;
}

const mainStyles = StyleSheet.create({
  pointsContainer: {
    width: width*.9,
    height: height*.4,
    marginTop: height*.06,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsTextContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
  },
  accountText: {
    fontSize: accountFont,
    fontWeight: '600',
    fontFamily: 'Gill Sans',
    color: '#000',
  },
  pointsAmount: {
    fontSize: pointsFont,
    fontWeight: fontWeight,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    marginTop: height*.02,
    marginBottom: height*.02,
    color: '#000'
  },
  pointsLabel: {
    fontSize: pointsLabelFont,
    fontWeight: '600',
    fontFamily: 'Gill Sans',
    color: '#000'
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height*.05
  },
  buttons: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: width*.02,
    marginRight: width*.02
  },
  icon: {
    width: width*.2,
    height: width*.2,
  },
  neededNowText: {
    fontSize: font*.55,
    fontWeight: '600',
    fontFamily: 'Gill Sans',
    color: '#4A8A1D',
    marginTop: height*.02,
  },
  shopText: {
    fontSize: font*.55,
    fontWeight: '600',
    fontFamily: 'Gill Sans',
    color: '#F0BB1A',
    marginTop: height*.02,
  },
  messagesText: {
    fontSize: font*.55,
    fontWeight: '600',
    fontFamily: 'Gill Sans',
    color: '#6EC0C4',
    marginTop: height*.02,
  },
});

module.exports = MainPage;