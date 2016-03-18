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
var InfoPage = require('./app/InfoPage');
var Register = require('./app/Register');
var Shop = require('./app/Shop');
var Cart = require('./app/Cart');
var Share = require('./app/Share');
var Donate = require('./app/Donate');
var Payment = require('./app/Payment');
var MainPage = require('./app/MainPage');
var Messages = require('./app/Messages');
var Profile = require('./app/Profile');
var BusinessPage = require('./app/BusinessPage');
var BusinessDirectory = require('./app/BusinessDirectory');
var NoNavigatorPage = require('./app/NoNavigatorPage');
var Drawer = require('react-native-drawer');
var ControlPanel = require('./ControlPanel');

var BannerAds = require('./datalayer/BannerAds');
var Users = require('./datalayer/User');

var styles = require('./styles');
var drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 0,
  }
}




class AMGSandbox extends Component {

  constructor(props) {
      super(props);

      this.settings = {
          drawerType: 'overlay',
          openDrawerOffset:100,
          closedDrawerOffset:0,
          panOpenMask: .1,
          panCloseMask: .9,
          relativeDrag: false,
          panStartCompensation: true,
          openDrawerThreshold: .25,
          tweenHandlerOn: false,
          tweenDuration: 350,
          tweenEasing: 'linear',
          disabled: false,
          tweenHandlerPreset: null,
          acceptDoubleTap: true,
          acceptTap: false,
          acceptPan: true,
          rightSide: false,
      }

      this.openDrawer = this.openDrawer.bind(this);
      this.state = { user_profile: [] };

  }
  gotoLogin() {
    this.drawer.close();
    this.navigatorObj.push({
      id: 'LoginPage',
      name: 'Login Page',
    });
  }

  openDrawer(){
    this.drawer.open()
  }
  gotoProfile() {
      this.drawer.close();
      this.navigatorObj.push({
        id: 'Profile',
        name: 'Profile',
      });
  }

  gotoDonate() {
        this.drawer.close();
        this.navigatorObj.push({
          id: 'Donate',
          name: 'Donate',
        });
  }

  gotoHome() {
       this.drawer.close();
       this.navigatorObj.push({
         id: 'MainPage',
         name: 'Main PAge',
       });
  }

  gotoMessage() {
      this.drawer.close();
      this.navigatorObj.push({
        id: 'Messages',
        name: 'Messages',
      });
  }
  gotoShare() {
      this.drawer.close();
      this.navigatorObj.push({
        id: 'Share',
        name: 'Share',
      });
  }
  gotoFaq() {
      this.drawer.close();
      this.navigatorObj.push({
        id: 'Faq',
        name: 'Faq',
      });
  }
  gotoFoodBank() {
      this.drawer.close();
      this.navigatorObj.push({
        id: 'FoodBank',
        name: 'FoodBank',
      });
  }
  gotoTerms() {
       this.drawer.close();
       this.navigatorObj.push({
         id: 'Terms',
         name: 'Terms',
       });
  }
  gotoShop() {
       this.drawer.close();
       this.navigatorObj.push({
         id: 'Shop',
         name: 'Shop Appetite',
       });
  }
  gotoCart() {
     this.drawer.close();
     this.navigatorObj.push({
       id: 'Cart',
       name: 'Shopping Cart',
     });
  }
  gotoDirectory() {
     this.drawer.close();
     this.navigatorObj.push({
       id: 'BusinessDirectory',
       name: 'Business Directory',
     });
  }
  handleLogout(){

    Users.handleLogout();
    this.drawer.close();
    this.navigatorObj.push({
      id: 'LoginPage',
      name: 'Login Page',
    });
   }

