'use strict';
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


var Users = require('../datalayer/User');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');
var styles = require('../styles');

var {width, height} = Dimensions.get('window');
var font = 22;

if (PixelRatio.get() <= 2) {
  font = 18;
}

class Deals extends Component {


  constructor(props) {
        super(props);
        this.state = {user_profile: []};
        //result = props.bannerads.getAdData(this);

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
      <View style={shopStyles.container}>
        
        <Image source={require('../img/shop-appetite.png')} style={shopStyles.logo} />
        
        <View style={shopStyles.searchContainer}>
          <TextInput placeholder="Search" placeholderTextColor="#F0BB1A" style={shopStyles.search} />
        </View>

        <TouchableOpacity>
          <View style={shopStyles.businessDirectoryContainer}>
            <View style={shopStyles.textContainer}>
              <Text style={shopStyles.text}>Business Directory</Text>
            </View>
            <Image source={require('../img/arrow.png')} style={shopStyles.arrow} />
          </View>
        </TouchableOpacity>

        <ScrollView>
          <View style={shopStyles.imageContainerColumn}>

            <View style={shopStyles.imageContainerRow}>
              <View style={shopStyles.dealContainer}>
              <TouchableOpacity onPress={this.gotoRedeem.bind(this)}>
                <Image source={require('../img/shop-gallery/sample-image-1.png')} style={shopStyles.dealImage}>
                  <Image source={require('../img/shop-points-container.png')} style={shopStyles.pointsContainer}>
                    <Text style={shopStyles.points}>500</Text>
                  </Image>
                  <Text style={shopStyles.dealTitle}>Deal Title</Text>
                </Image>
              </TouchableOpacity>
              </View>
              <View style={shopStyles.dealContainer}>
                <Image source={require('../img/shop-gallery/sample-image-2.png')} style={shopStyles.dealImage}>
                  <Image source={require('../img/shop-points-container.png')} style={shopStyles.pointsContainer}>
                    <Text style={shopStyles.points}>500</Text>
                  </Image>
                  <Text style={shopStyles.dealTitle}>Deal Title</Text>
                </Image>
              </View>
            </View>

            <View style={shopStyles.imageContainerRow}>
              <View style={shopStyles.dealContainer}>
                <Image source={require('../img/shop-gallery/sample-image-3.png')} style={shopStyles.dealImage}>
                  <Image source={require('../img/shop-points-container.png')} style={shopStyles.pointsContainer}>
                    <Text style={shopStyles.points}>500</Text>
                  </Image>
                  <Text style={shopStyles.dealTitle}>Deal Title</Text>
                </Image>
              </View>
              <View style={shopStyles.dealContainer}>
                <Image source={require('../img/shop-gallery/sample-image-4.png')} style={shopStyles.dealImage}>
                  <Image source={require('../img/shop-points-container.png')} style={shopStyles.pointsContainer}>
                    <Text style={shopStyles.points}>500</Text>
                  </Image>
                  <Text style={shopStyles.dealTitle}>Deal Title</Text>
                </Image>
              </View>
            </View>

            <View style={shopStyles.imageContainerRow}>
              <View style={shopStyles.dealContainer}>
                <Image source={require('../img/shop-gallery/sample-image-5.png')} style={shopStyles.dealImage}>
                  <Image source={require('../img/shop-points-container.png')} style={shopStyles.pointsContainer}>
                    <Text style={shopStyles.points}>500</Text>
                  </Image>
                  <Text style={shopStyles.dealTitle}>Deal Title</Text>
                </Image>
              </View>
              <View style={shopStyles.dealContainer}>
                <Image source={require('../img/shop-gallery/sample-image-1.png')} style={shopStyles.dealImage}>
                  <Image source={require('../img/shop-points-container.png')} style={shopStyles.pointsContainer}>
                    <Text style={shopStyles.points}>500</Text>
                  </Image>
                  <Text style={shopStyles.dealTitle}>Deal Title</Text>
                </Image>
              </View>
            </View>

            <View style={shopStyles.imageContainerRow}>
              <View style={shopStyles.dealContainer}>
                <Image source={require('../img/shop-gallery/sample-image-2.png')} style={shopStyles.dealImage}>
                  <Image source={require('../img/shop-points-container.png')} style={shopStyles.pointsContainer}>
                    <Text style={shopStyles.points}>500</Text>
                  </Image>
                  <Text style={shopStyles.dealTitle}>Deal Title</Text>
                </Image>
              </View>
              <View style={shopStyles.dealContainer}>
                <Image source={require('../img/shop-gallery/sample-image-3.png')} style={shopStyles.dealImage}>
                  <Image source={require('../img/shop-points-container.png')} style={shopStyles.pointsContainer}>
                    <Text style={shopStyles.points}>500</Text>
                  </Image>
                  <Text style={shopStyles.dealTitle}>Deal Title</Text>
                </Image>
              </View>
            </View>

          </View>
        </ScrollView>

      </View>
    );
  }


    gotoRedeem() {
        this.props.navigator.push({
          id: 'Redeem',
          name: 'Redeem Page',
        });
    }


}

const shopStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    marginTop: 70
  },
  logo: {
    width: width*.65,
    height: height*.15,
    marginTop: height*.01,
    marginBottom: height*.01
  },
  searchContainer: {
    elevation: 2,
    borderColor: '#000',
  },
  search: {
    padding: 20,
    elevation: 2,
    width: width*.72,
    backgroundColor: '#fff',
    fontFamily: 'Gill Sans',
    borderColor: '#F0BB1A',
    borderWidth: 1,
    borderRadius: 22,
  },
  businessDirectoryContainer: {
    flexDirection: 'row',
    width: width,
    paddingTop: height*.02,
    paddingBottom: height*.02,
    paddingLeft: width*.05,
    paddingRight: width*.05,
    marginTop: height*.015,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: .3,
    shadowRadius: 3,
    shadowOffset: {
      height: 2.5,
      width:0
    }
  },
  textContainer: {
    flexDirection: 'column',
    paddingLeft: width*.05,
    paddingRight: width*.05,
    width: width*.8
  },
  text: {
    fontSize: font,
    fontWeight: '500',
    color: '#a3a3a3',
    fontFamily: 'Gill Sans'
  },
  arrow: {
    height: width*.08,
    width: width*.08,
  },
  imageContainerColumn:{
    flexDirection: 'column'
  },
  pointsContainer: {
    height: width*.12,
    width: width*.12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dealTitle: {
    fontWeight: '500',
    fontSize: font,
    fontFamily: 'Gill Sans',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    top: height*.07
  },
  points: {
    fontWeight: '400',
    fontSize: font*.7,
    fontFamily: 'Gill Sans',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  imageContainerRow: {
    flexDirection: 'row'
  },
  dealContainer: {
    alignItems: 'center'
  },
  dealImage: {
    width: width*.5,
    height: height*.2,
    alignItems: 'center'
  },

});

module.exports = Deals;