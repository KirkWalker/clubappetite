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
 * color: (OPTIONAL)
 *  The color of the default button. Leaving blank will set the button
 *  to dark green. Accepted values: "gray", "blue", "yellow", "green",
 *  and "default" for dark green.
 *  No effect if style is set to image.
 *
 * -- EXAMPLE USAGE: --
 * <Button
 *   buttonText="CONTACT US"
 *   color="yellow"
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

    this.buttonStyle = (this.props.buttonStyle) ? this.props.buttonStyle : "default";
    this.imageHeight = (this.props.height) ? this.props.height : 80;
    this.imageWidth = (this.props.width) ? this.props.width : 70;
    this.color = '';
    this.textColor = '';
    switch(this.props.buttonColor){
      case "gray": {
        this.color = 'rgb(242, 242, 242)';
        this.underlayColor = 'rgba(242, 242, 242, 0.5)';
        this.textColor = "gray";
        break;
      }
      case "blue": {
        this.color = 'rgb(078, 106, 167)';
        this.underlayColor = 'rgba(078, 106, 167, 0.5)';
        this.textColor = "white";
        break;
      }
      case "yellow": {
        console.log("hey");
        this.color = 'rgb(239, 186, 026)';
        this.underlayColor = 'rgba(239, 186, 026, 0.5)';
        this.textColor = "white";
        break;
      }
      case "green": {
        this.color = 'rgb(074, 138, 029)';
        this.underlayColor = 'rgba(074, 138, 029, 0.5)';
        this.textColor = "white";
        break;
      }
      default: {
        this.color = 'rgb(027, 135, 136)';
        this.underlayColor = 'rgba(027, 135, 136, 0.5)';
        this.textColor = "white";
        break;
      }
    }
    console.log(this.props.buttonColor);
    console.log(this.color);
	}

	render(){
    if(this.buttonStyle === "default"){
      return(
        <TouchableHighlight
<<<<<<< HEAD
          underlayColor={this.underlayColor}
          style={[styles.defaultButton,
            {backgroundColor: this.color}
          ]}
          onPress={this.props.onPress}
        >
          <Text style={[styles.buttonText, {color: this.textColor}]}>{this.props.buttonText}</Text>
=======
          underlayColor="#004d4d"
          style={buttonStyles.defaultButton}
          onPress={this.props.onPress}
        >
          <Text style={buttonStyles.buttonText}>{this.props.buttonText}</Text>
>>>>>>> feature-login-style
        </TouchableHighlight>
      )
    }
    // If image source is a URL
    else if(this.buttonStyle === "image" && typeof this.props.buttonImage === "string"){
      return(
        <TouchableOpacity>
          <Image
            source={{uri: this.props.buttonImage}}
            style={[buttonStyles.buttonImage,
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
            style={[buttonStyles.buttonImage,
              {width: this.imageWidth},
              {height: this.imageHeight}
            ]}
          />
        </TouchableOpacity>
      )
    }
	}
}

const buttonStyles = StyleSheet.create({
  defaultButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonText: {
<<<<<<< HEAD
    fontSize: 18,
    fontWeight: '500',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 12,
    paddingLeft: 12,
    fontFamily: 'Gill Sans',
=======
    fontSize: 15,
    fontFamily: 'Gill Sans',
    color: 'white',
    paddingTop: 5,
    paddingBottom: 5,
    alignSelf: 'center',
    paddingRight: 10,
    paddingLeft: 10,
>>>>>>> feature-login-style
  },
  buttonImage: {
    resizeMode: 'contain',
  }
});

module.exports = Button;