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
} = React;

var styles = require('../styles');

var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


class ReferAFriend extends Component {

  constructor(props) {
      super(props);
      this.state = {user_profile: this.props.user_profile};

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
    var message = 'Each person who uses your code when they register earns you 500 points!';
    var showButton = false;

    if(this.state.user_profile.refer_code == null
        || this.state.user_profile.refer_code == undefined
        || this.state.user_profile.refer_code == ''){

        title = 'Generate your referral code:';
        showButton = true;
    }

    return (
       <View style={[ReferStyles.container]}>
         <View style={[ReferStyles.column]}>
          <View style={[ReferStyles.module1, ReferStyles.module]}>
            <Text style={[ReferStyles.heading]}>Refer A Friend And Earn POINTS!</Text>
          </View>
          <View style={[ReferStyles.module2, ReferStyles.module]}>
            <Text style={[ReferStyles.title]}>{title}</Text>
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


            <Text style={[ReferStyles.message]}>{message}</Text>
          </View>
         </View>
         <View style={[ReferStyles.module3, ReferStyles.module]}>
           <Image
                source={{uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Loblaws.svg/1280px-Loblaws.svg.png'}}
                style={[ReferStyles.banner]}
                resizeMode="cover"
           />
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
        marginTop: 70,
        backgroundColor: '#efefef',
        justifyContent: 'center',
        alignItems: 'center',
    },
    column: {
        width:width*.9,
        height:height*.7,
    },
    module:{
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
      fontSize:25,
      color:'#4A8A1D',
      fontWeight:'bold',
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
    banner:{
       width:width,
       height:height*.15,
       alignItems: 'stretch',
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
