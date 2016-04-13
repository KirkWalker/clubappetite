'use strict';

/* Requires */
import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  View,
  Navigator,
  Dimensions,
  Linking,
} from 'react-native';

var Button = require('../modules/Button');

class WebModal extends Component {
  constructor(props){
    super(props);
  }

  openLink() {
    var website = 'http://' + this.props.website;
    console.log(website);
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
      <View style={ModalStyles.modalContainer}>
        <Image style={ModalStyles.webIcon} resizeMode="contain" source={require('../img/web-icon-white.png')}/>
        <Text style={ModalStyles.modalText}>{this.props.website}</Text>
        <View style={ModalStyles.modalButtonContainer}>
          <View style={ModalStyles.webButton}>
            <Button
              buttonColor="calling"
              buttonText="Visit"
              onPress={() => {this.openLink()}}
            />
          </View>
          <View style={ModalStyles.webButton}>
            <Button
              buttonColor="calling"
              buttonText="Cancel"
              onPress={() =>{
                console.log("Cancel~~~");
                this.props.navigator.pop();
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

//Variables for styling. Used for scaling.
var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

const ModalStyles = StyleSheet.create({
  modalContainer: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: 'rgb(027, 135, 136)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
  },
  modalText: {
    fontSize: 23,
    fontFamily: 'Gill Sans',
    color: 'white',
    fontWeight: '500',
    padding: WIDTH*0.05,
  },
  webIcon: {
    width: WIDTH*0.20,
    height: WIDTH*0.20,
  },
  webButton: {
    width: WIDTH*0.30,
    paddingLeft: WIDTH*0.03,
    paddingRight: WIDTH*0.03,
  },
});

module.exports = WebModal;