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
} from 'react-native';

/* Button Component */
class Button extends Component {
	constructor(props){
		super(props);

    this.buttonStyle = (this.props.style) ? this.props.style : "default";
    this.imageHeight = (this.props.height) ? this.props.height : 80;
    this.imageWidth = (this.props.width) ? this.props.width : 70;
	}

	render(){
    if(this.buttonStyle === "default"){
      return(
        <TouchableHighlight
          underlayColor="#004d4d"
          style={styles.defaultButton}
          onPress={this.props.onPress}
        >
          <Text style={styles.buttonText}>{this.props.buttonText}</Text>
        </TouchableHighlight>
      )
    }
    // If image source is a URL
    else if(this.buttonStyle === "image" && typeof this.props.buttonImage === "string"){
      return(
        <TouchableOpacity>
          <Image
            source={{uri: this.props.buttonImage}}
            style={[styles.buttonImage,
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
            style={[styles.buttonImage,
              {width: this.imageWidth},
              {height: this.imageHeight}
            ]}
          />
        </TouchableOpacity>
      )
    }
	}
}

const styles = StyleSheet.create({
  defaultButton: {
    backgroundColor: '#009999',
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
  },
  buttonImage: {
    resizeMode: 'contain',
  }
});

module.exports = Button;