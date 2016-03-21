'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  Navigator,
  TouchableOpacity,
} = React;

var styles = require('../styles');

var Users = require('../datalayer/User');
var MyDirectory = require('../datalayer/Directory');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');
var BusinessDirectory = require('./BusinessDirectory');
var BusinessPage = require('./BusinessPage');

class Shop extends Component {

  constructor(props) {
      super(props);
      this.state = {user_profile: [], DirectoryArray: []};
  }

  componentDidMount() {
      this.mounted = true;
      MyDirectory.getDirectoryData(this);
  }

  componentWillUnmount() {
    this.mounted = false;
  }
  render() {

    if(this.state.DirectoryArray.length > 0 && this.mounted){
      //console.log('DirectoryArray::',this.state.DirectoryArray);
    }

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
    return (
      <BusinessDirectory/>
    );
  }
  gotoNext() {
    this.props.navigator.push({
      id: 'NoNavigatorPage',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  }
}

module.exports = Shop;