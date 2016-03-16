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
} from 'react-native';

var Directory = require('../datalayer/Directory.js');

/* BusinessDirectory Component */
class BusinessDirectory extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	dataSource: new ListView.DataSource({
    		rowHasChanged: (r1, r2) => r1 !== r2,
    	}),
    	loaded: false,
    };
  }

  componentDidMount() {
  	Directory.getDirectoryData(this);
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
      >
  			<View style={BusinessStyles.listContainer}>
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
  			</View>
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
  	if (!this.state.loaded) {
  		return this.renderLoadingView();
  	}

  	return (
  		<ListView
  			dataSource={this.state.dataSource}
  			renderRow={this.renderBusiness}
  			renderHeader={this.renderHeader}
        style={{backgroundColor: '#F2F2F2'}}
        renderSeparator={this.renderSeparator}
  		/>
  	);
  }
}

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
    fontSize: 20,
  },
	listContainer: {
		flexDirection: 'row',
		paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 25,
    paddingRight: 8,
    alignItems: 'center',
    backgroundColor: 'white',
    
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
		paddingLeft: 20,
	},
	header: {
		alignItems: 'center',
    paddingTop: 90,
    paddingBottom: 20,
	},
  headerText: {
    fontFamily: 'Gill Sans',
    color: 'rgb(027, 135, 136)',
    fontSize: 25,
    fontWeight: '400',
  },
  separator: {
    backgroundColor: '#f2f2f2',
    height: 14,
  },
	businessThumbnail: {
		width: 45,
		height: 45,
	},
	businessName: {
		fontSize: 15,
		fontWeight: '500',
		color: 'gray',
		fontFamily: 'Gill Sans',
	},
	businessDescription: {
		fontSize: 15,
    fontWeight: '300',
    color: 'gray',
		fontFamily: 'Gill Sans',
  },
  arrow: {
    height: 33,
    width: 33,
  },
});

module.exports = BusinessDirectory;