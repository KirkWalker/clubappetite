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
} = React;

var styles = require('../styles');
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

      //console.log('main page object');
      //console.log(this);

      /*
      This method sets the state variables for the user profile
      It will add a new user on first login or retrieve current info
      If not logged in it will redirect to login page

      successful result is an object: this.state.user_profile
      */
      Users.getProfile(this);
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
          } />
    );
  }
  renderScene(route, navigator) {

    var _this = this;
    var ImageURL = Users.getImageUrl(_this);
    var Username = this.state.user_profile.name;
    var Email = this.state.user_profile.email;

    return (
    <View>

        <Image style={[styles.imageContainer, {width:width}]} source={require('../img/ViewBG.png')} resizeMode="cover"></Image>

        <TouchableHighlight style={styles.welcome, {backgroundColor: 'yellow', padding: 10}}
            onPress={this.gotoMessagesPage.bind(this)}>
          <Text style={{backgroundColor: 'yellow', color: 'green'}}>Messages</Text>
        </TouchableHighlight>

        <Text style={styles.mainPanelTitle}>
            Welcome to Club Appetite
          </Text>
          <Image
           source={{uri: ImageURL}}
           style={[styles.base, {borderRadius: 5 }]}
         />
        <Text>Hello {Username + '\n\n'}</Text>
        <Text>Get ready for spam, we now have your email. {'\n\n'}Want proof? {Email}</Text>

      </View>

    );
  }
  gotoMessagesPage() {
    this.props.navigator.push({
      id: 'Messages',
      name: 'Messages',
    });
  }
}

module.exports = MainPage;