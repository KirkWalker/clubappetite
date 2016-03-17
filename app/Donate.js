'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  Navigator,
  TouchableOpacity,
  Dimensions,
  Image,
} = React;

var styles = require('../styles');

var Users = require('../datalayer/User');
var Button = require('../modules/ButtonLogin');

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');

class Donate extends Component {

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


          <View style={donateStyles.container}>
            <Image source={require('../img/ClubAppetiteLogo.png')} style={donateStyles.logo} />
          </View>
          <View style={styles.contentForm} top={40}>
            <View style={styles.module}>


            </View>
          </View>



      </View>
    );
  }
  gotoNext() {
    this.props.navigator.push({
      id: 'NoNavigatorPage',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  }
}

var donateStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  logo: {
    width: width*.75,
    height: height*.18,
    alignItems: 'stretch',
    resizeMode: 'contain'
  },

});

module.exports = Donate;