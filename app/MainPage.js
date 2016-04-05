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

var Button = require('../modules/ButtonLogin');
var Users = require('../datalayer/User');

var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');
var {width,height} = Dimensions.get('window');
var font = 20;

if (PixelRatio.get() <= 2) {
  font = 17;
}

class MainPage extends Component {


  constructor(props) {
        super(props);
        this.state = {user_profile: []};
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

      <View style={mainStyles.module}>
        <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Loblaws.svg/1280px-Loblaws.svg.png'}} style={[mainStyles.banner]} resizeMode={Image.resizeMode.contain}/>
      </View>
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

var pointsFont = font*3;
if (Platform.OS === 'ios'){
  pointsFont = font*3.5;
}

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60,
    backgroundColor: '#F2F2F2',
  },
  pointsContainer: {
    width: width*.9,
    height: height*.4,
    marginTop: height*.06,
    alignItems: 'center'
  },
  pointsTextContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    marginTop: height*.12,
    width: width*.45,
    height: height*.1,
  },
  accountText: {
    fontSize: font*.6,
    fontWeight: '600',
    fontFamily: 'Gill Sans'
  },
  pointsAmount: {
    fontSize: pointsFont,
    fontWeight: '600',
    fontFamily: 'Gill Sans'
  },
  pointsLabel: {
    fontSize: font*.8,
    fontWeight: '600',
    fontFamily: 'Gill Sans'
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
  banner: {
    flex: 1,
    alignItems: 'stretch',
  },
  module: {
    flexDirection: 'column',
    width: width,
    flex: 3
  }
});


module.exports = MainPage;