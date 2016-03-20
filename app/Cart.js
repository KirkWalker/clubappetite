'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  Navigator,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} = React;

var styles = require('../styles');

var Users = require('../datalayer/User');

var MyProducts = require('../datalayer/Products');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


class Cart extends Component {

  constructor(props) {
      super(props);
      this.state = {user_profile: [], ProductArray: [], cartTotal: 0};
  }

  componentDidMount() {
      this.mounted = true;
      Users.getProfile(this);
      MyProducts.getProductData(this);
  }

  componentWillUnmount() {
    this.mounted = false;
  }
  render() {

    if(this.state.ProductArray.length > 0 && this.mounted){
      //console.log('ProductArray::',this.state.ProductArray);
    }

    var data = [];
    data.push(Users.getImageUrl(this));
    data.push(this.props.openDrawer);

    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={styles.navbar}
                routeMapper={NavigationBarRouteMapper(data)} />
          } />
    );
  }
  renderScene(route, navigator) {


    var _scrollView: ScrollView;

    return (
      <View style={styles.container}>
        <View style={[cartStyles.module, cartStyles.module1]}>
            <View style={cartStyles.modulerow}>
                <Image source={require('../img/cartheader.png')} style={cartStyles.cartheader} />
            </View>
        </View>
        <View style={[cartStyles.module, cartStyles.module2]}>
            <View style={cartStyles.modulerow}>


        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          horizontal={true}
          pagingEnabled={true}
          style={[cartStyles.scrollView, cartStyles.horizontalScrollView]}>
          {this.state.ProductArray.map((obj, i) => <Thumb
                                                      key={i}
                                                      obj={obj}
                                                      addProduct={(idx) => this.addProduct(idx,this)}
                                                      delProduct={(idx) => this.delProduct(idx,this)}
          />)}
        </ScrollView>





            </View>
        </View>

        <View style={[cartStyles.module, cartStyles.module3]}>
           <View style={cartStyles.moduleRow}>


            <Text style={cartStyles.total}>Total = ${ this.state.cartTotal }</Text>

            <TouchableOpacity
              onPress={this.doCheckout.bind(this)}
              style={cartStyles.checkout}
              >
              <Text style={cartStyles.checkouttext}>CHECKOUT</Text>
            </TouchableOpacity>



          </View>
        </View>
      </View>

    );
  }

  doCheckout() {





  }


  addProduct(idx,_this){

    var ProductArray =_this.state.ProductArray;
    var current_qty = 0;
    var current_total = 0;

    for(var i=0;i<ProductArray.length;i++){
        if(_this.state.ProductArray[i].id == idx){
            current_qty = ProductArray[i].user_qty;
            current_qty ++;
            ProductArray[i].user_qty = current_qty;
        }
        current_total += (ProductArray[i].user_qty * ProductArray[i].product_price)
    }

    current_total = current_total.toFixed(2)
    _this.setState({ProductArray : ProductArray, cartTotal:current_total });

  }

  delProduct(idx,_this){

    var ProductArray =_this.state.ProductArray;
    var current_qty = 0;
    var current_total = 0;

    for(var i=0;i<ProductArray.length;i++){
        if(_this.state.ProductArray[i].id == idx){
            current_qty = ProductArray[i].user_qty;
            current_qty --;
            if(current_qty < 0) { current_qty = 0; }

            ProductArray[i].user_qty = current_qty;
        }
        current_total += (ProductArray[i].user_qty * ProductArray[i].product_price)
    }

    current_total = current_total.toFixed(2)
    if(current_total < 0) { current_total = 0; }
    _this.setState({ProductArray : ProductArray, cartTotal:current_total});

  }


  gotoNext() {
    this.props.navigator.push({
      id: 'NoNavigatorPage',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  }
}

var Thumb = React.createClass({


  shouldComponentUpdate: function(nextProps, nextState) {
    return true;
  },
  add(){
    var id = this.props.obj.id;
    this.props.addProduct(id);
  },
  del(){
    var id = this.props.obj.id;
    this.props.delProduct(id);
  },
  render: function() {

    //console.log(this.props.obj);

    return (
      <View style={[cartStyles.button]}>
        <Text>{Number(this.props.obj.product_price)*100}</Text>

        <View style={[cartStyles.buttonContents]}>


            <TouchableOpacity onPress={this.del} style={[cartStyles.circle]}>
              <Text style={[cartStyles.circletext]}>-</Text>
            </TouchableOpacity>

            <Image
            style={cartStyles.img}
            source={{uri:this.props.obj.product_img}}
            />


            <TouchableOpacity onPress={this.add} style={[cartStyles.circle]}>
              <Text style={[cartStyles.circletext]}>+</Text>
            </TouchableOpacity>

        </View>
        <View style={cartStyles.qty}>
          <Text style={cartStyles.qtytext}>{this.props.obj.user_qty}</Text>
        </View>
        <Text style={cartStyles.total}>${this.props.obj.product_price}</Text>
      </View>
    );
  }
});




var cartStyles = StyleSheet.create({
  cartheader: {
    width: width,

    alignItems: 'stretch',
    resizeMode: 'contain'
  },
  module: {
    flexDirection: 'column',
    width: width,
  },
  module1: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  module2: {
    marginTop: 10,

    flex: 6,
  },
  module3: {
    marginTop: 10,
    padding: 5,
    flex: 2,
  },
  moduleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',


  },
  scrollView: {



  },
  horizontalScrollView: {
    height: height*.65,
  },
  title: {
      fontSize: 16,
      fontFamily: 'Gill Sans',
      flex:2,
      marginLeft: 10,
    },
    text: {
      fontSize: 11,
      fontFamily: 'Gill Sans',
    },
    alert: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:10,
      marginBottom:10,
      width: width*.85,
    },
    alerttext: {
      fontSize: 11,
      fontFamily: 'Gill Sans',
      alignSelf: 'center',
    },
  grey: {
    backgroundColor: '#efefef',
  },
  white: {
    backgroundColor: '#ffffff',
  },

    button: {
      width: width*.60,
      height: height*.42,
      margin: 7,
      padding: 5,
      justifyContent: 'center',
            alignItems: 'center',
      backgroundColor: '#ffffff',
      borderRadius: 3,
      elevation:2,
      shadowColor: '#999999',
      shadowOpacity: .8,
      shadowRadius: 2,
      shadowOffset: {
          height: 1,
          width: 1
      },
    },
    buttonContents: {
      flexDirection: 'row',
      height: height*.25,
      justifyContent: 'center',
      alignItems: 'center',


    },
    img: {
      width: 75,
      height: 75,
      marginLeft: 25,
      marginRight:25,
    },
    qty: {
       backgroundColor: '#999999',
       width:width*.2,
       paddingTop:5,
       paddingBottom:5,
       borderRadius:50,
       justifyContent: 'center',
       alignItems: 'center',
     },
     qtytext: {
       color:'white',
       fontWeight:'bold',
     },
     circle: {
      borderRadius:100,
      backgroundColor: '#999999',
      width:width*.065,
      paddingTop:2,
      paddingBottom:2,
      justifyContent: 'center',
      alignItems: 'center',
     },
      circletext: {
        color:'white',
        fontWeight:'bold',
      },
    total: {
      fontSize: 18,
      fontFamily: 'Gill Sans',
      color:'black',
      fontWeight:'bold',
    },
    checkout: {
      backgroundColor: '#4A8A1D',
      marginLeft:20,
      paddingLeft:15,
      paddingRight:15,
      paddingTop:5,
      paddingBottom:5,
      borderRadius:50,
    },
    checkouttext: {
      color:'white',
      fontWeight:'bold',
    },

});



module.exports = Cart;