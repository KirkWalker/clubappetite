'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  Navigator,
  TouchableOpacity,
  InteractionManager,
} = React;

var styles = require('../styles');

var Users = require('../datalayer/User');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');

class ThankYou extends Component {

  constructor(props) {
      super(props);
      this.state = {user_profile: []};
  }

  componentDidMount() {
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
          <Text>Your transaction has been completed.</Text>
          <Text>You now have {this.state.user_profile.user_points} points.</Text>
      </View>
    );
  }




}

module.exports = ThankYou;