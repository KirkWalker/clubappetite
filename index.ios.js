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

var styles = require('./styles');

class AMGSandbox extends Component {
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
    var routeId = route.id;
    console.log('Index: routeId='+routeId)

    if (routeId === 'SplashPage') {
      return (
        <SplashPage
          navigator={navigator} />
      );
    }
    if (routeId === 'LoginPage') {
      return (
        <LoginPage
          navigator={navigator} />
      );
    }
    if (routeId === 'MainPage') {
      return (
        <MainPage
            navigator={navigator} />
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