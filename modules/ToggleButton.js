/* Requires */
import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
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
      <TouchableHighlight
        style={[TBStyles.buttoncontainer, this.props.text.replace('$','') == this.props.compareValue ? TBStyles.grey : {}]}
          onPressIn={this.props.onPress}>
            <Text style={TBStyles.button}>{this.props.text}</Text>
      </TouchableHighlight>
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
    //
  },
  grey: {
    backgroundColor: '#efefef',
  },
  white: {
    backgroundColor: '#ffffff',
  },
  button: {
    fontSize: 12,
    fontFamily: 'Gill Sans',
    alignSelf: 'center',
  },
});



module.exports = ToggleButton;