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
            <Image style={thankyouStyle.background} source={require('../img/thankyou-bg.png')} resizeMode={Image.resizeMode.cover}/>
        </View>

        <View style={thankyouStyle.hexcontainer}>
          <Image style={thankyouStyle.hex} source={require('../img/thankyou-hex.png')} resizeMode={Image.resizeMode.contain}/>
          <Text style={thankyouStyle.points}> You have earned {'\n'} {this.props.points} Points </Text>
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
    width: width*.7,
    height: height*.7,
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
    backgroundColor: '#1D888A',
    color: '#fff',
    textAlign: 'center',
    fontSize: font,
    top: -height*.23
  }
});


module.exports = ThankYou;
