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
var MyProducts = require('../datalayer/Products');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');

class Cart extends Component {

  constructor(props) {
      super(props);
      this.state = {user_profile: [], ProductArray: []};
  }

  componentDidMount() {
      this.mounted = true;
      Users.getProfile(this);
      MyProducts.getProductData(this);
  }

  componentWillUnmount() {
    this.mounted = false;
  }
  render() {

    if(this.state.ProductArray.length > 0 && this.mounted){
      console.log('ProductArray::',this.state.ProductArray);
    }

    var data = [];
    data.push(Users.getImageUrl(this));
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
      <View style={styles.container}>
        <TouchableOpacity
            onPress={this.gotoNext.bind(this)}>
          <Text>Slide Up Example</Text>
        </TouchableOpacity>
      </View>
    );
  }
  gotoNext() {
    this.props.navigator.push({
      id: 'NoNavigatorPage',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  }
}

module.exports = Cart;