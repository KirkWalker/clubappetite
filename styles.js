var {
  StyleSheet, 
  Dimensions} = require('react-native')

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop:60,
  },
  imageContainer: {
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0)',
      marginTop:60,
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
  navbar: {
    backgroundColor: '#1B898A',
    height:60
  },
  navbar_title: {
    color: 'white',
    margin: 10,
    fontSize: 16
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
  },
  base: {
    width: 38,
    height: 38,
  },
  webView: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: 350,
    width:350,
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
    // backgroundColor: '#F5FCFF',
    // padding: 10,
    // margin: 5,
    // borderColor: "#cccccc",
    // borderWidth: 1,
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
  input: {
    // alignItems: 'stretch',
    padding: 10,
    // flex: .5,
    height: height*.06,
    width: width*.85,
    // borderWidth: 10,
    // borderColor: '#424242',
    margin: 5,
    backgroundColor: '#f2f2f2',
    shadowColor: '#000',
    shadowOpacity: .8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },
facebook: {

    marginTop: 35,
    marginBottom: 35,
  },
});