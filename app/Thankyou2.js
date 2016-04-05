'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
  View
} from 'react-native';

var Button = require('./Button');
var {width, height} = Dimensions.get('window');
var font = 10;

if (PixelRatio.get() <= 2) {
  font = 1;
}

class Thankyou2 extends Component {
  render() {
    return (
      <View style={thankyou2Styles.container}>
        <Image source={require('../img/thankyou2-bg.png')} style={thankyou2Styles.containerImg} resizeMode={Image.resizeMode.contain}/>
        <Image source={require('../img/yellow-hex.png')} style={thankyou2Styles.yellowHex} resizeMode={Image.resizeMode.contain}/>
        <View style={thankyou2Styles.textContainer}>
          <Text style={thankyou2Styles.text}>YOU'VE EARNED</Text>
          <Text style={thankyou2Styles.number}>550</Text>
          <Text style={thankyou2Styles.text}>POINTS</Text>
        </View>
        <View style={thankyou2Styles.buttonContainer}>
          <TouchableOpacity>
            <Image source={require('../img/receipt-button.png')} style={thankyou2Styles.button} resizeMode={Image.resizeMode.contain}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../img/shop-button.png')} style={thankyou2Styles.button} resizeMode={Image.resizeMode.contain}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const thankyou2Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 70,
    backgroundColor: '#000',
  },
  containerImg: {
    width: width,
    height: height,
  },
  yellowHex: {
    width: width*.4,
    height: height*.23,
    top: -height*.58,
    marginBottom: -height*.04,
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    top: -height*.71
  },
  text: {
    fontWeight: '500',
    fontFamily: 'Gill Sans',
    fontSize: 11.5,
    color: '#fff',
    backgroundColor: '#f0bb1a',
  },
  number: {
    fontWeight: '600',
    fontSize: 41,
    fontFamily: 'Gill Sans',
    color: '#fff',
    backgroundColor: '#f0bb1a',
  },
  buttonContainer: {
    flexDirection: 'column',
    marginTop: -height*.67,
  },
  button: {
    width: width*.45,
    height: height*.08,
  }
});

module.exports = Thankyou2;