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
  View,
  InteractionManager,
} from 'react-native';

var DEBUG = false;
if (DEBUG) {console.log("Deals.js DEBUG flag set\n---------------------");}

var Users = require('../datalayer/User');
var MyDeals = require('../datalayer/WebAPI');
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
    this.state = {
      user_profile: [],
      DataArray: [],
      searchResults: [],
      searchText: "",
    };
  }

  /*
  This method sets the state variables for the user profile
  It will add a new user on first login or retrieve current info
  If not logged in it will redirect to login page

  successful result is an object: this.state.user_profile
  */
  componentDidMount() {
    this.mounted = true;
    Users.getProfile(this);
    this.gotoDirectory = this.gotoDirectory.bind(this);
    this.search = this.search.bind(this);
    InteractionManager.runAfterInteractions(() => {
      MyDeals.getData(this, "sponsordeals");
    });
  }

  componentWillUnmount() {
      this.mounted = false;
  }

  /*
   * Used for the search bar. Uses the string provided in the search bar
   * to search the local deal array. Searches deal_title, deal_short_desc,
   * and cat_title fields.
   */
  search(event) {
    // Updates searchText's value to match the text in the search bar
    this.setState({searchText: event.nativeEvent.text});

    var tempResults = [];
    var filterText = this.state.searchText.toLowerCase();
    this.state.DataArray.forEach((deal) => {
      if(deal.deal_title.toLowerCase().indexOf(filterText) !== -1
        || deal.deal_short_desc.toLowerCase().indexOf(filterText) !== -1
        || deal.cat_title.toLowerCase().indexOf(filterText) !== -1) {
        if (DEBUG) { console.log("deal: ",deal); }
        tempResults.push(deal);
      }
    });

    // Updates searchResults to match tempResults. Done this way rather than
    // pushing directly to searchResults because state should be immutable
    this.setState({searchResults: tempResults});
  }

  renderLoadingView() {
    return(
      <View style={shopStyles.loadingView}>
        <Text style={shopStyles.loadingText}>Loading Deals...</Text>
      </View>
    );
  }

  renderDeals() {
    return(
      <ScrollView>
        <View style={shopStyles.imageContainer}>
          {this.state.searchResults.map((deal) => 
            <DealItem
              key={deal.id}
              item={deal}
              onPress={() => {
                if(DEBUG) {console.log("Pushing deal_id " + deal.id + " to Redeem");}
                this.props.navigator.push({
                  id: 'Redeem',
                  name: 'Redeem Page',
                  deal_info: deal,
                })}
              }
            />
          )}
        </View>
      </ScrollView>
    );
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
          <TextInput
            placeholder="Search..."
            placeholderTextColor="rgb(239, 186, 026)"
            style={shopStyles.search}
            value={this.state.searchText}
            onChange={this.search.bind(this)}
          />
        </View>

        <TouchableOpacity onPress={this.gotoDirectory}>
          <View style={shopStyles.businessDirectoryContainer}>
            <View style={shopStyles.textContainer}>
              <Text style={shopStyles.text}>Business Directory</Text>
            </View>
            <Image source={require('../img/NavArrow.png')} style={shopStyles.arrow} />
          </View>
        </TouchableOpacity>

        {
          (!this.state.loaded) ? this.renderLoadingView() : this.renderDeals()
        }

      </View>
    );
  }

  gotoDirectory() {
    this.props.navigator.push({
      id: 'BusinessDirectory',
      name: 'Business Directory',
    });    
  }
}

class DealItem extends Component {
  render() {
    return(
      <View style={shopStyles.dealContainer}>
      <TouchableOpacity onPress={this.props.onPress}>
        <Image source={{uri: this.props.item.deal_image}} style={shopStyles.dealImage}>
          <Image source={require('../img/shop-points-container.png')} style={shopStyles.pointsContainer}>
            <Text style={shopStyles.points}>{this.props.item.deal_price}</Text>
          </Image>
          <Text style={shopStyles.dealTitle}>{this.props.item.deal_title}</Text>
        </Image>
      </TouchableOpacity>
      </View>
    );
  }
}

const shopStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    marginTop: height*0.11,
  },
  loadingView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    marginTop: 5,
  },
  logo: {
    width: width*.65,
    height: height*.15,
    marginTop: height*.01,
    marginBottom: height*.01
  },
  searchContainer: {
    borderColor: 'rgb(239, 186, 026)',
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 2,
    borderRadius: 25
  },
  search: {
    elevation: 2,
    width: width*.82,
    height: height*0.075,
    backgroundColor: '#ffffff',
    fontFamily: 'Gill Sans',
    borderColor: 'rgb(239,186,026)',
    paddingLeft: 15,
    color: 'rgb(239,186,026)',
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
    elevation: 2,
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
  imageContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width,
  },
  pointsContainer: {
    height: width*.12,
    width: width*.12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dealTitle: {
    fontSize: font,
    textAlign: 'center',
    padding: 10,
    height: height*.06,
    width: width*.80,
    backgroundColor: 'transparent',
    fontFamily: 'Gill Sans',
    color: '#fff'
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
    alignItems: 'center',
  },
  dealImage: {
    width: width*.5,
    height: height*.2,
    alignItems: 'center'
  },
  loadingText: {
    fontFamily: 'Gill Sans',
    color: 'rgb(163, 163, 163)',
    fontSize: 20,
  },
  dealBg: {
    top: height*.07,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    padding:0,
    elevation:2,
    shadowColor: '#000',
    borderColor: '#1B8889',
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
        height: 2,
        width: 1
    },
  },
});

module.exports = Deals;