/**
 * A simple button.
 * Comes in two styles: default and image.
 *
 * Default style is a simple teal button with text.
 * Image style accepts an image as a prop, which then becomes the button.
 *
 * -- PROPS: --
 * onPress: (REQUIRED)
 *  Function called when button is pressed.
 *
 * buttonImage: (REQUIRED if style="image")
 *  The image of the button. Has no effect if style is set to default.
 *
 * style: (OPTIONAL)
 *  Sets the style of the button. Only "image" and "default" are accepted.
 *  Leaving it blank will set it to default.
 *
 * buttonText: (OPTIONAL)
 *  The displayed text of the default button. No text will leave an empty
 *  button. No effect if style is set to image.
 *
 * height/width: (OPTIONAL)
 *  The height/width of the image. Leaving blank will set it to 70x80. 
 *  No effect is style is set to default.
 *
 * -- EXAMPLE USAGE: --
 * <Button
 *   buttonText="CONTACT US"
 *   onPress={() => {
 *     this.props.navigator.pop();
 *   }}
 * />
 *
 * <Button
 *   style="image"
 *   buttonImage={require('path/to/image.png')}
 *   onPress={this._onButtonPress()}
 *   height={50} width={50}
 * />
 *
 * <Button
 *   style="image"
 *   buttonImage={http://i.imgur.com/nyljaMX.png}
 *   onPress={this._onButtonPress()}
 * />
 */

/* Requires */
import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions
} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


/* Button Component */
class ButtonLogin extends Component {
	constructor(props){
		super(props);

    this.buttonStyle = (this.props.buttonStyle) ? this.props.buttonStyle : "default";
    this.imageHeight = (this.props.height) ? this.props.height : 80;
    this.imageWidth = (this.props.width) ? this.props.width : 70;


    this.color = (this.props.color) ? this.props.color : "#009999";
    this.textcolor = (this.props.textcolor) ? this.props.textcolor : "white";

	}

	render(){
    if(this.buttonStyle === "default"){




      return(
        <TouchableHighlight
          underlayColor="#004d4d"
          style={[buttonLoginStyles.container, {backgroundColor: this.color}]}
          onPress={this.props.onPress}
        >
        <View style={buttonLoginStyles.container}>
          <Text style={[buttonLoginStyles.buttonText, {color: this.textcolor}]} >{this.props.buttonText}</Text>
        </View>
        </TouchableHighlight>
      )
    }
    // If image source is a URL
    else if(this.buttonStyle === "image" && typeof this.props.buttonImage === "string"){
      return(
        <TouchableOpacity>
          <Image
            source={{uri: this.props.buttonImage}}
            style={[buttonLoginStyles.buttonImage,
              {width: this.imageWidth},
              {height: this.imageHeight}
            ]}
          />
        </TouchableOpacity>
      )
    }
    // If image source is local
    else {
      return(
        <TouchableOpacity>
          <Image
            source={this.props.buttonImage}
            style={[buttonLoginStyles.buttonImage,
              {width: this.imageWidth},
              {height: this.imageHeight}
            ]}
          />
        </TouchableOpacity>
      )
    }
	}
}

const buttonLoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    elevation:2,
    alignItems: 'center',
    justifyContent: 'center',
    width: width*.80,
    height: height*.06,
    shadowColor: '#999999',
    shadowOpacity: .5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },

  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Gill Sans',
    alignSelf: 'center',
  },
  buttonImage: {
    resizeMode: 'contain',
  }
});

module.exports = ButtonLogin;