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
  TouchableHighlight,
  TouchableOpacity,
  InteractionManager,
} = React;

var styles = require('../styles');

var Button = require('../modules/ButtonLogin');
var Users = require('../datalayer/User');

var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');
var {width,height} = Dimensions.get('window');

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

    return (
    <View style={styles.container}>

        <Text style={styles.mainPanelTitle}>
            Welcome to Club Appetite
          </Text>
        <Text>Hello {Username + '\n\n'}</Text>

        <View style={styles.module} marginTop={10}>
            <Button onPress={this.gotoCartPage.bind(this)} buttonText="Needed Now" marginTop={10} />
        </View>

        <View style={styles.module} marginTop={10}>
            <Button onPress={this.gotoDealsPage.bind(this)} buttonText="Shop Appetite" marginTop={10} />
        </View>

        <View style={styles.module} marginTop={10}>
            <Button onPress={this.gotoMessagesPage.bind(this)} buttonText="Messages" marginTop={10} />
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

module.exports = MainPage;