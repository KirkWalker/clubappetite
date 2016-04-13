/* Requires */
import React, {
  Component,
  StyleSheet,
  View,
  Image,
  Linking,
  TouchableOpacity,
  Dimensions,
  InteractionManager,
} from 'react-native';

var Users = require('../datalayer/User');
var BannerData = require('../datalayer/BannerAds');
var {width, height} = Dimensions.get('window');

import TimerMixin from 'react-timer-mixin';

/* AdSlider Component */
class BannerAds extends Component {

  constructor(props){
    super(props);
    this.state = { ad: [], banner_ads:[]};
    this.mounted = false;

  }

  componentDidMount () {

    var ad_index = 0;//maintain current index
    this.mounted = true;

    this.timer = TimerMixin.setInterval(
      () => {

        var ad_count = this.state.banner_ads.length;
        ad_index ++;

        if(ad_index>ad_count-1){
            ad_index=0;
        }
        var current_ad = this.state.banner_ads[ad_index];


        if(current_ad != undefined){
            BannerData.trackImpression(this.state.banner_ads, ad_index);
        }




        this.setState({ad: current_ad});


      },
      10000
    );
  }

  componentWillUnmount() {
        TimerMixin.clearInterval(this.timer);
        this.mounted = false;
  }

  componentWillReceiveProps(nextProps) {

    //InteractionManager.runAfterInteractions(() => {
    if(this.mounted){
        BannerData.getAdData(this, nextProps.refThis, nextProps.pageName);
    }

    //});

  }

  handlePress() {
    this.openAdWebsite();
    Users.trackBannerClick(this.state.ad.ad_id, this.props.refThis.state.user_profile);
  }

  openAdWebsite() {

    var website = this.state.ad.url;

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

      var currentAd = this.state.ad;
      //currentAd = currentAd[0];
      //console.log('banner_ad currentAd:',currentAd);


      if(currentAd != undefined){

		return(
            <TouchableOpacity
              style={BannerStyles.container}
              onPress={() => this.handlePress()}
            >
              <Image
                  source={{uri: currentAd.media_file}}
                  style={BannerStyles.container}
                  resizeMode={Image.resizeMode.contain}/>
            </TouchableOpacity>
          );


      } else {

        return(

          <View></View>
        );
      }
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