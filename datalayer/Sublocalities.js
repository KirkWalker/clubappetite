var { View } = require('react-native')

var DEBUG = true;
var SERVER_URL = 'http://restapi.clubappetite.com/api.php';
var API_REQUEST = "SubLocalities API request";

module.exports = {


    getSubLocalities(_this) {

        var URL = SERVER_URL + '?controller=api&action=sublocalities';

        fetch(URL, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((responseData) => {

            if(responseData.result == 'error'){

                console.log(API_REQUEST+' ERROR:',responseData);

            } else if(responseData.result == 'success'){

                if(DEBUG) { console.log(API_REQUEST+' SUCCESS:',responseData.details); }
                var resData = responseData.details;
                var nk = [];
                var nk2 = [];
                for(var key in resData){
                    nk.push(resData[key].sub_name);
                    nk2.push(resData[key].id);
                }
                if(DEBUG) { console.log(API_REQUEST+' new data:',nk); }
                _this.setState({sublocalities: nk, sublocalitiesIds: nk2});



            } else {

                 console.log(API_REQUEST+' FAILED', responseData);

            }

        })
        .catch(function(error) {
            console.log(API_REQUEST+' CONNECTION FAILURE:', error);
        })
        .done();


    }

}