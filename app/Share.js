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
  InteractionManager,
  Image,
} = React;

var styles = require('../styles');

var Users = require('../datalayer/User');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


class Share extends Component {

  constructor(props) {
      super(props);
      this.state = {user_profile: []};

  }

  componentDidMount() {
    this.mounted = true;
    InteractionManager.runAfterInteractions(() => {
      Users.getProfile(this);
    });
  }

  componentWillUnmount() {
      this.mounted = false;
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
      <View style={shareStyles.container}>
              <View style={shareStyles.iconsContainer}>
                <Image source={require('../img/share-facebook.png')} style={shareStyles.icons}/>
                <Image source={require('../img/share-instagram.png')} style={shareStyles.icons}/>
                <Image source={require('../img/share-linkedin.png')} style={shareStyles.icons}/>
                <Image source={require('../img/share-twitter.png')} style={shareStyles.icons}/>
              </View>

              <View style={shareStyles.optionsContainer}>
                <Image source={require('../img/3-hex.png')} style={shareStyles.hexes}/>
                <View style={shareStyles.textContainer}>
                  <Text style={shareStyles.title}>Tell People</Text>
                  <Text style={shareStyles.description}>100 points for each share</Text>
                </View>
                <Image source={require('../img/arrow.png')} style={shareStyles.arrow}/>
              </View>
              <TouchableOpacity onPress={this.gotoRefer.bind(this)} >
                <View style={shareStyles.optionsContainer}>
                  <Image source={require('../img/3-hex.png')} style={shareStyles.hexes}/>
                  <View style={shareStyles.textContainer}>
                    <Text style={shareStyles.title}>Refer a Friend</Text>
                    <Text style={shareStyles.description}>500 points for each person who uses your code to sign up</Text>
                  </View>
                  <Image source={require('../img/arrow.png')} style={shareStyles.arrow}/>
                </View>
              </TouchableOpacity>

              <View style={shareStyles.banner}>
                <Text>Ad here</Text>
              </View>

            </View>
    );
  }


  gotoRefer() {
    this.props.navigator.push({
      id: 'Refer',
      name: 'Refer A Friend',
    });
  }


}


const shareStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B8889',
    height: height,
    marginTop: 70
  },
  iconsContainer: {
    flexDirection: 'row',
    marginTop: height*.1,
    marginBottom: height*.1
    // marginTop: height*.09
  },
  icons: {
    width: width*.16,
    height: height*.11,
    marginLeft: width*.035,
    marginRight: width*.035,
    resizeMode: 'contain',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  optionsContainer: {
    flexDirection: 'row',
    width: width,
    paddingTop: height*.025,
    paddingBottom: height*.025,
    paddingLeft: width*.05,
    paddingRight: width*.05,
    marginBottom: height*.05,
    alignItems: 'center',
    backgroundColor: '#1B8889',
    shadowColor: '#000',
    shadowOpacity: .3,
    shadowRadius: 3,
    shadowOffset: {
      height: 2.5,
      width:0
    }
  },
  textContainer: {
    flexDirection: 'column',
    paddingLeft: width*.05,
    paddingRight: width*.05,
    width: width*.72
  },
  hexes: {
    width: width*.1,
    height: width*.1
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
    fontFamily: 'Gill Sans'
  },
  description: {
    fontSize: 15,
    fontWeight: '300',
    color: '#fff',
    fontFamily: 'Gill Sans'
  },
  arrow: {
    height: 33,
    width: 33,
    resizeMode: 'contain'
  },
  banner: {
    flex: 0.5,
    alignSelf: "stretch",
    borderColor: "#fff",
    borderWidth: 1,
  },
});



module.exports = Share;