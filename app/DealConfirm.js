
import React, {
  Component,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  PixelRatio,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Navigator,
  View
} from 'react-native';

var DEBUG = false;
if (DEBUG) {console.log("Redeem DEBUG flag set\n---------------------");}

var {width, height} = Dimensions.get('window');

var Users = require('../datalayer/User');
var Deals = require('../datalayer/WebAPI');
var NavigationBarRouteMapper = require('../modules/NavigationBarRouteMapper');
var styles = require('../styles');
var Button = require('../modules/Button');

var font = 22;
if (PixelRatio.get() <= 2) {
  font = 18;
}

class DealConfirm extends Component {

  constructor(props) {
        super(props);
        this.state = {user_profile: [], blnDoneTransaction:false,strTransDetails:''};
  }

  componentDidMount() {
        this.mounted = true;
        Users.getProfile(this);
        //if (DEBUG) {console.log("Received deal_info ",this.props.deal_info);}
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


    var _this = this;
    var _viewName = '';

    if(!this.state.blnDoneTransaction){
        _viewName = <ConfirmButton onPress={() => this.confirmDeal(this)} />;
    }else {
        _viewName = <Notification details={this.state.strTransDetails} />;
    }

    return (
      <View style={redeemStyles.container}>
        <View style={redeemStyles.imageContainer}>
          <Image source={require('../img/logo-white.png')} style={redeemStyles.logo} />
        </View>
        <View style={redeemStyles.contentContainer}>

            <View style={redeemStyles.mod1}>

                <Text style={redeemStyles.title}>{this.props.deal_info.deal_title}</Text>
                <Text style={redeemStyles.description}>{this.props.deal_info.deal_short_desc}</Text>
                <Text style={redeemStyles.points}>{this.props.deal_info.deal_price} Points</Text>
                <Text style={redeemStyles.points}>You have {this.state.user_profile.user_points} Points</Text>

                {_viewName}

            </View>

            <View style={redeemStyles.mod2}>

                <Text style={redeemStyles.whitetext}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                qui ratione voluptatem sequi nesciunt.</Text>

            </View>



        </View>

      </View>
    );
  }


  confirmDeal(_this) {


     Deals.confirmDeal(_this);
     console.log('confirmDeal');
  }

}


var Notification = React.createClass({

  shouldComponentUpdate: function(nextProps, nextState) {
    return true;
  },
  render: function() {

    var message = '';
    if(this.props.details == 'success'){
        message = 'Thank You! Your Points have been deducted';
    }

    return (

       <View style={redeemStyles.thankyouContainer}>

            <Text>Result:{this.props.details}</Text>
            <Text style={redeemStyles.thankyou}>{message}</Text>


       </View>

    );

  }

});



var ConfirmButton = React.createClass({

  shouldComponentUpdate: function(nextProps, nextState) {
    return true;
  },
  render: function() {
    return (

        <View style={redeemStyles.buttonContainer}>

            <Button
                buttonText="REDEEM PONTS"
                buttonColor="green"
                onPress={() => this.props.onPress()}
            />

        </View>

    );

  }

});

const redeemStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0BB1A',
    marginTop: height*0.11,
    alignItems:'center',
  },
  thankyouContainer: {
      marginTop: 10,

  },
  thankyou: {
    marginTop: 10,
    textAlign:'center',
  },
  buttonContainer: {
    marginTop:30,
    width: width*.8,
    alignItems:'center',
  },
  imageContainer: {
      width: width,
      flex:2,
      alignItems:'center',
    },
  contentContainer: {
    top: height*.02,
    width: width*.9,
    marginBottom:20,


    flex:8,
  },

  mod1:{
    padding:20,
    backgroundColor: '#FFFFFF',
    borderRadius:20,
    elevation:2,
      shadowColor: '#999999',
      shadowOpacity: .8,
      shadowRadius: 2,
      shadowOffset: {
          height: 1,
          width: 1
      },
  },
  mod2: {
    marginTop:20,
    padding:5,

  },
  logo: {
    width: width*.5,
    height: height*.18,
    alignItems: 'stretch',
    resizeMode: 'contain'
  },

  title: {
    fontWeight: '400',
    fontSize: font,
    fontFamily: 'Gill Sans'
  },
  whitetext: {

    fontFamily: 'Gill Sans',
    color: '#FFFFFF',
  },
  description: {
      fontWeight: '300',
      fontFamily: 'Gill Sans',
  },
  points: {
    fontWeight: '500',
    fontFamily: 'Gill Sans',
    color: 'rgb(027, 135, 136)',
    marginTop: height*.015
  },
  button: {
    width: width*.23,
    height: height*.05,
    marginTop: height*.01,
    marginBottom: height*.02
  }
});

module.exports = DealConfirm;