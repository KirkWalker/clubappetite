'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  Navigator,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} = React;

var styles = require('../styles');
var Users = require('../datalayer/User');

class MainPage extends Component {


    constructor(props) {
        super(props);
        this.state = {user_profile: []};
        //result = props.bannerads.getAdData(this);

    }

    componentDidMount() {
      var _this = this;
      /*
      This method sets the state variables for the user profile
      It will add a new user on first login or retrieve current info
      If not logged in it will redirect to login page

      successful result is an object: this.state.user_profile
      */
      Users.getProfile(_this);
    }

    render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={styles.navbar}
                routeMapper={NavigationBarRouteMapper} />
          } />
    );
  }
  renderScene(route, navigator) {

    var _this = this;
    var ImageURL = Users.getImageUrl(_this);
    var Username = this.state.user_profile.name;
    var Email = this.state.user_profile.email;

    return (
      <View style={styles.container}>
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

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Text style={{color: 'white', margin: 10,}}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    return (
    <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.push({id: 'Profile',name:"Profile"})}>
        <Text style={{color: 'white', margin: 10,}}>
          Profile
        </Text>
    </TouchableOpacity>
    );
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.navbar_title}>
          Club Appetite
        </Text>
      </TouchableOpacity>
    );
  }
};

module.exports = MainPage;