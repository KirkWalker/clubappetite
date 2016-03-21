
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Image,
  PixelRatio,
  View
} from 'react-native';

var {width, height} = Dimensions.get('window');
var font = 22;
// var Button = require('../modules/Button');

if (PixelRatio.get() <= 2) {
  font = 18;
}

class Redeem extends Component {
  render() {
    return (
      <View style={redeemStyles.container}>
        <Image source={require('./shop-gallery/sample-image-3.png')} style={redeemStyles.header} />
        
        <View style={redeemStyles.contentContainer}>
          <Text style={redeemStyles.title}>Item Title Here</Text>
          <Text style={redeemStyles.description}>One Line Description</Text>
          <Text style={redeemStyles.points}>100 Points</Text>
          <Image source={require('./redeem-button.png')} style={redeemStyles.button} />
          <ScrollView>
            <Text style={redeemStyles.description}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const redeemStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    marginTop: 60
  },
  contentContainer: {
    top: height*.02,
    left: width*.05,
    width: width*.9
  },
  header: {
    width: width,
    height: height*.3
  },
  title: {
    fontWeight: '400',
    fontSize: font,
    fontFamily: 'Gill Sans'
  },
  description: {
    fontWeight: '300',
    fontFamily: 'Gill Sans',
    color: '#a3a3a3'
  },
  points: {
    fontWeight: '500',
    fontFamily: 'Gill Sans',
    color: '#1B8889',
    marginTop: height*.015
  },
  button: {
    width: width*.23,
    height: height*.05,
    marginTop: height*.01,
    marginBottom: height*.02
  }
});

module.exports = Redeem;