var { StyleSheet} = require('react-native')

module.exports = StyleSheet.create({

  container: {
    flex: 1,
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  imageContainer: {
      flex: 1,
      width: null,
      height: null,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0)',
    },
  image: {
    flex: 1
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
  }


});