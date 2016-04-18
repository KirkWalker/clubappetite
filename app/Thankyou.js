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
  PixelRatio,
  Dimensions,
  Image,
} = React;

var styles = require('../styles');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');
var Users = require('../datalayer/User');

var font = 20;
if (PixelRatio.get() <= 2) {
  font = 18;
}

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class ThankYou extends Component {

  constructor(props) {
      super(props);
      this.state = {user_profile: []};
  }

  componentDidMount() {
      this.mounted = true;
      Users.getProfile(this);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {

    var data = [];
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
      <View style={thankyouStyle.container}>

        <View style={thankyouStyle.bgContainer}>
            <Image style={thankyouStyle.background} source={require('../img/thankyou-bg.jpg')} resizeMode={Image.resizeMode.cover}/>
        </View>

        <View style={thankyouStyle.hexcontainer}>
          <Image style={thankyouStyle.gif} source={require('../img/thankyou-points.gif')} resizeMode={Image.resizeMode.contain}/>
          <Image style={thankyouStyle.hex} source={require('../img/hexagon.png')} resizeMode={Image.resizeMode.contain}>
            <Text style={thankyouStyle.points}>WAY TO GO!{'\n\n'}You have earned {'\n'} {this.props.points} Points </Text>
          </Image>
        </View>

      </View>
    );
  }

}


var thankyouStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
     backgroundColor:'white',
  },
  hexcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hex: {
    width: width*.65,
    height: width*.65,
    justifyContent: 'center',
  },
  gif: {
    width: width,
    height: height*.32,
    bottom: -25
  },
  bgContainer: {
    position: 'absolute',
  },
  background: {
    width: width,
    height: height*.4,
    position: 'absolute',
    bottom: -height,
    flex: 1,
  },
  points: {
    fontFamily: 'Gill Sans',
    backgroundColor: 'transparent',
    color: '#fff',
    textAlign: 'center',
    fontSize: font,
  }
});


module.exports = ThankYou;
