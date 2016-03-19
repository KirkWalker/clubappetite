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
      this.state = {user_profile: [], ProductArray: []};
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
                <Text style={cartStyles.title}>Needed Now</Text>
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
           <View style={cartStyles.modulerow}>







          </View>
        </View>
      </View>

    );
  }

  addProduct(idx,_this){

    var ProductArray =_this.state.ProductArray;
    var current_qty = 0;

    //console.log('ProductArray: ',_this.state.ProductArray);

    for(var i=0;i<ProductArray.length;i++){
        if(_this.state.ProductArray[i].id == idx){
            current_qty = ProductArray[i].user_qty;
            current_qty ++;
            ProductArray[i].user_qty = current_qty;
            console.log('Updating Product: ',_this.state.ProductArray[i].product_name + ' new qty=' + current_qty);
        }
    }

    _this.setState({ProductArray : ProductArray});


  }

  delProduct(idx,_this){

    var ProductArray =_this.state.ProductArray;
    var current_qty = 0;

    //console.log('ProductArray: ',_this.state.ProductArray);

    for(var i=0;i<ProductArray.length;i++){
        if(_this.state.ProductArray[i].id == idx){
            current_qty = ProductArray[i].user_qty;
            current_qty --;
            if(current_qty < 0) { current_qty = 0; }

            ProductArray[i].user_qty = current_qty;
            console.log('Updating Product: ',_this.state.ProductArray[i].product_name + ' new qty=' + current_qty);
        }
    }

    _this.setState({ProductArray : ProductArray});


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


            <TouchableOpacity onPress={this.del} >
              <Text>-</Text>
            </TouchableOpacity>

            <Image
            style={cartStyles.img}
            source={{uri:this.props.obj.product_img}}
            />


            <TouchableOpacity onPress={this.add} >
              <Text>+</Text>
            </TouchableOpacity>

        </View>

        <Text>{this.props.obj.user_qty}</Text>

        <Text>${this.props.obj.product_price}</Text>
      </View>
    );
  }
});




var cartStyles = StyleSheet.create({
  module: {
    flexDirection: 'column',
    width: width*.95,
  },
  module1: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  module2: {
    marginTop: 10,
    padding: 5,
    flex: 6,
    backgroundColor:'#efefef',
  },
  module3: {
    marginTop: 10,
    padding: 5,
    flex: 2,
  },
  scrollView: {



  },
  horizontalScrollView: {
    height: height*.45,
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
    }
});



module.exports = Cart;