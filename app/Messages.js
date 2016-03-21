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
      user_profile: [],
      loaded: false,
    };
  }

  componentDidMount() {
    this.mounted = true;
    InteractionManager.runAfterInteractions(() => {
      Users.getProfile(this);
      MyMessages.getMessageData(this);
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  gotoMessage(message) {
    if(DEBUG) {console.log("Moving to message");}
    this.props.navigator.push({
      id: 'MessageDetail',
      name: 'Message Detail',
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
      <View style={MessageStyles.header}>
        <Text style={MessageStyles.headerText}>HEADER IMAGE HERE</Text>
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
          style={MessageStyles.messageThumbnail}
          source={require('../img/email-icon-sm.png')}
        />
        <View style={MessageStyles.listInnerContainer}>
          <Text numberOfLines={1} style={MessageStyles.messageTitle}>Message Title Here</Text>
          <Text numberOfLines={2} style={MessageStyles.messageSubject}>Subject line describing contents of message...</Text>
        </View>
        <Image
          style={MessageStyles.arrow}
          source={require('../img/NavArrow.png')}
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
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
<ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMessage}
        renderHeader={this.renderHeader}
        style={[{backgroundColor: '#F2F2F2'}, {paddingTop: 70}]}
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
    color: 'gray',
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
  header: {
    alignItems: 'center',
    paddingTop: PADDING*10,
    paddingBottom: PADDING*10,
  },
  headerText: {
    fontFamily: 'Gill Sans',
    color: 'rgb(027, 135, 136)',
    fontSize: TITLE_TEXT,
    fontWeight: '400',
  },
  separator: {
    backgroundColor: '#f2f2f2',
    height: PADDING*5.5,
  },
  messageThumbnail: {
    width: WIDTH*0.14,
    height: WIDTH*0.14,
    resizeMode: 'contain',
  },
  messageTitle: {
    fontSize: INFO_TEXT,
    fontWeight: '500',
    color: 'gray',
    fontFamily: 'Gill Sans',
  },
  messageSubject: {
    fontSize: INFO_TEXT,
    fontWeight: '300',
    color: 'gray',
    fontFamily: 'Gill Sans',
  },
  arrow: {
    height: WIDTH*0.07,
    width: WIDTH*0.07,
    resizeMode: 'contain',
  },
});

module.exports = Messages;