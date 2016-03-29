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

var DEBUG = false;
if (DEBUG) {console.log("MessageDetail DEBUG flag set\n---------------------");}

var styles = require('../styles');

var Users = require('../datalayer/User');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');

/* BusinessDirectory Component */
class MessageDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {user_profile: []}

    this.message_date = this.computeDate(this.props.message_info.last_mod);
  }

  componentDidMount() {
    //if (DEBUG) {console.log("Received message id "+this.props.message_info.id);}
    this.mounted = true;
    Users.getProfile(this);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  computeDate(date){
    var messageDate = date.split("-");
    var day = messageDate[2].split(" ")[0];
    var monthNumber = messageDate[1];
    var month = "";
    var year = messageDate[0];
    switch(monthNumber) {
      case "01":
        month = "January";
        break;
      case "02": 
        month = "February";
        break;
      case "03":
        month = "March";
        break;
      case "04":
        month = "April";
        break;
      case "05":
        month = "May";
        break;
      case "06":
        month = "June";
        break;
      case "07":
        month = "July";
        break;
      case "08":
        month = "August";
        break;
      case "09":
        month = "September";
        break;
      case "10":
        month = "October";
        break;
      case "11":
        month = "November";
        break;
      case "12":
        month = "December";
        break;
    }
    messageDate = month + " " + day + ", " + year;
    return messageDate;
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
              source={require('../img/email-icon.png')}
              resizeMode="contain"
            />
            <View style={PageStyles.titleTextContainer}>
              <Text numberofLines={1} style={PageStyles.titleText}>{this.props.message_info.message_title}</Text>
              <Text numberOfLines={1} style={PageStyles.dateText}>{this.message_date}</Text>
            </View>
          </View>
          <Text style={PageStyles.messageText}>{this.props.message_info.message_content}</Text>
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
    paddingTop: HEIGHT*0.11,
    backgroundColor: '#F2F2F2',
  },
  innerContainer: {
    backgroundColor: 'white',
    padding: 25,
    margin: 25,
    marginTop: 35,
    marginBottom: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
  },
  titleTextContainer: {

  },
  messageImage: {
    width: WIDTH*0.14,
    height: WIDTH*0.14,
    marginRight: 15,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Gill Sans',
    color: 'rgb(163, 163, 163)',
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'Gill Sans',
    fontWeight: '300',
    color: 'rgb(163, 163, 163)',
  },
  messageText: {
    fontSize: 14,
    fontFamily: 'Gill Sans',
    fontWeight: '300',
    color: 'rgb(163, 163, 163)',
  }
});

module.exports = MessageDetail;