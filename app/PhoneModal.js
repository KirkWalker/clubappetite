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

class PhoneModal extends Component {
  show() {
    this.setState({
      modalVisible: true,
    });
  }

  constructor(props){
    super(props);
    this.state = {
      modalVisible: true,
    }
  }

  openLink() {
    var phoneNumber = this.props.phoneNumber;
    console.log(phoneNumber);
    Linking.canOpenURL(phoneNumber).then(supported => {
      if (supported) {
        console.log("Opening link...");
        return Linking.openURL(phoneNumber);
      } else {
        console.log("Can\'t open this URI.");
      }
    });
  }
  render() {
    var nav = this.props.navigator;
    return(
      <View style={ModalStyles.modalContainer}>
        <Image style={ModalStyles.callingIcon} resizeMode="contain" source={require('../img/phone-icon-white.png')}/>
        <Text style={ModalStyles.modalText}>{this.props.phoneNumber}</Text>
        <View style={ModalStyles.modalButtonContainer}>
          <View style={ModalStyles.callingButton}>
            <Button
              buttonColor="calling"
              buttonText="Call"
              onPress={() => {this.openLink()}}
            />
          </View>
          <View style={ModalStyles.callingButton}>
            <Button
              buttonColor="calling"
              buttonText="Cancel"
              onPress={() =>{
                console.log("Cancel~~~");
                nav.pop()
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
  callingIcon: {
    width: WIDTH*0.20,
    height: WIDTH*0.20,
  },
  callingButton: {
    width: WIDTH*0.30,
    paddingLeft: WIDTH*0.03,
    paddingRight: WIDTH*0.03,
  },
});

module.exports = PhoneModal;