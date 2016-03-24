import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Image,
  PixelRatio,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

var {width, height} = Dimensions.get('window');
var font = 22;

if (PixelRatio.get() <= 2) {
  font = 18;
}

class Products extends Component {
  render() {
    return (
      <View style={productsStyles.container}>

        <Image source={require('../img/sample-business-logo.png')} style={productsStyles.logo} />

        <TouchableOpacity>
          <View style={productsStyles.contactContainer}>
            <View style={productsStyles.textContainer}>
              <Text style={productsStyles.title}>Contact</Text>
            </View>
            <Image source={require('../img/arrow.png')} style={productsStyles.arrow} />
          </View>
        </TouchableOpacity>

        <ScrollView>
          <View style={productsStyles.productViewContainerColumn}>
            <View style={productsStyles.productViewContainerRow}>
              <View style={productsStyles.productContainer}>
                <Image source={require('../img/shop-gallery/sample-image-3.png')} style={productsStyles.productImage}>
                  <Image source={require('../img/shop-points-container.png')} style={productsStyles.pointsContainer}>
                    <Text style={productsStyles.points}>500</Text>
                  </Image>
                  <Text style={productsStyles.productTitle}>Deal Title</Text>
                </Image>
              </View>
              <View style={productsStyles.productDescriptionContainer}>
                <Text style={productsStyles.title}>Product Name</Text>
                <Text style={productsStyles.description}>Describe item here in greater details than the simplified list. Relevant info such as dates or times.</Text>
              </View>
            </View>
          </View>

          <View style={productsStyles.productViewContainerColumn}>
            <View style={productsStyles.productViewContainerRow}>
              <View style={productsStyles.productContainer}>
                <Image source={require('../img/shop-gallery/sample-image-2.png')} style={productsStyles.productImage}>
                  <Image source={require('../img/shop-points-container.png')} style={productsStyles.pointsContainer}>
                    <Text style={productsStyles.points}>500</Text>
                  </Image>
                  <Text style={productsStyles.productTitle}>Deal Title</Text>
                </Image>
              </View>
              <View style={productsStyles.productDescriptionContainer}>
                <Text style={productsStyles.title}>Product Name</Text>
                <Text style={productsStyles.description}>Describe item here in greater details than the simplified list. Relevant info such as dates or times.</Text>
              </View>
            </View>
          </View>

          <View style={productsStyles.productViewContainerColumn}>
            <View style={productsStyles.productViewContainerRow}>
              <View style={productsStyles.productContainer}>
                <Image source={require('../img/shop-gallery/sample-image-1.png')} style={productsStyles.productImage}>
                  <Image source={require('../img/shop-points-container.png')} style={productsStyles.pointsContainer}>
                    <Text style={productsStyles.points}>500</Text>
                  </Image>
                  <Text style={productsStyles.productTitle}>Deal Title</Text>
                </Image>
              </View>
              <View style={productsStyles.productDescriptionContainer}>
                <Text style={productsStyles.title}>Product Name</Text>
                <Text style={productsStyles.description}>Describe item here in greater details than the simplified list. Relevant info such as dates or times.</Text>
              </View>
            </View>
          </View>

          <View style={productsStyles.productViewContainerColumn}>
            <View style={productsStyles.productViewContainerRow}>
              <View style={productsStyles.productContainer}>
                <Image source={require('../img/shop-gallery/sample-image-2.png')} style={productsStyles.productImage}>
                  <Image source={require('../img/shop-points-container.png')} style={productsStyles.pointsContainer}>
                    <Text style={productsStyles.points}>500</Text>
                  </Image>
                  <Text style={productsStyles.productTitle}>Deal Title</Text>
                </Image>
              </View>
              <View style={productsStyles.productDescriptionContainer}>
                <Text style={productsStyles.title}>Product Name</Text>
                <Text style={productsStyles.description}>Describe item here in greater details than the simplified list. Relevant info such as dates or times.</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        
      </View>
    );
  }
}

const productsStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    marginTop: 60
  },
  logo: {
    width: width*.5,
    height: height*.18,
    marginTop: height*.02,
    marginBottom: height*.02
  },
  contactContainer: {
    flexDirection: 'row',
    width: width,
    paddingTop: height*.02,
    paddingBottom: height*.02,
    paddingLeft: width*.05,
    paddingRight: width*.05,
    marginTop: height*.015,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: .3,
    shadowRadius: 3,
    shadowOffset: {
      height: 2.5,
      width:0
    }
  },
  textContainer: {
    flexDirection: 'column',
    paddingLeft: width*.05,
    paddingRight: width*.05,
    width: width*.8
  },
  title: {
    fontSize: font,
    fontWeight: '500',
    color: '#a3a3a3',
    fontFamily: 'Gill Sans'
  },
  arrow: {
    height: width*.08,
    width: width*.08,
  },
  productViewContainerRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#a3a3a3'
  },
  productViewContainerColumn: {
    flexDirection: 'column',
    backgroundColor: '#F2F2F2'
  },
  productContainer: {
    alignItems: 'center'
  },
  productImage: {
    width: width*.5,
    height: height*.22,
    alignItems: 'center'
  },
  pointsContainer: {
    height: width*.12,
    width: width*.12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  points: {
    fontWeight: '400',
    fontSize: font*.7,
    fontFamily: 'Gill Sans',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  productTitle: {
    fontWeight: '500',
    fontSize: font,
    fontFamily: 'Gill Sans',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    top: height*.09
  },
  productDescriptionContainer: {
    width: width*.5,
    flexDirection: 'column',
    marginLeft: width*.03,
    marginTop: width*.04,
  },
  description: {
    fontWeight: '400',
    fontFamily: 'Gill Sans',
    color: '#a3a3a3',
    fontSize: font*.7,
    marginTop: height*.02
  }

});

module.exports = Products;