


var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Dimensions,
} = React;

var styles = require('../styles');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


module.exports = props =>({

  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={styles.navbar_button} onPress={() => props[0]()}>
          <Image style={styles.navbar_menu} source={require('../img/MenuButton.png')} />
      </TouchableOpacity>
    );
  },
  Title(route, navigator, index, navState) {
   return (

       <TouchableOpacity style={styles.navbar_logocontainer} onPress={() => navigator.parentNavigator.push({id: 'MainPage',name:"Main Page"})}>
         <Image source={require('../img/logo-white.png')} style={styles.navbar_logo} resizeMode={Image.resizeMode.contain}/>
       </TouchableOpacity>

   );
  },
  RightButton(route, navigator, index, navState) {
    return (


    <TouchableOpacity style={styles.navbar_button} onPress={() => navigator.parentNavigator.push({id: 'Profile',name:"Profile"})}>
      {/*
        <Image source={{uri: props[0]}}
             style={{width: 50, height: 50}}>
          <Image source={require('../img/MenuHex.png')}
                  style={{width: 50, height: 50}}/>
        </Image>
     */}
    </TouchableOpacity>


    );
  },


})