


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
      <TouchableOpacity style={styles.navbar_button} onPress={() => props[1]()}>
        <Text style={{color: 'white', margin: 10,}}>
          <Image source={require('../img/MenuButton.png')} style={{width: 50, height: 50}}/>
        </Text>
      </TouchableOpacity>
    );
  },
  Title(route, navigator, index, navState) {
   return (
<View style={styles.navbar_logocontainer}>
       <TouchableOpacity
                 onPress={() => navigator.parentNavigator.push({id: 'MainPage',name:"Main Page"})}>
         <Image source={require('../img/NavLogo.png')}
              style={styles.navbar_logo}/>
       </TouchableOpacity>
</View>
   );
  },
  RightButton(route, navigator, index, navState) {
    return (
    <TouchableOpacity style={styles.navbar_button} onPress={() => navigator.parentNavigator.push({id: 'Profile',name:"Profile"})}>
        <Image source={{uri: props[0]}}
             style={{width: 50, height: 50}}>
          <Image source={require('../img/MenuHex.png')}
                  style={{width: 50, height: 50}}/>
        </Image>
    </TouchableOpacity>
    );
  },


})