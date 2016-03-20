'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  Navigator,
  TouchableOpacity,
  InteractionManager,
  PixelRatio,
  Dimensions,
  Image,
} = React;

var styles = require('../styles');

var Users = require('../datalayer/User');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');


var font = 20;
if (PixelRatio.get() <= 2) {
  font = 18;
}

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class Checkout extends Component {

  constructor(props) {
      super(props);
      this.state = {user_profile: [], ProductArray: this.props.details.ProductArray, cartTotal: this.props.details.cartTotal};

  }

  componentDidMount() {
    this.mounted = true;
    InteractionManager.runAfterInteractions(() => {
      Users.getProfile(this);
    });
  }

  componentWillUnmount() {
      this.mounted = false;
  }

  render() {

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

    console.log('cartTotal',this.state.cartTotal);


    return (

      <View style={[styles.container,{marginTop:50}]}>
        <View>
          <Text>${this.state.cartTotal}</Text>
        </View>

      </View>
    );
  }

}


var checkoutStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
     backgroundColor:'white',
  },

});


module.exports = Checkout;
