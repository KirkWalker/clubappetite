'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  Navigator,
  TouchableOpacity,
  InteractionManager,
  PixelRatio,
  Dimensions,
  Image,
  ScrollView,
} = React;

var styles = require('../styles');

var Users = require('../datalayer/User');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');
var MyProducts = require('../datalayer/WebAPI');

var font = 20;
if (PixelRatio.get() <= 2) {
  font = 18;
}

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class Checkout extends Component {

  constructor(props) {
      super(props);
      this.state = {user_profile: [], DataArray: [], cartTotal: this.props.details.cartTotal};

  }

  componentDidMount() {
    this.mounted = true;
    InteractionManager.runAfterInteractions(() => {

        Users.getProfile(this);

        //strip out any products not being purchased
        var DataArray =[];
        for(var i=0;i<this.props.details.DataArray.length;i++){
         if(this.props.details.DataArray[i].user_qty > 0){
             console.log('adding'+this.props.details.DataArray[i].id+':',this.props.details.DataArray[i].user_qty);
             DataArray[i] = this.props.details.DataArray[i];
         }
        }
        this.setState({DataArray : DataArray});
    });
  }

  componentWillUnmount() {
      this.mounted = false;
  }

  render() {

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

    var _scrollView: ScrollView;





    return (

      <View style={[styles.container]}>
        <View style={[checkoutStyle.module, checkoutStyle.module1]}>
          <View style={checkoutStyle.moduleRow}>
             <View style={checkoutStyle.headercell1}>
                <Text style={checkoutStyle.headertext}>Your Cart</Text>
             </View>
             <View style={checkoutStyle.headercell2}>
                <Text>--</Text>
             </View>
          </View>
        </View>
        <View style={[checkoutStyle.module, checkoutStyle.module2]}>


            <ScrollView
              ref={(scrollView) => { _scrollView = scrollView; }}
              automaticallyAdjustContentInsets={false}
              horizontal={false}
              showsVerticalScrollIndicator={true}
              scrollEnabled={true}
              >
              {this.state.DataArray.map((obj, i) => <TableRow key={i} obj={obj} />)}
            </ScrollView>




        </View>
        <View style={[checkoutStyle.module, checkoutStyle.module3]}>



            <View style={checkoutStyle.moduleRow}>
               <View style={checkoutStyle.headercell1}>
                  <Text style={checkoutStyle.headertext}>Your Total</Text>
               </View>
               <View style={checkoutStyle.headercell2}>
                  <Text style={checkoutStyle.headertext}>${this.state.cartTotal}</Text>
               </View>
            </View>


        </View>
        <View style={[checkoutStyle.module, checkoutStyle.module4]}>
          <TouchableOpacity
            onPress={this.doCheckout.bind(this)}
            style={checkoutStyle.checkout}
            >
            <Text style={checkoutStyle.checkouttext}>CHECKOUT</Text>
          </TouchableOpacity>
        </View>
        <View style={[checkoutStyle.module, checkoutStyle.module5]}>
            <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Loblaws.svg/1280px-Loblaws.svg.png'}} style={[checkoutStyle.banner]} />
        </View>
      </View>
    );
  }


  doCheckout() {





    console.log('checkout');
    this.props.navigator.push({
      id: 'Payment',
      name: 'Payment Page',
      details: {amount:this.state.cartTotal, DataArray : this.state.DataArray}
    });
  }


}





var TableRow = React.createClass({

  shouldComponentUpdate: function(nextProps, nextState) {
    return true;
  },
  render: function() {

    return (
    <View style={checkoutStyle.scrollview}>
      <View style={checkoutStyle.moduleRow}>
        <View style={checkoutStyle.cell1}>
          <Text style={checkoutStyle.celltext1}>{this.props.obj.product_name}</Text>
        </View>
        <View style={checkoutStyle.cell2}>
          <Text style={checkoutStyle.celltext2}>X {this.props.obj.user_qty} @</Text>
        </View>
        <View style={checkoutStyle.cell3}>
          <Text style={checkoutStyle.celltext2}>${this.props.obj.product_price} ea.</Text>
        </View>
      </View>
    </View>
    );
  }
});


var checkoutStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'white',
  },
  module: {
    flexDirection: 'column',
    width: width,
  },
  module1: {
    flex: 2,
    backgroundColor: '#4A8A1D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  module2: {
    flex: 4,
    backgroundColor: '#4A8A1D',
  },
  module3: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
    backgroundColor: '#4A8A1D',
  },
  module4: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  module5: {
    flex: 2,
  },
  headercell1: {
      flex: 1,
      padding:5,
  },
  headercell2: {
       flex: 1,
       padding:5,
       alignItems: 'flex-end',
  },
  cell1: {
    flex: 3,
    padding:5,
  },
   cell2: {
     flex: 2,
     padding:5,
   },
   cell3: {
     flex: 2,
     padding:5,
     alignItems: 'flex-end',
   },
   scrollview: {
     justifyContent: 'center',
     alignItems: 'center',
   },
  moduleRow: {
    flexDirection: 'row',
    width: width*.8,
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
  banner:{
     flex:1,
     alignItems: 'stretch',
     resizeMode: 'contain',

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
          fontSize:18,
          color:'white',
          fontWeight:'bold',
          fontFamily: 'Gill Sans',
        },
    celltext1: {
      fontSize:16,
      color:'white',
      fontWeight:'bold',
      fontFamily: 'Gill Sans',
    },
    celltext2: {
      fontSize:14,
      color:'white',
      fontWeight:'bold',
      fontFamily: 'Gill Sans',
    },
    headertext: {
      fontSize:22,
      color:'white',
      fontWeight:'bold',
      backgroundColor: '#4A8A1D',
      fontFamily: 'Gill Sans',
    },
});


module.exports = Checkout;
