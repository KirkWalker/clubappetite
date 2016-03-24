
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

var DEBUG = false;
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
        //console.log("props: ",props);
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
        <View style={redeemStyles.imageContainer}>
          <Image source={{uri: this.props.deal_info.deal_image}} style={redeemStyles.header} />
        </View>
        <View style={redeemStyles.contentContainer}>
          <Text style={redeemStyles.title}>{this.props.deal_info.deal_title}</Text>
          <Text style={redeemStyles.description}>{this.props.deal_info.deal_short_desc}</Text>
          <Text style={redeemStyles.points}>{this.props.deal_info.deal_price} Points</Text>


            {(() => {
                if((this.state.user_profile.user_points-this.props.deal_info.deal_price) > 0){
                    return (
                    <View style={redeemStyles.buttonContainer}>
                        <Button
                            buttonText="CONFIRM"
                            buttonColor="green"
                            onPress={() => {
                              this.gotoConfirm();
                            }}
                         />
                    </View>
                    );
                }else{
                    return (
                    <View style={redeemStyles.errorContainer}>
                        <Text style={redeemStyles.errortext}>Sorry, You do not have{'\n'}enough points for this item</Text>
                    </View>
                    );
                }

            })()}




        </View>
        <View style={redeemStyles.scrollview}>
        <ScrollView>

           <Text style={redeemStyles.description}>{this.props.deal_info.deal_desc}</Text>

        </ScrollView>
        </View>

      </View>
    );
  }

    gotoConfirm() {
      this.props.navigator.push({
        id: 'DealConfirm',
        name: 'Deal Confirm',
        deal_info: this.props.deal_info,
      });
    }




}

const redeemStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    marginTop: height*0.11,
    alignItems:'center',
  },
  buttonContainer: {
  marginTop:5,
  width: width*.45,
  },
  errorContainer: {
    marginTop:10,
    marginBottom:10,
    width: width*.9,
    alignItems:'center',
  },
  imageContainer: {
      width: width,
    },
  contentContainer: {
    top: height*.02,
    left: width*.05,
    width: width*.9,
    marginBottom:20,
  },
  scrollview: {
    width: width*.9,
    height: height*.35,
    padding:10,
    backgroundColor: '#FFFFFF',

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
  errortext: {
    fontWeight: '300',
    fontFamily: 'Gill Sans',
    color: 'red',
    textAlign:'center',
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