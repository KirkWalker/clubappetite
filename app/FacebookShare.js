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
  NativeModules,
  TouchableHighlight,
  TextInput,
} = React;

var styles = require('../styles');

var Users = require('../datalayer/User');
var Button = require('../modules/Button');

var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


var FBLogin = require('react-native-facebook-login');
var FBLoginManager = require('NativeModules').FBLoginManager;
var FB_PHOTO_WIDTH = 50;

class FacebookShare extends Component {

  constructor(props) {
      super(props);
      this.state = {user_profile: [], user:null};
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

  componentWillMount(){
      this.updateView();
  }



  updateView(){
      var _this = this;

      FBLoginManager.getCredentials(function(error, data){
        if (!error) {
          //console.log("Existing login found.",data.credentials);
          //console.log("FBLoginManager",FBLoginManager);
          _this.setState({ user : data.credentials });
        } else {
           //console.log("login not found.");
          _this.setState({ user : null });
        }
      });
  }



  render() {


      //console.log('FBLoginManager user',this.state.user);

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
        var _this = this;
        var _viewName = '';


        if(_this.state.user == null){
            _viewName = <FacebookLoginButton user={this.state.user} onPress={this.onPress.bind(this)} />;
        }else {
            _viewName = <ShareForm
            handleLogout={this.handleLogout.bind(this)}
            gotoShare={this.gotoShare.bind(this)}
            user={this.state.user}
          />;
        }





          return (

          <View style={shareStyles.container}>

            <View style={[shareStyles.column]}>

              <View style={[shareStyles.module1]}>
                <Text style={[shareStyles.heading]}>Share On Facebook</Text>
              </View>

               {_viewName}

            </View>

            <View style={[shareStyles.banner]}>
                <Image
                     source={{uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Loblaws.svg/1280px-Loblaws.svg.png'}}
                     style={[shareStyles.bannerimg]}
                     resizeMode="cover"
                />
            </View>



          </View>

          );

  }


  gotoShare() {
    this.props.navigator.push({
      id: 'Share',
      name: 'Share',
    });
  }

  handleLogin(){
      var _this = this;
      var permissions = ['email', 'public_profile'];
      //loginWithPermissions(permissions,
      //FBLoginManager.setLoginBehavior('Native');
      FBLoginManager.LoginBehavior=FBLoginManager.LoginBehaviors.Browser;

      FBLoginManager.loginWithPermissions(permissions,function(error, data){
        if (!error) {

            Users.updateProfile(data,_this);

        } else {
          console.log(error, data);
        }
      });
  }

  handleLogout(){
      var _this = this;
      FBLoginManager.logout(function(error, data){
        if (!error) {
          _this.setState({ user : null});
          //_this.props.onLogout && _this.props.onLogout();
        } else {
          console.log(error, data);
        }
      });
  }

  onPress(){
      this.state.user
        ? this.handleLogout()
        : this.handleLogin();

      //this.props.onPress && this.props.onPress();
  }



}



var ShareForm = React.createClass({

  getInitialState: function(){
    return {
      info: null,
      messageText:"",
    };
   },
   shouldComponentUpdate: function(nextProps, nextState) {
     return true;
   },
   render: function() {

    return (
    <View style={[shareStyles.formmodule]}>
      <View style={[shareStyles.formmodule1]}>

        <TextInput placeholder="Write Something" style={shareStyles.input} onChangeText={(text) => this.setState({messageText: text})} value={this.state.messageText} />

      </View>
      <View style={[shareStyles.formmodule2]}>







      </View>
      <View style={[shareStyles.formmodule3]}>
          <View style={[shareStyles.cell1]}>
              <Button
                  buttonText="CANCEL"
                  buttonColor="gray"
                  onPress={() => {
                    this.props.handleLogout();
                  }}
                />
          </View>
          <View style={[shareStyles.cell2]}>
              <Button
                  buttonText="POST"
                  buttonColor="blue"
                  onPress={() => {
                    this.postFBmessage();
                  }}
                />
          </View>
      </View>


    </View>
    );
  },

  postFBmessage() {

    var _user = this.props.user;
    var _message = this.state.messageText;

    var api = `https://graph.facebook.com/${_user.userId}/feed?message=${_message}&access_token=${_user.token}`;

    console.log('postFBmessage upgrade api', api);

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {


           console.log('postFBmessage responseData', responseData);

      })
      .done();


  }



});


var FacebookLoginButton = React.createClass({


   shouldComponentUpdate: function(nextProps, nextState) {
     return true;
   },
   render() {
    var text = this.props.user ? "Log out" : "Log in with Facebook";
    return (
      <View style={[shareStyles.module2]}>

            <TouchableHighlight
              style={shareStyles.FBcontainer}
              onPress={this.props.onPress}
            >
              <View style={shareStyles.FBLoginButton}>
                <Image style={shareStyles.FBLogo} source={require('../img/FB-f-Logo__white_144.png')} />
                <Text style={[shareStyles.FBLoginButtonText, this.props.user ? shareStyles.FBLoginButtonTextLoggedIn : shareStyles.FBLoginButtonTextLoggedOut]}
                  numberOfLines={1}>{text}</Text>
              </View>
            </TouchableHighlight>

      </View>
    );
   }

});





const shareStyles = StyleSheet.create({
  loginContainer: {
    marginTop: height*0.11+80,

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBump: {
    marginBottom: 15,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    height: height,
    marginTop: 70,
    backgroundColor: '#efefef',
  },
    column: {
        width:width*.9,
        flex: 6,
        backgroundColor: 'white',
        marginBottom: 20,
        marginTop: 20,
        padding:10,
        elevation:2,
        shadowColor: '#999999',
        shadowOpacity: .8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
    },
    input: {
        padding: 10,
        height: height*.06,
        width: width*.85,
        backgroundColor: 'white',
    },
    module1: {
      flex: 2,
      backgroundColor: 'rgb(078, 106, 167)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    module2: {
      flex: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    formmodule: {
      flex: 11,

    },
    formmodule1: {
      flex: 1,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderColor: '#666666',
    },
    formmodule2: {
      flex: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    formmodule3:
    {
      flex: 1,
      justifyContent: 'center',
      flexDirection:'row',
    },
    cell1: {
        justifyContent: 'center',
        flex:1,
        marginLeft:0,
        marginRight:20,
    },
    cell2: {
        justifyContent: 'center',
        flex:1,
    marginLeft:20,
        marginRight:0,
    },
    banner: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 2,
      backgroundColor: 'white',
    },
    heading: {
      fontSize:25,
      color:'#ffffff',
      fontWeight:'bold',
      fontFamily: 'Gill Sans',
    },

    title: {
      fontSize:20,
      color:'#666666',
      fontFamily: 'Gill Sans',
    },
    message: {

    fontSize:16,
    fontFamily: 'Gill Sans',
    lineHeight:30,
    textAlign:'center',
  },
  bannerimg:{
     width:width,
     height:height*.15,
     alignItems: 'stretch',
  },
  FBcontainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  },
  FBLoginButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',

      height: 30,
      width: 175,
      paddingLeft: 2,

      backgroundColor: 'rgb(66,93,174)',
      borderRadius: 3,
      borderWidth: 1,
      borderColor: 'rgb(66,93,174)',

      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 0
      },
    },
    FBLoginButtonText: {
      color: 'white',
      fontWeight: '600',
      fontFamily: 'Helvetica neue',
      fontSize: 14.2,
    },
    FBLoginButtonTextLoggedIn: {
      marginLeft: 5,
    },
    FBLoginButtonTextLoggedOut: {
      marginLeft: 18,
    },
    FBLogo: {
      position: 'absolute',
      height: 14,
      width: 14,

      left: 7,
      top: 7,
    },


});

module.exports = FacebookShare;