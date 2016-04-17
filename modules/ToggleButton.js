/* Requires */
import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class ToggleButton extends React.Component {

  constructor(props){
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        style={[TBStyles.buttoncontainer, this.props.text.replace('$','') == this.props.compareValue ? TBStyles.yellow : {}]}
          onPressIn={this.props.onPress}>
            <Text style={[TBStyles.button, this.props.text.replace('$','') == this.props.compareValue ? TBStyles.text : {}]}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

var TBStyles = StyleSheet.create({
  buttoncontainer: {
    flex: 1,
    marginRight:5,
    marginLeft:5,
    alignItems: 'center',
    justifyContent: 'center',
    height: height*.05,
    borderWidth:1,
    borderColor:'#efefef'
  },
  yellow: {
    backgroundColor: '#f0bb1a',
  },
  text: {
    color: '#000'
  },
  white: {
    backgroundColor: '#ffffff',
  },
  button: {
    fontSize: 12,
    fontFamily: 'Gill Sans',
    alignSelf: 'center',
    color: '#a3a3a3'
  },
});



module.exports = ToggleButton;