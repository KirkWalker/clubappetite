'use strict';

/* Requires */
import React, {
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator,
  PixelRatio,
} from 'react-native';

var styles = require('../styles');

var Directory = require('../datalayer/Directory.js');
var Users = require('../datalayer/User');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');

/* BusinessDirectory Component */
class BusinessDirectory extends Component {

  constructor(props) {
    super(props);
    this.renderBusiness = this.renderBusiness.bind(this);
    this.state = {
    	dataSource: new ListView.DataSource({
    		rowHasChanged: (r1, r2) => r1 !== r2,
    	}),
    	loaded: false,
    	user_profile: [],
    };
  }

  componentDidMount() {
    this.mounted = true;
    Users.getProfile(this);
  	Directory.getDirectoryData(this);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  gotoDetails() {
    this.props.navigator.push({
      id: 'BusinessPage',
      name: 'Business Page',
    });
  }

  renderLoadingView() {
  	return(
  		<View style={BusinessStyles.loadingContainer}>
  			<Text style={BusinessStyles.loadingText}>Loading Business Directory...</Text>
  		</View>
  	);
  }

  renderHeader() {
  	return(
	  	<View style={BusinessStyles.header}>
	  		<Text style={BusinessStyles.headerText}>BUSINESS DIRECTORY</Text>
	  	</View>
	  );
  }

  renderBusiness(business) {
  	return(
  		<TouchableOpacity
        style={BusinessStyles.listContainer}
        onPress={() => this.gotoDetails()}
      >
				<Image
					style={BusinessStyles.businessThumbnail}
					source={{uri: business.sponsor_img}}
				/>
				<View style={BusinessStyles.listInnerContainer}>
					<Text style={BusinessStyles.businessName}>{business.sponsor_name}</Text>
					<Text style={BusinessStyles.businessDescription}>e-mail: {business.sponsor_email}</Text>
				</View>
        <Image
          style={BusinessStyles.arrow}
          source={require('../img/NavArrow.png')}
        />
  		</TouchableOpacity>
  	);
  }

  renderSeparator(sectionID, rowID) {
    return(
      <View
        key={`${sectionID}-${rowID}`}
        style={BusinessStyles.separator}
      />
    );
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
  	if (!this.state.loaded) {
  		return this.renderLoadingView();
  	}

  	return (
  		<ListView
  			dataSource={this.state.dataSource}
  			renderRow={this.renderBusiness}
  			renderHeader={this.renderHeader}
        style={[{backgroundColor: '#F2F2F2'}, {paddingTop: 70}]}
        renderSeparator={this.renderSeparator}
  		/>
  	);
  }
}

// Variables for styles. Used for scaling to different screen sizes.
var TITLE_TEXT = (PixelRatio.get() <= 2) ? 15 : 25;
var INFO_TEXT = (PixelRatio.get() <= 2) ? 10 : 15;
var PADDING = PixelRatio.get();
console.log(PixelRatio.get());

var THUMBNAIL_SIZE = PixelRatio.getPixelSizeForLayoutSize(15);
var ARROW_SIZE = PixelRatio.getPixelSizeForLayoutSize(10); 

const BusinessStyles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
    backgroundColor: '#f2f2f2'
	},
  loadingText: {
    fontFamily: 'Gill Sans',
    color: 'gray',
    fontSize: TITLE_TEXT,
  },
	listContainer: {
		flexDirection: 'row',
		paddingTop: PADDING*8.33,
    paddingBottom: PADDING*8.33,
    paddingLeft: PADDING*8.33,
    paddingRight: PADDING*8.33,
    alignItems: 'center',
    backgroundColor: 'white',
    
    //shadows android
    elevation: 2,
    //shadows iOS
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    }
	},
	listInnerContainer: {
		flex: 1,
		paddingLeft: PADDING*8,
	},
	header: {
		alignItems: 'center',
    paddingTop: PADDING*10,
    paddingBottom: PADDING*10,
	},
  headerText: {
    fontFamily: 'Gill Sans',
    color: 'rgb(027, 135, 136)',
    fontSize: TITLE_TEXT,
    fontWeight: '400',
  },
  separator: {
    backgroundColor: '#f2f2f2',
    height: PADDING*5.5,
  },
	businessThumbnail: {
		width: THUMBNAIL_SIZE,
		height: THUMBNAIL_SIZE,
	},
	businessName: {
		fontSize: INFO_TEXT,
		fontWeight: '500',
		color: 'gray',
		fontFamily: 'Gill Sans',
	},
	businessDescription: {
		fontSize: INFO_TEXT,
    fontWeight: '300',
    color: 'gray',
		fontFamily: 'Gill Sans',
  },
  arrow: {
    height: ARROW_SIZE,
    width: ARROW_SIZE,
  },
});

module.exports = BusinessDirectory;