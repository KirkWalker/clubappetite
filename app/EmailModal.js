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

class EmailModal extends Component {
  constructor(props){
    super(props);
  }

  openLink() {
    var email = 'mailto:' + this.props.email;
    console.log(email);
    Linking.canOpenURL(email).then(supported => {
      if (supported) {
        console.log("Opening link...");
        return Linking.openURL(email);
      } else {
        console.log("Can\'t open this URI.");
      }
    });
  }
  render() {
    return(
      <View style={ModalStyles.modalContainer}>
        <Image style={ModalStyles.emailIcon} resizeMode="contain" source={require('../img/email-icon-white.png')}/>
        <Text style={ModalStyles.modalText}>{this.props.email}</Text>
        <View style={ModalStyles.modalButtonContainer}>
          <View style={ModalStyles.emailButton}>
            <Button
              buttonColor="calling"
              buttonText="Email"
              onPress={() => {this.openLink()}}
            />
          </View>
          <View style={ModalStyles.emailButton}>
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
  emailIcon: {
    width: WIDTH*0.20,
    height: WIDTH*0.20,
  },
  emailButton: {
    width: WIDTH*0.30,
    paddingLeft: WIDTH*0.03,
    paddingRight: WIDTH*0.03,
  },
});

module.exports = EmailModal;