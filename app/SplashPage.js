'use strict';

var React = require('react-native');
var {
  Component,
  View,
  Image,
  StyleSheet,
  Text,
  InteractionManager,
  Platform,
} = React;


var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Users = require('../datalayer/User');

var styles = require('../styles');

class SplashPage extends Component {

  constructor(props) {
      super(props);
      this.state = {user_profile: [], amount: 0, schedule: ''};

  }

  componentDidMount() {
    this.mounted = true;
    InteractionManager.runAfterInteractions(() => {
      this.nologin = true;
      Users.getProfile(this);

      var navigator = this.props.navigator;
      setTimeout(() => {
        navigator.replace({
          id: 'MainPage',
        });
      }, 3000);

    });
  }

  componentWillUnmount() {
      this.mounted = false;
  }


  render() {

    var text1 = "YOU'VE EARNED";
    var hasPoints = true;
    var points = 18480;
    if(this.state.user_profile.user_points != undefined){
      hasPoints = true;
      points = this.state.user_profile.user_points;
    }




    return (
      <View>

        <View style={splashStyle.bgContainer}>
            <Image style={splashStyle.background} resizeMode="cover" source={require('../img/splash-bg-sm.png')} />
        </View>

        <View style={splashStyle.container}>      
          <Image style={splashStyle.hex} source={require('../img/Splash.png')}>

            {(() => {
                if(hasPoints){
                      return(
                      <View style={splashStyle.pointcontainer}>
                        <Text style={splashStyle.pointText}>{text1}</Text>
                        <Text style={splashStyle.pointTextBold}>{points}</Text>
                        <Text style={splashStyle.pointText}>POINTS</Text>
                      </View>
                      );
                }
            })()}

          </Image >

        </View>

      </View>
    );

  }
}

var topoffset = .57;

if(Platform.OS === 'ios'){
  topoffset = .59;
}

var splashStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  hex: {
    width: width*.95,
    height: height*.82,
    alignItems: 'stretch',
  },
  pointcontainer :{
    top: height*topoffset,
    left: width*.519,
    width:width*.395,
    alignItems: 'center',
    justifyContent:'center',
  },
  pointText: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Gill Sans',
    textAlignVertical:'center',
    textAlign:'center',
  },
  pointTextBold: {
    fontSize: 50,
    color: 'white',
    fontFamily: 'Gill Sans',
    textAlignVertical:'center',
    textAlign:'auto',
  },
  bgContainer: {
    position: 'absolute'
  },
  background: {
    width: width,
    height: height*.25,
    position: 'absolute',
    bottom: -height,
    flex: 1,
    resizeMode: 'cover'
  },

});
module.exports = SplashPage;