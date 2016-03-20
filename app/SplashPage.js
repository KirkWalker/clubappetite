'use strict';

var React = require('react-native');
var {
  Component,
  View,
  Image,
  StyleSheet,
  Text,
  InteractionManager,
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
    var hasPoints = false;
    if(this.state.user_profile.user_points != undefined){
      hasPoints = true;
    }
    return (
      <View>

        <View style={splashStyle.bgContainer}>
            <Image style={splashStyle.background} source={require('../img/splash-bg-sm.png')} />
        </View>

        <View style={splashStyle.container}>      
          <Image style={splashStyle.hex} source={require('../img/Splash.png')}>

            {(() => {
                if(hasPoints){
                      return(
                      <View style={splashStyle.pointcontainer}>
                        <Text style={splashStyle.pointText}>{text1}</Text>
                        <Text style={splashStyle.pointTextBold}>1930</Text>
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

var splashStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  hex: {
    width: width*.9,
    height: height*.80,
    //resizeMode: 'contain',
  },
  pointcontainer :{
    top: height*.567,
    left: width*.475,
    width:width*.4,
    alignItems: 'center',

  },
  pointText: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Gill Sans',
    textAlignVertical:'center'
  },
  pointTextBold: {
    fontSize: 40,
    color: 'white',
    fontFamily: 'Gill Sans',
    textAlignVertical:'center'
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