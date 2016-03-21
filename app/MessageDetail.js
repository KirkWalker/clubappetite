'use strict';

/* Requires */
import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  View,
  Navigator,
  Dimensions,
  PixelRatio,
  ScrollView,
} from 'react-native';

var DEBUG = true;
if (DEBUG) {console.log("MessageDetail DEBUG flag set\n---------------------");}

var styles = require('../styles');

var Users = require('../datalayer/User');
var Messages = require('../datalayer/Messages.js');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');

/* BusinessDirectory Component */
class MessageDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {user_profile: []}
  }

  componentDidMount() {
    if (DEBUG) {console.log("Received message id "+this.props.message_info.id);}
    this.mounted = true;
    Users.getProfile(this);
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
        }
      />
    );
  }

  renderScene(route, navigator) {
  	return (
      <ScrollView style={PageStyles.outerContainer}>
        <View style={PageStyles.innerContainer}>
          <View style={PageStyles.titleContainer}>
            <Image
              style={PageStyles.messageImage}
              source={require('../img/message-header.png')}
              resizeMode="contain"
            />
            <View style={titleTextContainer}>
              <Text style={PageStyles.titleText}>Message Title Here</Text>
              <Text style={PageStyles.dateText}>Date Goes Here</Text>
            </View>
          </View>
          <Text style={PageStyles.messageText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
        </View>
      </ScrollView>
  	);
  }
}
//Variables for styling. Used for scaling.
var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const PageStyles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#F2F2F2',
  },
  innerContainer: {
    backgroundColor: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  titleTextContainer: {

  },
  titleText: {
    fontSize: 21,
  },
  dateText: {
    fontSize: 15,
  },
  messageText: {
    fontSize: 16,
  }
});

module.exports = MessageDetail;