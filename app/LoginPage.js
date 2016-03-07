'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} = React;

var styles = require('../styles');
var result;

class LoginPage extends Component {



  constructor(props) {
      super(props);
      this.state = {count: null, dataObj: null};
      result = props.bannerads.getAdData(this);

  }

  render() {

    var _this = this;
    console.log("data:");
    console.log(this.props.bannerads.getResult());

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Club Appetite</Text>
        <Text>The would be the login page</Text>
        <TouchableHighlight
            onPress={this.gotoNext.bind(this)}>
          <Text style={{color: 'red'}}>Go Home</Text>
        </TouchableHighlight>


        <Text>Count:{this.state.count}</Text>

      </View>
    );
  }
  gotoNext() {
    this.props.navigator.push({
      id: 'MainPage',
      name: 'Main Page',
    });
  }
}

module.exports = LoginPage;