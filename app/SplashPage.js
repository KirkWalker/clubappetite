'use strict';

var React = require('react-native');
var {
  Component,
  View,
  Image,
} = React;


var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var styles = require('../styles');

class SplashPage extends Component {
  componentWillMount() {
    var navigator = this.props.navigator;
    setTimeout(() => {
      navigator.replace({
        id: 'MainPage',
      });
    }, 1000);
  }
  render() {

    //console.log('width:'+width);
    //console.log('height:'+height);

    return (
      <Image style={[styles.imageContainer, {width: width}, {height: height}]} source={require('../img/Splash.png')} resizeMode={Image.resizeMode.sretch} />
    );
  }
}

module.exports = SplashPage;