
import React, {
  Component,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  PixelRatio,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Navigator,
  View
} from 'react-native';

var DEBUG = true;
if (DEBUG) {console.log("Redeem DEBUG flag set\n---------------------");}

var {width, height} = Dimensions.get('window');

var Users = require('../datalayer/User');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');
var styles = require('../styles');
var Button = require('../modules/Button');

var font = 22;
if (PixelRatio.get() <= 2) {
  font = 18;
}

class Redeem extends Component {

  constructor(props) {
        super(props);
        this.state = {user_profile: []};
        //result = props.bannerads.getAdData(this);
        console.log("props: ",props);
  }

  componentDidMount() {

        /*
        This method sets the state variables for the user profile
        It will add a new user on first login or retrieve current info
        If not logged in it will redirect to login page

        successful result is an object: this.state.user_profile
        */

        this.mounted = true;
        Users.getProfile(this);
        if (DEBUG) {console.log("Received deal_info ",this.props.deal_info);}
  }

  componentWillUnmount() {
      this.mounted = false;
  }


  render() {

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
      <View style={redeemStyles.container}>
        <Image source={{uri: this.props.deal_info.deal_image}} style={redeemStyles.header} />
        
        <View style={redeemStyles.contentContainer}>
          <Text style={redeemStyles.title}>{this.props.deal_info.deal_title}</Text>
          <Text style={redeemStyles.description}>One Line Description</Text>
          <Text style={redeemStyles.points}>{this.props.deal_info.deal_price} Points</Text>
          <Image source={require('../img/redeem-button.png')} style={redeemStyles.button} />
          <ScrollView>
            <View>
              <Text style={redeemStyles.description}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const redeemStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    marginTop: height*0.11,
  },
  contentContainer: {
    top: height*.02,
    left: width*.05,
    width: width*.9
  },
  header: {
    width: width,
    height: height*.3
  },
  title: {
    fontWeight: '400',
    fontSize: font,
    fontFamily: 'Gill Sans'
  },
  description: {
    fontWeight: '300',
    fontFamily: 'Gill Sans',
    color: '#a3a3a3'
  },
  points: {
    fontWeight: '500',
    fontFamily: 'Gill Sans',
    color: 'rgb(027, 135, 136)',
    marginTop: height*.015
  },
  button: {
    width: width*.23,
    height: height*.05,
    marginTop: height*.01,
    marginBottom: height*.02
  }
});

module.exports = Redeem;