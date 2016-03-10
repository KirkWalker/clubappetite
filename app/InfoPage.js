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
var InfoPageData = require('../datalayer/InfoPage');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');

class InfoPage extends Component {

  constructor(props) {
      super(props);
      this.state = {user_profile: [],count: 0, dataObj: [] };

  }

  componentDidMount() {

    var pageName = this.props.pageName;
    var pageID = this.props.id;

    if(pageID == "Terms"){
      InfoPageData.getTermPageData(this);
    }else if(pageID == "Faq"){
      InfoPageData.getFaqPageData(this);
    }

    /*
    successful result is an object: this.state.user_profile
    */
    Users.getProfile(this);

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

    console.log('state');
    console.log(this.state);

    return (
      <View style={styles.container}>
        <Text>{this.props.pageName}</Text>
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

module.exports = InfoPage;