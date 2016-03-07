'use strict';

var React = require('react-native');
var {
  Component,
  View,
  Image,
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
      <Image style={styles.imageContainer} source={require('../img/Splash.png')} resizeMode="cover" />
    );
  }
}

module.exports = SplashPage;