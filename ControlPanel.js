var React = require('react-native')

var {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  TouchableHighlight
} = React

var styles = require('./styles');
var {width, height} = Dimensions.get('window');

module.exports = React.createClass({


  render(){

    var _this = this;


    return (


      <View style={styles.controlPanel}>
        <Text style={styles.controlPanelWelcome}>
          Menu
        </Text>


        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.scrollView}>

          <Section
            id='Donate'
            name='Donate'
            gotoDonate={this.props.gotoDonate}
            text="Donate" />

          <Section
            id='Shop'
            name='Shop Appetite'
            gotoShop={this.props.gotoDirectory}
            text="Shop Appetite" />

          <Section
            id='Profile'
            name='My Profile'
            gotoProfile={this.props.gotoProfile}
            text="My Profile" />

          <Section
            id='Messages'
            name='Messages'
            gotoMessage={this.props.gotoMessage}
            text="Messages" />

          <Section
            id='MyFoodBank'
            name='My Food Bank'
            gotoFoodBank={this.props.gotoFoodBank}
            text="My Food Bank" />

          <Section
            id='FAQs'
            name='FAQs'
            gotoFaq={this.props.gotoFaq}
            text="FAQs" />

          <Section
            id='Terms'
            name='Terms'
            gotoTerms={this.props.gotoTerms}
            text="Terms" />

          <Section
            id='Share'
            name='Share'
            tagLine='Receive Bonus Points'
            gotoShare={this.props.gotoShare}
            text="Share" />

          <Section
            id='Logout'
            name='Logout'
            handleLogout={this.props.handleLogout}
            text="Logout"/>

          <Section
            id='Close'
            name='Close'
            closeDrawer={this.props.closeDrawer}
            text="Close Drawer" />

          {/*put more sections here*/}

        </ScrollView>


      </View>
    )
  }


})


var Section = React.createClass({




    onPress() {

      var _this = this;

      if (this.props.closeDrawer)
        this.props.closeDrawer();

      if (this.props.handleLogout)
        this.props.handleLogout();

      if (this.props.gotoShop)
        this.props.gotoShop();

      if (this.props.gotoDirectory)
        this.props.gotoDirectory();

      if (this.props.gotoDonate)
        this.props.gotoDonate();

      if (this.props.gotoProfile)
        this.props.gotoProfile();

      if (this.props.gotoFaq)
        this.props.gotoFaq();

      if (this.props.gotoEvents)
        this.props.gotoEvents();

      if (this.props.gotoMessage)
        this.props.gotoMessage();

      if (this.props.gotoTerms)
        this.props.gotoTerms();

      if (this.props.gotoShare)
        this.props.gotoShare();

      if (this.props.gotoFoodBank)
        this.props.gotoFoodBank();



    },
    render() {

     //console.log('Section Data');
     //console.log(this.onPress);
     //console.log('------------');

     if (this.props.id === 'Share'){
      return (
        <TouchableHighlight underlayColor='#DFDFDF' onPress={this.onPress}>
          <View style={[styles.section, controlPanelStyles.shareContainer]}>
            <Image source={require('./img/3-hex.png')} style={controlPanelStyles.hexes}/>
            <View style={controlPanelStyles.textContainer}>
              <Text style={styles.sectionName}>{this.props.name.toUpperCase()}</Text>
              <Text style={controlPanelStyles.tagLine}>{this.props.tagLine}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    } else {
      return (
        <TouchableHighlight underlayColor='#DFDFDF' onPress={this.onPress}>
          <View style={styles.section}>
            <Text style={styles.sectionName}>{this.props.name.toUpperCase()}</Text>
          </View>
        </TouchableHighlight>
      );
    }
    }
  });

var controlPanelStyles = StyleSheet.create({
  shareContainer: {
    flexDirection: 'row'
  },
  textContainer: {
    flexDirection: 'column'
  },
  hexes: {
    width: width*.06,
    height: width*.06,
    marginLeft: -width*.05
  },
  tagLine: {
    color: '#656565',
    fontSize: 12,
    fontFamily: 'Gill Sans',
    marginLeft: 10
  }
});