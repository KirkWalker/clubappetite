var {
    Platform,
    AlertIOS,
    ToastAndroid
} = require('react-native');

var DB = require('./DB');

var DEBUG = true;
var SERVER_URL = 'http://restapi.clubappetite.com/api.php';
var _page_name = 'Transactions:';
var Transactions = {};


Transactions.verifyCCForm = function (details) {

    var inputFN = details.inputFN;
    var inputLN = details.inputLN;
    var inputCC = details.inputCC;
    var inputCCV = details.inputCCV;
    var inputEXPM = details.inputEXPM;
    var inputEXPY = details.inputEXPY;
    var checked = details.checked;

    var API_REQUEST = 'Transaction:';

    var error_message = '';

    if(inputFN == '' || inputLN == '' || inputCC == ''|| inputCCV == ''|| inputEXPM == ''|| inputEXPY == '') {
        error_message = 'Please fill in all the form fields';
        console.log('error_message:',error_message);
    }

    if(!checked){

        error_message = 'You must agree to the terms and conditions to continue.';

    }

    if(error_message !=''){
        if(Platform.OS === 'ios'){
            AlertIOS.alert(
             error_message,
             'Please try again.'
            );
        } else {
            ToastAndroid.show(error_message, ToastAndroid.SHORT);
        }

        return false;

    } else {

         //console.log(API_REQUEST+"data:",SERVER_URL + '?controller=api&action=transaction');
         if(DEBUG) { console.log(_page_name+' Post Completed',details); }
         return true;
    }




};


module.exports = Transactions;