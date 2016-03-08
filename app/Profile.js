'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  Navigator,
  TouchableOpacity,
} = React;


var styles = require('../styles');
var Users = require('../datalayer/User');

var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');

class Profile extends Component {


    constructor(props) {
        super(props);
        this.state = {user_profile: []};
    }


  componentDidMount() {
    /*
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
    return (
      <View style={styles.container}>
        <TouchableOpacity
            onPress={this.gotoNext.bind(this)}>
          <Text>Slide Up Example</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={this.gotoMessages.bind(this)}>
          <Text>Messages</Text>
        </TouchableOpacity>

      </View>
    );
  }
  gotoNext() {
    this.props.navigator.push({
      id: 'NoNavigatorPage',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  }

    gotoMessages() {
      this.props.navigator.push({
        id: 'Messages',
        name:'Messages',
      });
    }


}

module.exports = Profile;