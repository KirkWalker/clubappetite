'use strict';

var React = require('react-native');
var {
  Component,
  View,
  Text,
} = React;

var styles = require('../styles');

class SplashPage extends Component {
  componentWillMount() {
    var navigator = this.props.navigator;
    setTimeout(() => {
      navigator.replace({
        id: 'LoginPage',
      });
    }, 1000);
  }
  render() {
    return (
      <View style={styles.splashPageContainer}>
        <Text style={{color: 'white', fontSize: 32,}}>Club Appetite</Text>
      </View>
    );
  }
}

module.exports = SplashPage;