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
  InteractionManager,
  Dimensions,
  PixelRatio,
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

var {width, height} = Dimensions.get('window');
var font = 20;

if (PixelRatio.get() <= 2) {
  font = 17;
}

//var htmlCode = null;

class InfoPage extends Component {

  constructor(props) {
      super(props);
        this.state = {user_profile: [],
        htmlText: '',
        pageName: '',
        logo: '',
        count: 0,
        dataObj: [],
      };

  }

  componentDidMount() {

    var _this = this;
    this.mounted = true;
    /*
    successful result is an object: this.state.user_profile
    */
    Users.getProfile(this);
    InteractionManager.runAfterInteractions(() => {

      InfoPageData.getPageData(_this,this.props.id.toLowerCase());
    });
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

    //console.log('state');
    //console.log('renderScene state:',this.state);
    var src = require('../img/ClubAppetiteLogo.png');
    if(this.state.logo != ''){
      src = {uri:this.state.logo}
    }

    return (
      <View style={InfoStyles.container}>

          <Image style={InfoStyles.logo} source={src} resizeMode={Image.resizeMode.contain} />

          <View style={InfoStyles.touchableContainer}>
            <View style={InfoStyles.textContainer}>
              <Text style={InfoStyles.title}>{this.state.pageName}</Text>
            </View>
            <Image source={require('../img/arrow.png')} style={InfoStyles.arrow} resizeMode={Image.resizeMode.contain} />
          </View>

          <View style={InfoStyles.contentContainer}>

            <WebView
              ref={WEBVIEW_REF}
              automaticallyAdjustContentInsets={false}
              style={InfoStyles.webView}
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




}



const InfoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:150,
  },
  webView: {
      backgroundColor: 'rgba(255,255,255,0.8)',
      height: height*.59,
      width: width*.895,
  },
  logo: {
    width: width*.65,
    height: height*.12,
    marginBottom: 10,
  },
  touchableContainer: {
    flexDirection: 'row',
    width: width,
    paddingTop: height*.025,
    paddingBottom: height*.025,
    paddingLeft: width*.05,
    paddingRight: width*.05,
    marginBottom: height*.05,
    alignItems: 'center',
    backgroundColor: '#fff',
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
    width: width*.8
  },
  title: {
    fontSize: font,
    fontWeight: '500',
    color: '#a3a3a3',
    fontFamily: 'Gill Sans'
  },
  description: {
    fontSize: font*.85,
    fontWeight: '400',
    color: '#a3a3a3',
    fontFamily: 'Gill Sans'
  },
  arrow: {
    height: width*.08,
    width: width*.08,
  },
  contentContainer: {
    width: width*.97,
    paddingTop: height*.025,
    paddingBottom: height*.025,
    paddingLeft: width*.07,
    paddingRight: width*.07,
    marginBottom: height*.05,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: .3,
    shadowRadius: 3,
    shadowOffset: {
      height: 2.5,
      width:0
    }
  },
  titleContainer: {
    flexDirection: 'row',
    paddingLeft: width*.05,
    paddingRight: width*.05,
    marginBottom: height*.02,
    width: width*.9,
    alignItems: 'center'
  },
  titleTextContainer: {
    flexDirection: 'column',
    paddingLeft: width*.05,
    paddingRight: width*.09,
    width: width*.72
  },
  profilePic: {
    width: width*.2,
    height: height*.1,
    resizeMode: 'contain'

  },

});



module.exports = InfoPage;