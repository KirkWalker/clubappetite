/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Component,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  StyleSheet,
} = React;

var SplashPage = require('./app/SplashPage');
var LoginPage = require('./app/LoginPage');
var MainPage = require('./app/MainPage');
var Messages = require('./app/Messages');
var Profile = require('./app/Profile');
var NoNavigatorPage = require('./app/NoNavigatorPage');

var BannerAds = require('./datalayer/BannerAds');


var styles = require('./styles');

class AMGSandbox extends Component {

  constructor(props) {
      super(props);
      this.state = { user_profile: [] };
      this.gotoLogin = this.gotoLogin.bind(this);
  }
  gotoLogin() {
    this.drawer.close();
    this.navigatorObj.push({
      id: 'LoginPage',
      name: 'Login Page',
    });
  }

  render() {
    return (
      <Navigator
          initialRoute={{id: 'SplashPage', name: 'Index'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} />
    );
  }
  renderScene(route, navigator) {
    //used by methods that control navigation later
    this.navigatorObj = navigator;
    var _this=this;
    var routeId = route.id;
    console.log('index: route.routeId='+routeId);

    if (routeId === 'SplashPage') {
      return (
        <SplashPage
          navigator={navigator} />
      );
    }
    if (routeId === 'LoginPage') {
      return (
        <LoginPage
          navigator={navigator}
          bannerads={BannerAds}/>
      );
    }
    if (routeId === 'MainPage') {
      return (
        <MainPage
            navigator={navigator}
            data={route.data}
        />
      );
    }
    if (routeId === 'Profile') {
      return (
        <Profile
          navigator={navigator} />
      );
    }
    if (routeId === 'Messages') {
      return (
        <Messages
          navigator={navigator} />
      );
    }
    if (routeId === 'NoNavigatorPage') {
      return (
        <NoNavigatorPage
            navigator={navigator} />
      );
    }
    return this.noRoute(navigator); /* <-- if the route isn't found, it defaults to this method. */

  }
  noRoute(navigator) {
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigator.pop()}>
          <Text style={{color: 'red', fontWeight: 'bold'}}>View not found</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


AppRegistry.registerComponent('AMGSandbox', () => AMGSandbox);