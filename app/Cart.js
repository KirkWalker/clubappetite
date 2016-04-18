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
  Platform,
  AlertIOS,
  ToastAndroid,
  InteractionManager,
} = React;

var styles = require('../styles');

var Users = require('../datalayer/User');

var MyProducts = require('../datalayer/WebAPI');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');
var Button = require('../modules/Button');
var BannerAd = require('../modules/BannerAds');

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


class Cart extends Component {

  constructor(props) {
      super(props);
      this.state = {
        user_profile: [],
        DataArray: [],
        cartTotal: 0,
        loaded: false,
      };
  }

  componentDidMount() {
      this.mounted = true;
      Users.getProfile(this);
      InteractionManager.runAfterInteractions(() => {
          MyProducts.getData(this, "products");
      });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  renderLoadingView() {
    return(
      <View style={[cartStyles.module2, {justifyContent: 'center'}]}>
        <Text style={cartStyles.loadingText}>Loading Products...</Text>
      </View>
    );
  }

  renderProducts() {
    var _scrollView: ScrollView;

    return(
      <View style={[cartStyles.module, cartStyles.module2]}>
        <View style={cartStyles.modulerow}>
          <ScrollView
            ref={(scrollView) => { _scrollView = scrollView; }}
            automaticallyAdjustContentInsets={false}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentInset={{top:0,left:70,bottom:0,right:65}}
            contentOffset={{x:-65}}
            pagingEnabled={false}
            style={[cartStyles.scrollView, cartStyles.horizontalScrollView]}>
            {this.state.DataArray.map((obj, i) => <Thumb
              key={i}
              obj={obj}
              addProduct={(idx) => this.addProduct(idx,this)}
              delProduct={(idx) => this.delProduct(idx,this)}
            />)}
          </ScrollView>
        </View>
      </View>
    );
  }

  render() {

    if(this.state.DataArray.length > 0 && this.mounted){
      //console.log('DataArray::',this.state.DataArray);
    }

    var data = [];
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

    return (
      <View style={cartStyles.container}>
        <View style={[cartStyles.module1]}>
             <Image source={require('../img/cartheader.png')} style={cartStyles.cartheader} resizeMode={Image.resizeMode.contain} />
        </View>
        
        {
          (!this.state.loaded) ? this.renderLoadingView() : this.renderProducts() 
        }

        <View style={[cartStyles.module]}>
           <View style={cartStyles.moduleRow}>
            <View style={cartStyles.moduleCell1}>
                <Text style={cartStyles.total}>Total = ${ this.state.cartTotal }</Text>
            </View>
            <View style={cartStyles.moduleCell2}>
                <Button 
                  onPress={this.doCheckout.bind(this)}
                  buttonText="CHECKOUT"
                  buttonColor="green"
                />
            </View>
          </View>
        </View>
        <View style={cartStyles.ad}>
        <BannerAd refThis={this} pageName={'Cart'} />
        </View>
      </View>

    );
  }

  doCheckout() {

    if(this.state.cartTotal == 0){
        if(Platform.OS === 'ios'){
            AlertIOS.alert(
             'Your cart is empty',
             'Please choose a few items and try again.'
            );
        } else {
            ToastAndroid.show('Your cart is empty', ToastAndroid.SHORT);
        }
    } else {

        this.gotoCheckout();

    }

  }


  addProduct(idx,_this){

    var DataArray =_this.state.DataArray;
    var current_qty = 0;
    var current_total = 0;

    for(var i=0;i<DataArray.length;i++){
        if(DataArray[i].id == idx){
            current_qty = DataArray[i].user_qty;
            current_qty ++;
            DataArray[i].user_qty = current_qty;
        }
        current_total += (DataArray[i].user_qty * DataArray[i].product_price)
    }

    current_total = current_total.toFixed(2)
    _this.setState({DataArray : DataArray, cartTotal:current_total });

  }

  delProduct(idx,_this){

    var DataArray =_this.state.DataArray;
    var current_qty = 0;
    var current_total = 0;

    for(var i=0;i<DataArray.length;i++){
        if(DataArray[i].id == idx){
            current_qty = DataArray[i].user_qty;
            current_qty --;
            if(current_qty < 0) { current_qty = 0; }

            DataArray[i].user_qty = current_qty;
        }
        current_total += (DataArray[i].user_qty * DataArray[i].product_price)
    }

    current_total = current_total.toFixed(2)
    if(current_total < 0) { current_total = 0; }
    _this.setState({DataArray : DataArray, cartTotal:current_total});

  }


  gotoCheckout() {
    this.props.navigator.push({
      id: 'Checkout',
      name: 'Checkout Page',
      details: {DataArray : this.state.DataArray, cartTotal:this.state.cartTotal}
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
    var points = Number(this.props.obj.product_price)*100;
    return (
      <View style={[cartStyles.pagecontainer]}>


         <Image source={require('../img/points-container.png')} style={cartStyles.ppp} resizeMode={Image.resizeMode.contain}>
            <Text style={cartStyles.ppptext}>{points}</Text>
         </Image>




        <View style={[cartStyles.buttonContents]}>


            <Button
              buttonText="-"
              onPress={this.del}
              buttonColor="gray"
              style={{paddingTop: 0}}
            />

            <Image
            style={cartStyles.img}
            source={{uri:this.props.obj.product_img}}
            />


            <Button
              buttonText="+"
              onPress={this.add}
              buttonColor="gray"
            />

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
  container: {
    flex: 1,
    marginTop: height*.11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2'
  },
  cartheader: {
    width: width,
    alignItems: 'stretch',
  },
  module: {
    flex: 2,
    flexDirection: 'column',
    width: width,
  },
  module1: {
    flex: 3.5,
    justifyContent: 'center',
    alignItems: 'center',

  },
  module2: {
    marginTop: 10,

    flex: 10,
  },
   module4: {
     flex: 3,
  },
  moduleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moduleCell1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft:40,
  },
  moduleCell2: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'flex-start',
     marginLeft:10,
  },
  horizontalScrollView: {
    height: height*.47,
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
    pagecontainer: {
      width: width*.60,
      height: height*.43,
      margin: 7,
      justifyContent: 'center',
            alignItems: 'center',
      backgroundColor: '#ffffff',
      borderRadius: 3,
      elevation:2,
      shadowColor: '#999999',
      shadowOpacity: .8,
      shadowRadius: 5,
      shadowOffset: {
          height: 4,
          width: 4
      },
    },
    buttonContents: {
      flexDirection: 'row',
      height: height*.16,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,

    },
    img: {
      width:90, //width*.3
      height: 90, //width*.3
      marginLeft: 15,
      marginRight:15,
    },

    qty: {
       backgroundColor: 'rgb(188, 188, 188)',
       width:width*.2,
       paddingTop:5,
       paddingBottom:5,
       borderRadius:50,
       justifyContent: 'center',
       alignItems: 'center',
       marginBottom:5
     },
     qtytext: {
       color:'white',
       fontWeight:'bold',
       fontFamily: 'Gill Sans',
     },
     circle: {
      borderRadius:50,
      backgroundColor: '#999999',
      width:width*.09,
      paddingTop:5,
      paddingBottom:5,
      justifyContent: 'center',
      alignItems: 'center',
     },
      circletext: {
        color:'white',
      },
    total: {
      fontSize: 18,
      fontFamily: 'Gill Sans',
      color:'black',
    },
    checkout: {
      backgroundColor: '#4A8A1D',
      paddingLeft:15,
      paddingRight:15,
      paddingTop:5,
      paddingBottom:5,
      borderRadius:50,
    },
    checkouttext: {
      color:'white',
      fontFamily: 'Gill Sans',
    },

    ppp: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:10,
        marginBottom:5,
    },
    ppptext: {
      color:'white',
      fontFamily: 'Gill Sans',
      backgroundColor: 'rgb(074, 138, 029)',
    },
  loadingText: {
    fontFamily: 'Gill Sans',
    color: 'rgb(163, 163, 163)',
    fontSize: 20,
  },
  ad: {
    flex: 2
  }
});



module.exports = Cart;