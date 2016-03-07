'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} = React;

var styles = require('../styles');

class MainPage extends Component {
  render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={styles.navbar}
                routeMapper={NavigationBarRouteMapper} />
          } />




    );
  }
  renderScene(route, navigator) {
    return (

        <Image style={styles.imageContainer} source={require('../img/background2.png')} resizeMode="cover">

          <TouchableHighlight style={styles.welcome, {backgroundColor: 'yellow', padding: 10}}
              onPress={this.gotoMessagesPage.bind(this)}>
            <Text style={{backgroundColor: 'yellow', color: 'green'}}>Messages</Text>
          </TouchableHighlight>



        </Image>




    );
  }
  gotoMessagesPage() {
    this.props.navigator.push({
      id: 'Messages',
      name: 'Messages',
    });
  }
}

var NavigationBarRouteMapper = {
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
          <Image source={require('../img/Hexagon4.png')}
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
};

module.exports = MainPage;