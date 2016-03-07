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
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');


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


module.exports = MainPage;