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


class Share extends Component {

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
        <View style={styles.container}>












        </View>
      );







  }


  gotoShare() {
    this.props.navigator.push({
      id: 'Share',
      name: 'Share',
    });
  }


}


const shareStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B8889',
    height: height,
    marginTop: 70
  },
  banner: {
      marginTop:55,
      alignSelf: "stretch",
      backgroundColor: "#fff",
      elevation:2,
      shadowColor: '#999999',
      shadowOpacity: .8,
      shadowRadius: 2,
      shadowOffset: {
          height: 1,
          width: 1
      },
  },
  bannerad:{
       width:width,
       height:height*.15,
       alignItems: 'stretch',
  },

});



module.exports = Share;