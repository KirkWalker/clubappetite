'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  Navigator,
  Image,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
} = React;

var {width, height} = Dimensions.get('window');
var font = 20;

if (PixelRatio.get() <= 2) {
  font = 17;
}

var styles = require('../styles');
var Users = require('../datalayer/User');

var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');

class Profile extends Component {


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
      <View style={profileStyles.container}>
        <Image source={require('../img/profile-title-container.png')} style={profileStyles.header} />
        <Text style={profileStyles.name}>NAME LASTNAME</Text>
        <View style={profileStyles.pointsContainer}>
          <Text style={profileStyles.title}>YOU'VE EARNED</Text>
          <Text style={profileStyles.number}>{this.state.user_profile.user_points}</Text>
          <Text style={profileStyles.title}>POINTS</Text>
        </View>
      </View>
    );
  }

    gotoMessages() {
      this.props.navigator.push({
        id: 'Messages',
        name:'Messages',
      });
    }
}

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 70,
    backgroundColor: '#1d888a',
  },
  header: {
    width: width,
    height: height*.5,
    resizeMode: 'contain'
  },
  name: {
    fontWeight: '500',
    fontFamily: 'Gill Sans',
    fontSize: 15,
    color: '#f0bb1a'
  },
  pointsContainer: {
    marginTop: width*.1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
    fontFamily: 'Gill Sans',
    fontSize: 13,
    color: '#fff'
  },
  number: {
    fontWeight: '600',
    fontSize: 44,
    fontFamily: 'Gill Sans',
    color: '#fff'
  }
});
module.exports = Profile;