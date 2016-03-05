'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} = React;

var styles = require('../styles');

class LoginPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Club Appetite</Text>
        <Text>The would be the login page</Text>
        <TouchableHighlight
            onPress={this.gotoNext.bind(this)}>
          <Text style={{color: 'red'}}>Go Home</Text>
        </TouchableHighlight>
      </View>
    );
  }
  gotoNext() {
    this.props.navigator.push({
      id: 'MainPage',
      name: 'Main Page',
    });
  }
}

module.exports = LoginPage;