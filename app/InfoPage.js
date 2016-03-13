'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  Navigator,
  WebView,
  Image,
  TouchableOpacity,
} = React;

var styles = require('../styles');

var Users = require('../datalayer/User');
var InfoPageData = require('../datalayer/InfoPage');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');

var HEADER = '#3b5998';
var BGWASH = 'rgba(255,255,255,0.8)';
var DISABLED_WASH = 'rgba(255,255,255,0.25)';

var TEXT_INPUT_REF = 'urlInput';
var WEBVIEW_REF = 'webview';
var DEFAULT_URL = 'https://m.facebook.com';
//var htmlCode = null;

class InfoPage extends Component {

  constructor(props) {
      super(props);
        this.state = {user_profile: [],
        htmlText: '',
        count: 0,
        dataObj: [],
      };







  }

  componentDidMount() {

    var _this = this;
/*
    successful result is an object: this.state.user_profile
    */
    Users.getProfile(this);
    InfoPageData.getPageData(_this,this.props.id.toLowerCase());

    //console.log(this.state);



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

    //console.log('state');
   // console.log(this.state);
    var src = require("../img/background2.png");

    return (
      <View style={styles.container}>
        <View style={styles.floatRight}>
          <Image style={{width: 150, height: 90}} source={src} resizeMode={Image.resizeMode.stretch} />
        </View>

          <View style={styles.centerContent}>

            <WebView
              ref={WEBVIEW_REF}
              automaticallyAdjustContentInsets={false}
              style={styles.webView}
              source={{html: this.state.htmlText}}
              //javaScriptEnabled={true}
              //domStorageEnabled={true}
              //decelerationRate="normal"
              startInLoadingState={false}
              scalesPageToFit={true}
            />


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



module.exports = InfoPage;