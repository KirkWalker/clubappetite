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
  PixelRatio,
  Image,
} = React;

var styles = require('../styles');

var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');
var Users = require('../datalayer/User');
var BannerAd = require('../modules/BannerAds');

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var font = 20;
var fontWeight;

if (PixelRatio.get() <= 2) {
  font = 18;
}


class ReferAFriend extends Component {

  constructor(props) {
      super(props);
      this.state = {user_profile: []};

  }

  componentDidMount() {

        /*
        This method sets the state variables for the user profile
        It will add a new user on first login or retrieve current info
        If not logged in it will redirect to login page

        successful result is an object: this.state.user_profile
        */

        this.mounted = true;
        Users.getProfile(this);
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


    var title = 'Here is your referral code:';
    var showButton = false;

    if(this.state.user_profile.refer_code == null
        || this.state.user_profile.refer_code == undefined
        || this.state.user_profile.refer_code == ''){

        title = 'Generate your referral code:';
        showButton = true;
    }

    return (
       <View style={ReferStyles.container}>
        <View style={ReferStyles.iconsContainer}>
          <TouchableOpacity>
            <Image source={require('../img/share-facebook.png')} style={ReferStyles.icons} resizeMode={Image.resizeMode.contain}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../img/share-instagram.png')} style={ReferStyles.icons} resizeMode={Image.resizeMode.contain}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../img/share-linkedin.png')} style={ReferStyles.icons} resizeMode={Image.resizeMode.contain}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../img/share-twitter.png')} style={ReferStyles.icons} resizeMode={Image.resizeMode.contain}/>
          </TouchableOpacity>
        </View>

        <Image source={require('../img/3-hex.png')} style={ReferStyles.hexes}/>
        <Text style={ReferStyles.heading}>Refer A Friend!</Text>
        <Text style={ReferStyles.description}>Receive 500 points when they sign-up{'\n'}using your code below</Text>
         <View>
          
          <View style={[ReferStyles.module2, ReferStyles.module]}>
            {(() => {
                if(showButton) {
                  return (
                    <View style={{marginTop:30, marginBottom:30}}>
                      <TouchableOpacity
                        onPress={this.generateCode.bind(this)}
                        style={ReferStyles.generate}
                        >
                        <Text style={ReferStyles.generatetext}>GENERATE</Text>
                      </TouchableOpacity>
                    </View>

                  );
                } else {
                  return (
                    <Text style={[ReferStyles.code]}>{this.state.user_profile.refer_code}</Text>
                  );
                }
            })()}

          </View>
        </View>
        <View style={[ReferStyles.module3, ReferStyles.module]}>
          <BannerAd refThis={this} pageName={'Refferafriend'} />
        </View>
      </View>
    );
  }


  generateCode() {

    Users.getReferalCode(this);

  }





}

const ReferStyles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        marginTop: height*0.11,
        backgroundColor: '#1B8889',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconsContainer: {
        flexDirection: 'row',
        marginTop: height*.1,
        marginBottom: height*.1
    },
    icons: {
        width: width*.16,
        height: height*.11,
        marginLeft: width*.035,
        marginRight: width*.035,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    hexes: {
        width: width*.1,
        height: width*.1
    },
    column: {
        width:width*.9,
        height:height*.7,
    },
    module:{
        backgroundColor: 'white',
        elevation:2,
        shadowColor: '#999999',
        shadowOpacity: .8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
    },
    module1: {
      flex: 2,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:5,
      marginBottom:5,
    },
    module2: {
      flex: 4,
      backgroundColor: 'white',
      marginTop:5,
      marginBottom:5,
      padding:20,
      alignItems: 'center',
    },
    module3: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 2,
      width:width,
      backgroundColor: 'white',
      marginTop:5,
    },
    heading: {
      fontSize:font,
      color:'#fff',
      fontWeight:'400',
      fontFamily: 'Gill Sans',
      textAlign:'center',
      lineHeight:40,
    },
    title: {
      fontSize:20,
      color:'#4A8A1D',
      fontWeight:'bold',
      fontFamily: 'Gill Sans',
      textAlign:'center',
      lineHeight:40,
    },
    description: {
      fontSize:font*.7,
      color:'#fff',
      fontWeight:'200',
      fontFamily: 'Gill Sans',
      textAlign:'center',
      lineHeight:18,
      top:5,
    },
    code: {
      fontSize:40,
      color:'red',
      fontWeight:'bold',
      fontFamily: 'Gill Sans',
      textAlign:'center',
      lineHeight:80,
      marginBottom:20,
    },
    message: {

      fontSize:16,
      fontFamily: 'Gill Sans',
      lineHeight:30,
      textAlign:'center',
    },
        generate: {
          backgroundColor: '#4A8A1D',
          paddingLeft:15,
          paddingRight:15,
          paddingTop:5,
          paddingBottom:5,
          borderRadius:50,
    },
    generatetext: {
      fontSize:18,
      color:'white',
      fontWeight:'bold',
      fontFamily: 'Gill Sans',
    },
});


module.exports = ReferAFriend;
