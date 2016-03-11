var { StyleSheet} = require('react-native')

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
});