  render() {

    /*
    this is an example of how to add navagation items to the drawer.
    gotoShoppingCart is a function in this class that we expose to our control panel module here
    */

    var controlPanel = <ControlPanel
        closeDrawer={() => {this.drawer.close()}}
        gotoProfile={() => {this.gotoProfile()}}
        gotoMessage={() => {this.gotoMessage()}}
        gotoHome={() => {this.gotoHome()}}
        gotoFaq={() => {this.gotoFaq()}}
        gotoTerms={() => {this.gotoTerms()}}
        gotoFoodBank={() => {this.gotoFoodBank()}}
        handleLogout={() => {this.handleLogout()}}
        gotoShop={() => {this.gotoShop()}}
        gotoDirectory={() => {this.gotoDirectory()}}
        gotoDonate={() => {this.gotoDonate()}}
        gotoShare={() => {this.gotoShare()}}

    />


    return (
      <Drawer
        ref={c => this.drawer = c}
        type={this.settings.drawerType}
        animation={this.settings.animation}
        openDrawerOffset={this.settings.openDrawerOffset}
        closedDrawerOffset={this.settings.closedDrawerOffset}
        panOpenMask={this.settings.panOpenMask}
        panCloseMask={this.settings.panCloseMask}
        relativeDrag={this.settings.relativeDrag}
        panStartCompensation={this.settings.panStartCompensation}
        openDrawerThreshold={this.settings.openDrawerThreshold}
        content={controlPanel}
        styles={drawerStyles}
        disabled={this.settings.disabled}
        tweenHandler={this.tweenHandler}
        tweenDuration={this.settings.tweenDuration}
        tweenEasing={this.settings.tweenEasing}
        acceptDoubleTap={this.settings.acceptDoubleTap}
        acceptTap={this.settings.acceptTap}
        acceptPan={this.settings.acceptPan}
        changeVal={this.settings.changeVal}
        negotiatePan={false}
        side={this.settings.rightSide ? 'right' : 'left'}
      >
        <Navigator
          initialRoute={{id: 'Donate', name: 'Splash Page'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} />
      </Drawer>
    );
  }
  renderScene(route, navigator) {
    //used by methods that control navigation later
    this.navigatorObj = navigator;
    var _this=this;
    var routeId = route.id;
    //console.log('index: route.routeId='+routeId,this.drawer);

    if (routeId === 'SplashPage') {
      return (
        <SplashPage
          navigator={navigator} />
      );
    }
    if (routeId === 'LoginPage') {

      //this.drawer.disabled = true;
      return (
        <LoginPage
          navigator={navigator}
          bannerads={BannerAds}/>
      );
    }
    /*

    we pass the props data and openDrawer to the module
    the data is used for the login process
    openDrawer is used in the main navigator
    */
    if (routeId === 'MainPage') {
      return (
        <MainPage
            navigator={navigator}
            data={route.data}
            openDrawer={this.openDrawer}
        />
      );
    }
    if (routeId === 'Profile') {
      return (
        <Profile
          navigator={navigator}
          openDrawer={this.openDrawer}
        />
      );
    }
    if (routeId === 'Messages') {
      return (
        <Messages
          navigator={navigator}
          openDrawer={this.openDrawer}
        />
      );
    }
    if (routeId === 'Shop') {
      return (
        <Shop
          navigator={navigator}
          openDrawer={this.openDrawer}
        />
      );
    }
    if (routeId === 'Cart') {
      return (
        <Cart
          navigator={navigator}
          openDrawer={this.openDrawer}
        />
      );
    }
    if (routeId === 'Share') {
      return (
        <Share
          navigator={navigator}
          openDrawer={this.openDrawer}
        />
      );
    }
    if (routeId === 'Donate') {
      return (
        <Donate
          navigator={navigator}
          openDrawer={this.openDrawer}
        />
      );
    }
    if (routeId === 'Payment') {
        return (
          <Payment
            navigator={navigator}
            openDrawer={this.openDrawer}
            details={route.details}
          />
        );
    }
    if (routeId === 'Register') {
      return (
        <Register
          navigator={navigator}
          openDrawer={this.openDrawer}
        />
      );
    }
    /*
    pageName and id are passed to infoPage to populate the dynamic content.
    */
    if (routeId === 'Terms') {
      return (
        <InfoPage
          navigator={navigator}
          openDrawer={this.openDrawer}
          pageName="Terms And Conditions"
          id={routeId}
        />
      );
    }
    if (routeId === 'Faq') {
      return (
        <InfoPage
          navigator={navigator}
          openDrawer={this.openDrawer}
          pageName="Frequenty asked questions"
          id={routeId}
        />
      );
    }
    if (routeId === 'FoodBank') {
      return (
        <InfoPage
          navigator={navigator}
          openDrawer={this.openDrawer}
          pageName="My Food Bank"
          id={routeId}
        />
      );
    }
    if (routeId === 'NoNavigatorPage') {
      return (
        <NoNavigatorPage
            navigator={navigator} />
      );
    }
    if (routeId === 'BusinessDirectory') {
      return (
        <BusinessDirectory
          navigator={navigator}
          openDrawer={this.openDrawer}
          pageName="Business Directory"
          id={routeId}
        />
      );
    }
    if (routeId === 'BusinessPage') {
      return (
        <BusinessPage
          navigator={navigator}
          openDrawer={this.openDrawer}
          pageName="Business Page"
        />
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