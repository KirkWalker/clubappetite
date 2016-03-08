


var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} = React;

var styles = require('../styles');

module.exports = {

  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Text style={{color: 'white', margin: 10,}}>
          <Image source={require('../img/MenuButton.png')}
                            style={{width: 50, height: 50}}/>
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    return (
    <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.push({id: 'Profile',name:"Profile"})}>
        <Image source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
             style={{width: 50, height: 50}}>
          <Image source={require('../img/MenuHex.png')}
                  style={{width: 50, height: 50}}/>
        </Image>
    </TouchableOpacity>
    );
  },
  Title(route, navigator, index, navState) {
    return (
    <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
      <Image source={require('../img/NavLogo.png')}
           style={{width: 150, height: 48, marginLeft:40}}/>
    </View>
    );
  }

}