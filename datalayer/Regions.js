var { View } = require('react-native')

var DEBUG = true;
var SERVER_URL = 'http://appdev.appsolutemg.com/api.php';
var API_REQUEST = "Region API request";

module.exports = {


    getRegions(_this) {

        var URL = SERVER_URL + '?controller=api&action=regions';

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
                for(var key in resData){
                    nk.push(resData[key].region_name);
                }
                if(DEBUG) { console.log(API_REQUEST+' new regions:',nk); }
                _this.setState({regions: nk});



            } else {

                 console.log(API_REQUEST+' FAILED', responseData);

            }

        })
        .catch(function(error) {
            console.log(API_REQUEST+' UNKNOWN FAILURE:', error);
        })
        .done();


    }




}

