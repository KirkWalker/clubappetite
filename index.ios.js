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
var Deals = require('./app/Deals');
var Redeem = require('./app/Redeem');
var DealConfirm = require('./app/DealConfirm');
var Cart = require('./app/Cart');
var Share = require('./app/Share');
var ReferAFriend = require('./app/ReferAFriend');
var FacebookShare = require('./app/FacebookShare');
var Donate = require('./app/Donate');
var Checkout = require('./app/Checkout');
var ThankYou = require('./app/Thankyou');
var Payment = require('./app/Payment');
var MainPage = require('./app/MainPage');
var Messages = require('./app/Messages');
var MessageDetail  = require('./app/MessageDetail');
var Profile = require('./app/Profile');
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
  gotoDeals() {
       this.drawer.close();
       this.navigatorObj.push({
         id: 'Deals',
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




    return (

        <Navigator
          initialRoute={{id: 'SplashPage', name: 'Splash Page'}}
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
          gotoDeals={() => {this.gotoDeals()}}
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

      //this.drawer.disabled = true;
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
            >
        <MainPage
            navigator={navigator}
            data={route.data}
            openDrawer={this.openDrawer}
        />
        </Drawer>
      );
    }

    if (routeId === 'Cart') {
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
           negotiatePan={false}
         >
       <Cart
         navigator={navigator}
         openDrawer={this.openDrawer}
       />
       </Drawer>
     );
    }


    if (routeId === 'Profile') {
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
         negotiatePan={false}
       >
        <Profile
          navigator={navigator}
          openDrawer={this.openDrawer}
        />
        </Drawer>
      );
    }
    if (routeId === 'Messages') {
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
                 negotiatePan={false}
               >
        <Messages
          navigator={navigator}
          openDrawer={this.openDrawer}
        />
        </Drawer>
      );
    }
    if (routeId === 'MessageDetail') {
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
                 negotiatePan={false}
               >
        <MessageDetail
          navigator={navigator}
          openDrawer={this.openDrawer}
          pageName="Message Detail"
          message_info={route.message_info}
        />
        </Drawer>
      );
    }
    if (routeId === 'Deals') {
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
                  negotiatePan={false}
                >
         <Deals
           navigator={navigator}
           openDrawer={this.openDrawer}
         />
         </Drawer>
       );
    }
    if (routeId === 'Redeem') {
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
                  negotiatePan={false}
                >
         <Redeem
           navigator={navigator}
           openDrawer={this.openDrawer}
           deal_info={route.deal_info}
         />
         </Drawer>
       );
    }
    if (routeId === 'DealConfirm') {
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
                  negotiatePan={false}
                >
         <DealConfirm
           navigator={navigator}
           openDrawer={this.openDrawer}
           deal_info={route.deal_info}
         />
         </Drawer>
       );
    }
    if (routeId === 'Share') {
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
                 negotiatePan={false}
               >
        <Share
          navigator={navigator}
          openDrawer={this.openDrawer}
        />
        </Drawer>
      );
    }
    if (routeId === 'FacebookShare') {
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
                 negotiatePan={false}
               >
        <FacebookShare
          navigator={navigator}
          openDrawer={this.openDrawer}
        />
        </Drawer>
      );
    }
    if (routeId === 'Refer') {
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
                 negotiatePan={false}
               >
        <ReferAFriend
          navigator={navigator}
          openDrawer={this.openDrawer}
        />
        </Drawer>
      );
    }
    if (routeId === 'Donate') {
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
                 negotiatePan={false}
               >
        <Donate
          navigator={navigator}
          openDrawer={this.openDrawer}
        />
        </Drawer>
      );
    }
    if (routeId === 'Payment') {
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
                   negotiatePan={false}
                 >
          <Payment
            navigator={navigator}
            openDrawer={this.openDrawer}
            details={route.details}
          />
        </Drawer>
        );
    }
    if (routeId === 'Checkout') {
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
                   negotiatePan={false}
                 >
          <Checkout
            navigator={navigator}
            openDrawer={this.openDrawer}
            details={route.details}
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
                 negotiatePan={false}
               >
        <ThankYou
          navigator={navigator}
          openDrawer={this.openDrawer}
          points={route.points}
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
                 negotiatePan={false}
               >
        <InfoPage
          navigator={navigator}
          openDrawer={this.openDrawer}
          pageName="Terms And Conditions"
          id={routeId}
        />
      </Drawer>
      );
    }
    if (routeId === 'Faq') {
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
                 negotiatePan={false}
               >
        <InfoPage
          navigator={navigator}
          openDrawer={this.openDrawer}
          pageName="Frequenty asked questions"
          id={routeId}
        />
      </Drawer>
      );
    }
    if (routeId === 'FoodBank') {
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
                 negotiatePan={false}
               >
        <InfoPage
          navigator={navigator}
          openDrawer={this.openDrawer}
          pageName="My Food Bank"
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
                 negotiatePan={false}
               >
        <BusinessPage
          navigator={navigator}
          openDrawer={this.openDrawer}
          pageName="Business Page"
          business_info={route.business_info}
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