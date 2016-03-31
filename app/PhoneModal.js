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

class phoneModal extends Component {
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
    var phoneNumber = this.props.business_info.sponsor_tel;
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
      <View style={PageStyles.modalContainer}>
        <Image style={PageStyles.callingIcon} resizeMode="contain" source={require('../img/phone-icon-white.png')}/>
        <Text style={PageStyles.modalText}>{this.props.business_info.sponsor_tel}</Text>
        <View style={PageStyles.modalButtonContainer}>
          <View style={PageStyles.callingButton}>
            <Button
              buttonColor="Calling~~~"
              buttonText="Call"
              onPress={() => {this.openLink()}}
            />
          </View>
          <View style={PageStyles.callingButton}>
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