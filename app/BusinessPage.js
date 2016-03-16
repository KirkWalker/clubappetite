'use strict';

/* Requires */
import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

var Directory = require('../datalayer/Directory.js');

/* BusinessDirectory Component */
class BusinessPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
  	return (
      <View style={PageStyles.BusinessPageContainer}>
    		<Image
          style={PageStyles.logo}
          source={require('../img/logo.png')}
        />

        <View style={PageStyles.addressContainer}>
          <Text style={PageStyles.greenText}>1234 Road Name</Text>
          <Text style={PageStyles.greenText}>Kelowna, BC    V1Z 5H9</Text>
        </View>

        <View style={PageStyles.separator}/>

        <View style={PageStyles.contactContainer}>
          <View style={PageStyles.contactRow}>
            <Image style={PageStyles.icon} source={require('../img/email-icon.png')}/>
            <Text style={PageStyles.grayText}>name@email.com</Text>
          </View>
          <View style={PageStyles.contactRow}>
            <Image style={PageStyles.icon} source={require('../img/phone-icon.png')}/>
            <Text style={PageStyles.grayText}>1 250-425-6324</Text>
          </View>
          <View style={PageStyles.contactRow}>
            <Image style={PageStyles.icon} source={require('../img/website-icon.png')}/>
            <Text style={PageStyles.grayText}>www.websitename.com</Text>
          </View>
        </View>
      </View>
  	);
  }
}

const PageStyles = StyleSheet.create({
  BusinessPageContainer: {
    backgroundColor: '#F2F2F2',
    paddingTop: 80,
    flexDirection: 'column',
  },
  logo: {
    flex: 1,
    alignItems: 'center',
  },
  addressContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,

    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  greenText: {
    color: 'rgb(027, 135, 136)',
    fontSize: 21,
    fontWeight: '500',
    fontFamily: 'Gill Sans',
  },
  grayText: {
    fontSize: 21,
    fontWeight: '500',
    color: 'gray',
    fontFamily: 'Gill Sans',
    paddingLeft: 20,
  },
  separator: {
    backgroundColor: '#F2F2F2',
    height: 22,
  },
  contactContainer: {
    backgroundColor: 'white',
    padding: 20,

    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    width: 47,
    height: 47,
    resizeMode: 'contain',
  },
});

module.exports = BusinessPage;