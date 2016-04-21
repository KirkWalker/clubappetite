/**
 * REQIURED PROPS:
 *    data - an array of items to be displayed (example: months = ['Jan', 'Feb', ...])
 *    renderItem - a function that returns the individual dropdown items
 *    style, containerStyle, or innerContainerStyle - one of these (either should work)
 *       needs to be set with an absolute position to properly place it on the screen
 *    listStyle - it's position needs to be set, just as one of the above, with
 *       an offset of (pageHeight)*0.06
*     ref - a reference to the dropdown
 *    
 * OPTIONAL PROPS:
 *    containerStyle (stylesheet) - container surrounding the entire DropDown component
 *    innerContainerStyle (stylesheet) - container surrounding just the selected item
 *    style (stylesheet) - the text itselfstyle (stylesheet)
 *    listStyle (stylesheet) - the ListView of items (the dropdown portion itself)
 *    width (number) - the width of the DropDown component
 *    defaultValue (string) - text to be displayed initially (default is blank)
 *
 * More information on the proptypes can be found below (under static PropTypes)
 *
 * Example Usage:

    ... in the component ...
    <View>

    ...
    ...

        // DropDown is BELOW everything in the render order so that it's zIndex is hihger
        <DropDown
          ref="dropdown"
          data={months}
          width={width*.8}
          innerContainerStyle={styles.dropDownContainer}
          listStyle={styles.listContainer}
          defaultValue="Select a month"
          renderItem={(rowData) => {
            return(
              <TouchableOpacity 
                onPress={() => {
                  //this closes the options
                  this.refs.dropdown._showOptions();
                  //chages the curretly displayed option
                  this.refs.dropdown.setState({defaultValue: rowData});
                  //sets the state in your component to match
                  this.setState({month: rowData})
                }}
              >
                <Text style={loginStyles.itemStyle}>{rowData}</Text>
              </TouchableOpacity>
            );
          }}
        />
    </View>

    ... in the stylesheet ...
    DropDownContainer:{
      position: 'absolute',
      top: -height*0.295,
      right: -width*.4
    },
    listContainer: {
      position: 'absolute',
      top: -height*0.295+height*0.06,
      right: -width*.4
    },
    itemStyle: {
      margin: 2,
      paddingLeft: 5,
      fontSize: 15,
      color: '#1B898A',
    },
 */

'use strict';

import React, {
  Component,
  ListView,
  PropTypes,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';

var PageW = Dimensions.get('window').width;
var PageH = Dimensions.get('window').height;

class DropDown extends Component {
  static propTypes = {
    /**
     * These styles will be applied to the container which
     * surrounds the DropDown component.
     */
    containerStyle: View.propTypes.style,
    /**
     * Assign an array of data objects which should be
     * rendered in respect to the entered text.
     */
    data: PropTypes.array,
    /*
     * These styles will be applied to the container which surrounds
     * the textInput component.
     */
    innerContainerStyle: View.propTypes.style,
    /**
     * These style will be applied to the result list view.
     */
    listStyle: ListView.propTypes.style,
    /**
     * `renderItem` will be called to render the data objects
     * which will be displayed in the result view below the
     * text input.
     */
    renderItem: PropTypes.func,
    /**
     * defaultValue can be left blank. This will set the default
     * choice to nothing.
     */
     defaultValue: PropTypes.string,
  };

  static defaultProps = {
    data: [],
    defaultValue: '',
    width: PageW*0.6,
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.data),
      showResults: false,
      defaultValue: this.props.defaultValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    const dataSource = this.state.dataSource.cloneWithRows(nextProps.data);
    this.setState({dataSource});
  }

  _renderItems() {
    const { listStyle, renderItem } = this.props;
    const { dataSource } = this.state;
    return (
      <ListView
        dataSource={dataSource}
        keyboardShouldPersistTaps={true}
        renderRow={renderItem}
        style={[DropdownStyles.list, {width: this.props.width+1}, listStyle]}
      />
    );
  }

  _showOptions() {
    this.setState({showResults: !this.state.showResults});
  }

  testThing(){
    console.log("yo");
  }

  render() {
    const { showResults, defaultValue } = this.state;
    const { containerStyle, innerContainerStyle, style, ...props } = this.props;
    return (
      <View style={[DropdownStyles.container, containerStyle]}>
        <TouchableOpacity
          ref="dropdown"
          style={[DropdownStyles.innerContainer, innerContainerStyle]}
          onPress={() => this._showOptions()}
        >
          <Text style={[DropdownStyles.input, {width: this.props.width}, style]}>
          {defaultValue}
          </Text>
        </TouchableOpacity>
        {showResults && this._renderItems()}
      </View>
    );
  }
}

const border = {
  borderColor: '#b9b9b9',
  borderRadius: 1,
  borderWidth: 2,
};

const DropdownStyles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  innerContainer: {
    backgroundColor: "#eeeeee",
    elevation: 2,
    shadowColor: '#999999',
        shadowOpacity: .8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
  },
  input: {
    height: PageH*0.06,
    paddingTop: 11,
    backgroundColor: '#f2f2f2',
    fontFamily: 'Gill Sans',
    color: '#1B898A',
    fontSize: 17,
    paddingLeft: 11,
  },
  list: {
    ...border,
    backgroundColor: 'white',
    borderTopWidth: 0,
    elevation: 3,
  },
});

module.exports = DropDown;
