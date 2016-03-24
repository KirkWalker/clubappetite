'use strict';

var React = require('react-native');
var {
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator,
  PixelRatio,
  InteractionManager,
  Dimensions,
} = React;

var DEBUG = true;
if (DEBUG) {console.log("Messages.js DEBUG flag set\n---------------------");}

var styles = require('../styles');

var Users = require('../datalayer/User');
var MyMessages = require('../datalayer/Messages');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');

class Messages extends Component {

  constructor(props) {
    super(props);
    this.renderMessage = this.renderMessage.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      loaded: false,
      user_profile: [],
    };
  }

  componentDidMount() {
    this.mounted = true;
    Users.getProfile(this);
    InteractionManager.runAfterInteractions(() => {
      MyMessages.getMessageData(this);
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  gotoMessage(message) {
    if(DEBUG) {console.log("Pushing message id " + message.id + " to MessageDetail");}
    this.props.navigator.push({
      id: 'MessageDetail',
      name: 'Message Detail',
      message_info: message,
    });
  }

  renderLoadingView() {
    return(
      <View style={MessageStyles.loadingContainer}>
        <Text style={MessageStyles.loadingText}>Loading your inbox...</Text>
      </View>
    );
  }

  renderHeader() {
    return(
      <View>
        <Image resizeMode="contain" source={require('../img/message-header.png')} style={MessageStyles.headerImage} />
      </View>
    );
  }

  renderMessage(message) {
    return(
      <TouchableOpacity
        style={MessageStyles.listContainer}
        onPress={() => this.gotoMessage(message)}
      >
        <Image
          resizeMode="contain" 
          style={MessageStyles.messageThumbnail}
          source={require('../img/email-icon.png')}
        />
        <View style={MessageStyles.listInnerContainer}>
          <Text numberOfLines={1} style={MessageStyles.messageTitle}>{message.message_title}</Text>
          <Text numberOfLines={2} style={MessageStyles.messageSubject}>{message.message_content}</Text>
        </View>
        <Image
          resizeMode="contain" 
          style={MessageStyles.arrow}
          source={require('../img/arrow.png')}
        />
      </TouchableOpacity>
    );
  }

  renderSeparator(sectionID, rowID) {
    return(
      <View
        key={`${sectionID}-${rowID}`}
        style={MessageStyles.separator}
      />
    );
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
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMessage}
        renderHeader={this.renderHeader}
        style={[{backgroundColor: '#F2F2F2'}, {paddingTop: HEIGHT*0.11}]}
        renderSeparator={this.renderSeparator}
      />
    );
  }
}

// Variables for styles. Used for scaling to different screen sizes.
var TITLE_TEXT = (PixelRatio.get() <= 2) ? 19 : 25;
var INFO_TEXT = (PixelRatio.get() <= 2) ? 14 : 15;
var PADDING = (PixelRatio.get() >= 4) ? 3 : PixelRatio.get();
var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;
if (DEBUG) {console.log("PixelRatio: "+PixelRatio.get());}

const MessageStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2'
  },
  loadingText: {
    fontFamily: 'Gill Sans',
    color: 'rgb(163, 163, 163)',
    fontSize: TITLE_TEXT,
  },
  listContainer: {
    flexDirection: 'row',
    paddingTop: PADDING*8.33,
    paddingBottom: PADDING*8.33,
    paddingLeft: PADDING*8.33,
    paddingRight: PADDING*2,
    alignItems: 'center',
    backgroundColor: 'white',
    
    //shadows android
    elevation: 2,
    //shadows iOS
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  listInnerContainer: {
    flex: 1,
    paddingLeft: PADDING*8,
  },
  headerImage: {
    width: WIDTH,
    height: WIDTH*0.357,
    alignItems: 'stretch',
  },
  separator: {
    backgroundColor: '#f2f2f2',
    height: PADDING*5.5,
  },
  messageThumbnail: {
    width: WIDTH*0.14,
    height: WIDTH*0.14,
  },
  messageTitle: {
    fontSize: INFO_TEXT,
    fontWeight: '500',
    fontFamily: 'Gill Sans',
    color: 'rgb(163, 163, 163)',
  },
  messageSubject: {
    fontSize: INFO_TEXT,
    fontWeight: '300',
    fontFamily: 'Gill Sans',
    color: 'rgb(163, 163, 163)',
  },
  arrow: {
    height: WIDTH*0.07,
    width: WIDTH*0.07,
  },
});

module.exports = Messages;