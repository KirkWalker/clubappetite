'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  Navigator,
  TouchableOpacity,
  Dimensions,
  InteractionManager,
  Image,
} = React;

var styles = require('../styles');

var Users = require('../datalayer/User');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


class ReferAFriend extends Component {

  constructor(props) {
      super(props);
      this.state = {user_profile: []};

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
    return (
       <View style={[ReferStyles.container]}>
         <View style={[ReferStyles.column]}>
          <View style={[ReferStyles.module1]}>
            <Text>Refer A Friend Code</Text>
          </View>
          <View style={[ReferStyles.module2]}>
            <Text>Refer A Friend Code</Text>
          </View>
          <View style={[ReferStyles.module3]}>
            <Text>Refer A Friend Code</Text>
          </View>
         </View>
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

const ReferStyles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        marginTop: 70,
        backgroundColor: '#efefef',
        justifyContent: 'center',
        alignItems: 'center',
    },
    column: {
        width:width*.9,
        height:height,
    },
    module1: {
      flex: 2,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:5,
      marginBottom:5,
    },
    module2: {
      flex: 4,
      backgroundColor: 'white',
      marginTop:5,
      marginBottom:5,
    },
    module3: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 3,
      backgroundColor: 'white',
      marginTop:5,
      marginBottom:5,
    },
    module4: {
      flex: 2,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:5,
      marginBottom:5,
    },


});


module.exports = ReferAFriend;
