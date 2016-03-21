'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Dimensions,
    TextInput,
    Platform,
    ToastAndroid,
    AlertIOS,
} = React;

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var mainstyles = require('../styles');
var CheckButton = require('./ButtonLogin');
var CancelButton = require('./ButtonLogin');

var Component = React.createClass({
    show: function(){
        this.setState({modalVisible: true, inputCode: ''});
    },
    getInitialState: function(){
        return {
            inputCode: '',
            modalVisible: false,
        };
    },
    setCode: function(code) {

         this.setState({inputCode: code});

    },
    render: function() {
        return (
        <Modal
            animated={true}
            transparent={true}
            visible={this.state.modalVisible}>
            <View style={styles.container}>
                <View style={styles.column}>


                  <View style={[styles.module1, styles.module]}>
                    <Text style={[styles.heading]}>Refer A Friend And Earn POINTS!</Text>
                  </View>
                  <View style={[styles.module2, styles.module]}>
                    <Text style={[styles.title]}>Enter your code here:</Text>
                    <View style={mainstyles.module} marginTop={20}>
                        <View style={mainstyles.inputContainer}>
                          <TextInput
                              style={mainstyles.input}
                              placeholder="ENTER CODE"
                              placeholderTextColor='#1B898A'
                              onChangeText={(text) => this.setState({inputCode: text})}
                              ref={'refer_input'}
                              value={this.state.inputCode}  />
                        </View>


                    </View>

                      <View style={styles.module} marginTop={40}>
                        <CheckButton
                            buttonText="USE CODE"
                            color="#009999"
                            textcolor="white"
                            onPress={() => {
                                this._onPressButtonPOST();
                            }}
                            />
                      </View>

                      <View style={styles.module} marginTop={10}>
                        <CancelButton
                            onPress={() => {
                                if(this.props.onSubmit) this.props.onSubmit('');
                                this.setState({modalVisible: false})
                            }}
                            buttonText="CANCEL"
                            marginTop={10}
                            color="#efefef"
                            textcolor="#999999" />
                      </View>

                  </View>
                </View>
            </View>
        </Modal>
        );
    },



    _onPressButtonPOST: function() {

        console.log('checking code');

        var DEBUG = true;
        var SERVER_URL = 'http://restapi.clubappetite.com/api.php';
        //http://restapi.clubappetite.com/api.php?controller=api&action=checkreferralcode&token=
        fetch(SERVER_URL + '?controller=api&action=checkreferralcode', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code: this.state.inputCode,
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            if(responseData.result == 'error'){
                console.log('User Class getreferralcode ERROR:',responseData);

                if(Platform.OS === 'ios'){
                    AlertIOS.alert(
                     'Code is not valid',
                     'Please check it and try again.'
                    );
                } else {
                    ToastAndroid.show('Code is not valid, Please check it and try again.', ToastAndroid.SHORT);
                }


            } else {

                if(this.props.onSubmit) this.props.onSubmit(this.state.inputCode);
                this.setState({modalVisible: false});

            }
        })
        .catch(function(error) {
            console.log('getreferralcode request failed', error);
        })
        .done();






    }




});

var styles = StyleSheet.create({
   container: {
       flex: 1,
       height: height,
       backgroundColor: '#efefef',
       justifyContent: 'center',
       alignItems: 'center',
   },
   column: {
       width:width*.9,
       height:height,
   },
   module:{
       elevation:2,
       shadowColor: '#999999',
       shadowOpacity: .8,
       shadowRadius: 2,
       shadowOffset: {
           height: 1,
           width: 1
       },
   },
       module1: {
         flex: 2,
         backgroundColor: 'white',
         justifyContent: 'center',
         alignItems: 'center',
         marginTop:5,
         marginBottom:5,
       },
       module2: {
         flex: 4,
         backgroundColor: 'white',
         marginTop:5,
         marginBottom:5,
         padding:20,
         alignItems: 'center',
       },
       module3: {
         justifyContent: 'center',
         alignItems: 'center',
         flex: 2,
         width:width,
         backgroundColor: 'white',
         marginTop:5,
       },
       heading: {
         fontSize:25,
         color:'#4A8A1D',
         fontWeight:'bold',
         fontFamily: 'Gill Sans',
         textAlign:'center',
         lineHeight:40,
       },
       title: {
         fontSize:20,
         color:'#4A8A1D',
         fontWeight:'bold',
         fontFamily: 'Gill Sans',
         textAlign:'center',
         lineHeight:40,
       },
       code: {
         fontSize:40,
         color:'red',
         fontWeight:'bold',
         fontFamily: 'Gill Sans',
         textAlign:'center',
         lineHeight:80,
         marginBottom:20,
       },
       message: {

         fontSize:16,
         fontFamily: 'Gill Sans',
         lineHeight:30,
         textAlign:'center',
       },
       banner:{
          width:width,
          height:height*.15,
          alignItems: 'stretch',
       },
           generate: {
             backgroundColor: '#4A8A1D',
             paddingLeft:15,
             paddingRight:15,
             paddingTop:5,
             paddingBottom:5,
             borderRadius:50,
       },
       generatetext: {
         fontSize:18,
         color:'white',
         fontWeight:'bold',
         fontFamily: 'Gill Sans',
       },
});

module.exports = Component;