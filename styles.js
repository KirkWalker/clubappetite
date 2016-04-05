var {
  StyleSheet, 
  Dimensions,
  Platform,
  } = require('react-native')

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var headeroffset = Platform.OS === 'ios' ? -10 : 0;
var menuoffset = Platform.OS === 'ios' ? 0 : 15;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: 'white',
        paddingTop:height*0.108,
        alignItems: 'center',
    },
    centerContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatRight: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    image: {
        flex: 1
    },
    controlPanel: {
    flex: 1,
        backgroundColor:'#333333',
    },
    controlPanelText: {
        color:'white',
    },
    controlPanelWelcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 25,
        color:'white',
        fontWeight:'bold',
        fontFamily: 'Gill Sans'
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    splashPageContainer: {
        flex: 1,
        backgroundColor: '#246dd5',
        alignItems: 'center',
        justifyContent: 'center',
        padding:10,
    },


    /*
    Navbar styles
    */
    navbar: {
        backgroundColor: '#1B898A',
        height:height*.11,
        elevation:4,
        padding:0,
        margin:0,
        shadowColor: '#000000',
        shadowOpacity: .6,
        shadowRadius: 5,
        shadowOffset: {
            height: 0,
            width: 0
        },

    },
    navbar_logocontainer: {
        width: width*.60,
        height: height*.09,
        marginTop:headeroffset,
        padding:0,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
    },
    navbar_menu: {
    marginTop:menuoffset,
      width: width*.1,
      height: height*.06,
    },
    navbar_logo: {
      width: width*.4,
      height: height*.082,
    },
    navbar_button: {

      marginLeft:10,
      height: height*.3,
    },
    mainPanel: {
      marginTop:35,
      flex: 1,
      backgroundColor:'#ffffff',
    },
    mainPanelTitle: {
     fontSize: 20,
     textAlign: 'center',
     margin: 25,
     color:'black',
     fontWeight:'bold',
    },
    scrollView: {
      position: 'absolute',
      top: 50,
      left: 0,
      right: 0,
      bottom: 50,
    },
    section: {
        padding: 10,
        left:25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionName: {
        fontSize: 15,
        marginLeft: 10,
        color:'white',
        fontFamily: 'Gill Sans'
    },
    /********************/






    base: {
        width: 38,
        height: 38,
    },

    picker: {
       backgroundColor: '#cccccc',
       width:200,
       height:30,
       borderWidth:1,
       borderColor:'black'

    },
    contentForm: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    banner: {
        flex: 0.5,
        alignSelf: "stretch",
        borderColor: "#cccccc",
        borderWidth: 1,
    },

    module: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    moduleButtons: {
        flexDirection:'row',
    },
    button: {
        backgroundColor: "#eeeeee",
        marginRight: 5,
        marginLeft: 5,
        padding: 10,
    },
    inputContainer: {

        backgroundColor: "#eeeeee",
        margin:5,
        padding:0,
        elevation:2,
        shadowColor: '#999999',
        shadowOpacity: .8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        
    },
    input: {
        padding: 10,
        height: height*.06,
        width: width*.80,
        backgroundColor: '#f2f2f2',
        fontFamily: 'Gill Sans'
    },
    checkboxcontainer: {
        height:20,
    },
    checkbox: {
        width: 16,
        height: 16,

    },
    labelContainer: {
        marginLeft: 10,
      marginBottom:7,
    },
    label: {
        fontSize: 15,
        color: 'grey',
        fontFamily: 'Gill Sans',
        lineHeight:20,
        textAlignVertical:'center',
    },
});