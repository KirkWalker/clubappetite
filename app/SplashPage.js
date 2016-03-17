'use strict';

var React = require('react-native');
var {
  Component,
  View,
  Image,
  StyleSheet
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
    }, 2000);
  }
  render() {

    //console.log('width:'+width);
    //console.log('height:'+height);

    return (
      <View>

        <View style={splashStyle.bgContainer}>
            <Image style={splashStyle.background} source={require('../img/splash-bg-sm.png')} />
        </View>

        <View style={splashStyle.container}>      
          <Image style={splashStyle.hex} source={require('../img/Splash.png')} />
        </View>

      </View>
    );
  }
}

var splashStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  hex: {
    width: width*.80,
    height: height*.80,
    resizeMode: 'contain',
  },
  bgContainer: {
    position: 'absolute'
  },
  background: {
    width: width,
    height: height*.25,
    position: 'absolute',
    bottom: -height,
    flex: 1,
    resizeMode: 'cover'
  },

});
module.exports = SplashPage;