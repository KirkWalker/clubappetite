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
var ReferAFriend = require('./app/ReferAFriend');
var Donate = require('./app/Donate');
var Checkout = require('./app/Checkout');
var ThankYou = require('./app/Thankyou');
var Payment = require('./app/Payment');
var MainPage = require('./app/MainPage');
var Messages = require('./app/Messages');
var Profile = require('./app/Profile');
var FacebookShare = require('./app/FacebookShare');
var MessageDetail = require('./app/MessageDetail');
var BusinessPage = require('./app/BusinessPage');
var BusinessDirectory = require('./app/BusinessDirectory');
var NoNavigatorPage = require('./app/NoNavigatorPage');
var Drawer = require('react-native-drawer');
var ControlPanel = require('./ControlPanel');

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
      this.openDrawer = this.openDrawer.bind(this);
      this.state = { user_profile: [], drawerDisabled: false };
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

    return (

        <Navigator
          initialRoute={{id: 'SplashPage', name: 'Splash Page'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }

            console.log('routeID:',route.id);

            if (route.id == 'LoginPage') {
                return Navigator.SceneConfigs.HorizontalSwipeJump;
            } else {
                return Navigator.SceneConfigs.FloatFromRight;
            }

          }} />

    );
  }
  renderScene(route, navigator) {


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


      //this.setState({drawerDisabled:true});
      return (
        <LoginPage
          navigator={navigator}
        />
      );
    }
    /*

    we pass the props data and openDrawer to the module
    the data is used for the login process
    openDrawer is used in the main navigator
    */
    if (routeId === 'MainPage') {
      return (

      <Drawer
        ref={c => this.drawer = c}
        content={controlPanel}
        styles={drawerStyles}
        negotiatePan={false}
        tweenHandlerOn={true}
        tweenHandler={this.tweenHandler}
        tweenDuration={350}
        tweenEasing={'linear'}
        panOpenMask={.1}
        drawerType={'overlay'}
        openDrawerOffset={100}
        closedDrawerOffset={0}
        acceptPan={false}
        >
        <MainPage
            navigator={navigator}
            data={route.data}
            user_profile={this.state.user_profile}
            openDrawer={this.openDrawer}
        />
      </Drawer>

      );
    }
    if (routeId === 'Profile') {
      return (
      <Drawer
              ref={c => this.drawer = c}
              content={controlPanel}
              styles={drawerStyles}
              negotiatePan={false}
              tweenHandlerOn={true}
              tweenHandler={this.tweenHandler}
              tweenDuration={350}
              tweenEasing={'linear'}
              panOpenMask={.1}
              drawerType={'overlay'}
              openDrawerOffset={100}
              closedDrawerOffset={0}
              acceptPan={false}
              >
        <Profile
          navigator={navigator}
          openDrawer={this.openDrawer}
          user_profile={this.state.user_profile}
        />
      </Drawer>
      );
    }
    if (routeId === 'FacebookShare') {
      return (
      <Drawer
              ref={c => this.drawer = c}
              content={controlPanel}
              styles={drawerStyles}
              negotiatePan={false}
              tweenHandlerOn={true}
              tweenHandler={this.tweenHandler}
              tweenDuration={350}
              tweenEasing={'linear'}
              panOpenMask={.1}
              drawerType={'overlay'}
              openDrawerOffset={100}
              closedDrawerOffset={0}
              acceptPan={false}
              >
        <FacebookShare
          navigator={navigator}
          openDrawer={this.openDrawer}
          user_profile={this.state.user_profile}
        />
      </Drawer>
      );
    }
    if (routeId === 'Messages') {
      return (
      <Drawer
              ref={c => this.drawer = c}
              content={controlPanel}
              styles={drawerStyles}
              negotiatePan={false}
              tweenHandlerOn={true}
              tweenHandler={this.tweenHandler}
              tweenDuration={350}
              tweenEasing={'linear'}
              panOpenMask={.1}
              drawerType={'overlay'}
              openDrawerOffset={100}
              closedDrawerOffset={0}
              acceptPan={false}
              >
        <Messages
          navigator={navigator}
          openDrawer={this.openDrawer}
          user_profile={this.state.user_profile}
        />
      </Drawer>
      );
    }
    if (routeId === 'Shop') {
      return (
      <Drawer
              ref={c => this.drawer = c}
              content={controlPanel}
              styles={drawerStyles}
              negotiatePan={false}
              tweenHandlerOn={true}
              tweenHandler={this.tweenHandler}
              tweenDuration={350}
              tweenEasing={'linear'}
              panOpenMask={.1}
              drawerType={'overlay'}
              openDrawerOffset={100}
              closedDrawerOffset={0}
              acceptPan={false}
              >
        <Shop
          navigator={navigator}
          openDrawer={this.openDrawer}
          user_profile={this.state.user_profile}
        />
      </Drawer>
      );
    }
    if (routeId === 'Cart') {
      return (
      <Drawer
              ref={c => this.drawer = c}
              content={controlPanel}
              styles={drawerStyles}
              negotiatePan={false}
              tweenHandlerOn={true}
              tweenHandler={this.tweenHandler}
              tweenDuration={350}
              tweenEasing={'linear'}
              panOpenMask={.1}
              drawerType={'overlay'}
              openDrawerOffset={100}
              closedDrawerOffset={0}
              acceptPan={false}
              >
        <Cart
          navigator={navigator}
          openDrawer={this.openDrawer}
          user_profile={this.state.user_profile}
        />
      </Drawer>
      );
    }
    if (routeId === 'Share') {
      return (
      <Drawer
              ref={c => this.drawer = c}
              content={controlPanel}
              styles={drawerStyles}
              negotiatePan={false}
              tweenHandlerOn={true}
              tweenHandler={this.tweenHandler}
              tweenDuration={350}
              tweenEasing={'linear'}
              panOpenMask={.1}
              drawerType={'overlay'}
              openDrawerOffset={100}
              closedDrawerOffset={0}
              acceptPan={false}
              >
        <Share
          navigator={navigator}
          openDrawer={this.openDrawer}
          user_profile={this.state.user_profile}
        />
      </Drawer>
      );
    }
    if (routeId === 'Refer') {
      return (
      <Drawer
              ref={c => this.drawer = c}
              content={controlPanel}
              styles={drawerStyles}
              negotiatePan={false}
              tweenHandlerOn={true}
              tweenHandler={this.tweenHandler}
              tweenDuration={350}
              tweenEasing={'linear'}
              panOpenMask={.1}
              drawerType={'overlay'}
              openDrawerOffset={100}
              closedDrawerOffset={0}
              acceptPan={false}
              >
        <ReferAFriend
          navigator={navigator}
          openDrawer={this.openDrawer}
          user_profile={this.state.user_profile}
        />
      </Drawer>
      );
    }
    if (routeId === 'Donate') {
      return (
      <Drawer
              ref={c => this.drawer = c}
              content={controlPanel}
              styles={drawerStyles}
              negotiatePan={false}
              tweenHandlerOn={true}
              tweenHandler={this.tweenHandler}
              tweenDuration={350}
              tweenEasing={'linear'}
              panOpenMask={.1}
              drawerType={'overlay'}
              openDrawerOffset={100}
              closedDrawerOffset={0}
              acceptPan={false}
              >
        <Donate
          navigator={navigator}
          openDrawer={this.openDrawer}
          user_profile={this.state.user_profile}
        />
      </Drawer>
      );
    }
    if (routeId === 'Payment') {
        return (
        <Drawer
                ref={c => this.drawer = c}
                content={controlPanel}
                styles={drawerStyles}
                negotiatePan={false}
                tweenHandlerOn={true}
                tweenHandler={this.tweenHandler}
                tweenDuration={350}
                tweenEasing={'linear'}
                panOpenMask={.1}
                drawerType={'overlay'}
                openDrawerOffset={100}
                closedDrawerOffset={0}
                acceptPan={false}
                >
          <Payment
            navigator={navigator}
            openDrawer={this.openDrawer}
            details={route.details}
            user_profile={this.state.user_profile}
          />
        </Drawer>
        );
    }
    if (routeId === 'Checkout') {
        return (
        <Drawer
                ref={c => this.drawer = c}
                content={controlPanel}
                styles={drawerStyles}
                negotiatePan={false}
                tweenHandlerOn={true}
                tweenHandler={this.tweenHandler}
                tweenDuration={350}
                tweenEasing={'linear'}
                panOpenMask={.1}
                drawerType={'overlay'}
                openDrawerOffset={100}
                closedDrawerOffset={0}
                acceptPan={false}
                >
          <Checkout
            navigator={navigator}
            openDrawer={this.openDrawer}
            details={route.details}
            user_profile={this.state.user_profile}
          />
        </Drawer>
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
    if (routeId === 'ThankYou') {
      return (
      <Drawer
              ref={c => this.drawer = c}
              content={controlPanel}
              styles={drawerStyles}
              negotiatePan={false}
              tweenHandlerOn={true}
              tweenHandler={this.tweenHandler}
              tweenDuration={350}
              tweenEasing={'linear'}
              panOpenMask={.1}
              drawerType={'overlay'}
              openDrawerOffset={100}
              closedDrawerOffset={0}
              acceptPan={false}
              >
        <ThankYou
          navigator={navigator}
          openDrawer={this.openDrawer}
          points={route.points}
          user_profile={this.state.user_profile}
        />
      </Drawer>
      );
    }
    /*
    pageName and id are passed to infoPage to populate the dynamic content.
    */
    if (routeId === 'Terms') {
      return (
      <Drawer
              ref={c => this.drawer = c}
              content={controlPanel}
              styles={drawerStyles}
              negotiatePan={false}
              tweenHandlerOn={true}
              tweenHandler={this.tweenHandler}
              tweenDuration={350}
              tweenEasing={'linear'}
              panOpenMask={.1}
              drawerType={'overlay'}
              openDrawerOffset={100}
              closedDrawerOffset={0}
              acceptPan={false}
              >
        <InfoPage
          navigator={navigator}
          openDrawer={this.openDrawer}
          pageName="Terms And Conditions"
          id={routeId}
          user_profile={this.state.user_profile}
        />
      </Drawer>
      );
    }
    if (routeId === 'Faq') {
      return (
      <Drawer
              ref={c => this.drawer = c}
              content={controlPanel}
              styles={drawerStyles}
              negotiatePan={false}
              tweenHandlerOn={true}
              tweenHandler={this.tweenHandler}
              tweenDuration={350}
              tweenEasing={'linear'}
              panOpenMask={.1}
              drawerType={'overlay'}
              openDrawerOffset={100}
              closedDrawerOffset={0}
              acceptPan={false}
              >
        <InfoPage
          navigator={navigator}
          openDrawer={this.openDrawer}
          pageName="Frequenty asked questions"
          user_profile={this.state.user_profile}
          id={routeId}
        />
      </Drawer>
      );
    }
    if (routeId === 'FoodBank') {
      return (
      <Drawer
              ref={c => this.drawer = c}
              content={controlPanel}
              styles={drawerStyles}
              negotiatePan={false}
              tweenHandlerOn={true}
              tweenHandler={this.tweenHandler}
              tweenDuration={350}
              tweenEasing={'linear'}
              panOpenMask={.1}
              drawerType={'overlay'}
              openDrawerOffset={100}
              closedDrawerOffset={0}
              acceptPan={false}
              >
        <InfoPage
          navigator={navigator}
          openDrawer={this.openDrawer}
          pageName="My Food Bank"
          user_profile={this.state.user_profile}
          id={routeId}
        />
      </Drawer>
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
      <Drawer
              ref={c => this.drawer = c}
              content={controlPanel}
              styles={drawerStyles}
              negotiatePan={false}
              tweenHandlerOn={true}
              tweenHandler={this.tweenHandler}
              tweenDuration={350}
              tweenEasing={'linear'}
              panOpenMask={.1}
              drawerType={'overlay'}
              openDrawerOffset={100}
              closedDrawerOffset={0}
              acceptPan={false}
              >
        <BusinessDirectory
          navigator={navigator}
          openDrawer={this.openDrawer}
          pageName="Business Directory"
          user_profile={this.state.user_profile}
          id={routeId}
        />
      </Drawer>
      );
    }
    if (routeId === 'BusinessPage') {
      return (
      <Drawer
              ref={c => this.drawer = c}
              content={controlPanel}
              styles={drawerStyles}
              negotiatePan={false}
              tweenHandlerOn={true}
              tweenHandler={this.tweenHandler}
              tweenDuration={350}
              tweenEasing={'linear'}
              panOpenMask={.1}
              drawerType={'overlay'}
              openDrawerOffset={100}
              closedDrawerOffset={0}
              acceptPan={false}
      >
        <BusinessPage
          navigator={navigator}
          openDrawer={this.openDrawer}
          pageName="Business Page"
          user_profile={this.state.user_profile}
          business_info={route.business_info}
        />
      </Drawer>
      );
    }
    if (routeId === 'MessageDetail') {
      return (
      <Drawer
              ref={c => this.drawer = c}
              content={controlPanel}
              styles={drawerStyles}
              negotiatePan={false}
              tweenHandlerOn={true}
              tweenHandler={this.tweenHandler}
              tweenDuration={350}
              tweenEasing={'linear'}
              panOpenMask={.1}
              drawerType={'overlay'}
              openDrawerOffset={100}
              closedDrawerOffset={0}
              acceptPan={false}
      >
        <MessageDetail
          navigator={navigator}
          openDrawer={this.openDrawer}
          pageName="Message Detail"
          user_profile={this.state.user_profile}
          message_info={route.message_info}
        />
      </Drawer>
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