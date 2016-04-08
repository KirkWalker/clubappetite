/* Requires */
import React, {
  Component,
  StyleSheet,
  View,
  Image,
  Linking,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

var Users = require('../datalayer/User');
var {width, height} = Dimensions.get('window');

/* AdSlider Component */
class BannerAds extends Component {

  constructor(props){
    super(props);
	}

  handlePress() {
    this.openAdWebsite();
    Users.trackBannerClick(this.props.ad_id, this.props.user_profile);
  }

	openAdWebsite() {
		var website = this.props.ad.url;
    Linking.canOpenURL(website).then(supported => {
	    if (supported) {
	      console.log("Opening link...");
	      return Linking.openURL(website);
	    } else {
	      console.log("Can\'t open this URI.");
	    }
    });
	}

	render() {
		return(
      <TouchableOpacity
      	style={BannerStyles.container}
      	onPress={() => this.handlePress()}
      >
        <Image
        	source={{uri: this.props.ad.media_file}}
	        style={BannerStyles.container}
	        resizeMode={Image.resizeMode.contain}/>
      </TouchableOpacity>
    );
	}
}

const BannerStyles = StyleSheet.create({
	 image: {
    flex: 1,
    alignItems: 'stretch',
  },
  container: {
    flexDirection: 'column',
    width: width,
    flex: 3,
  },
});

module.exports = BannerAds;