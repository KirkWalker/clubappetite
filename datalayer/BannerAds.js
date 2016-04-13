var { View } = require('react-native')

var DB = require('./DB');
var resultData;
var DEBUG = false;
var SERVER_URL = 'http://restapi.clubappetite.com/api.php';


module.exports = {

    getAdData( _this, _props, _route) {

        var token = _props.state.user_profile.token;
        var sub_id = _props.state.user_profile.sublocality_id;
        var database = DB.get('banner_ads');

        if(sub_id != undefined){

            database.get_all(function(result){


                var URL = SERVER_URL + '?controller=api&action=banners&sub_id='+sub_id;
                var current_mod = '1900-01-01 12:00:00';
                var current_data = '';


                if(result.totalrows == 0){ // banners not in local datalayer
                    if (DEBUG) { console.log('getAdData fetching banners for the first time:', result); }
                } else {
                    if (DEBUG) {console.log('getAdData checking for new banners:', result.rows['1'].max_mod);}
                    current_mod = result.rows['1'].max_mod;
                    current_data = result.rows['1'];
                    //if there are impressions tracked, we need to send to the server
                    var tempArray = [];
                    var tempString = [];
                    var adViewPayload = '[';

                    for (var key in current_data.details) {

                        tempArray = current_data.details[key];
                        tempString = '';
                        for (var subkey in tempArray) {

                            if(subkey === 'ad_id'){
                                tempString += '"id":'+tempArray[subkey] + ', ';
                            }
                            if(subkey === 'views'){
                                tempString += '"views":'+tempArray[subkey];
                                if(parseInt(tempArray[subkey])>0) {
                                    adViewPayload += '{' + tempString + '},';
                                }

                            }

                        }

                        //current_data.details[key].views = 0;


                    }

                    adViewPayload += ']';
                    adViewPayload = adViewPayload.replace(',]',']');
                    adViewPayload = adViewPayload.replace('[]','');

                    console.log('adViewPayload:', adViewPayload);
                    //if (DEBUG) {console.log('current_data.details:', current_data.details);}

                }


                fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                     body: JSON.stringify({
                           token: token,
                           last_mod: current_mod,
                           adViewPayload: adViewPayload,
                           page:_route,
                     })
                })
                .then((response) => response.json())
                .then((responseData) => {

                    /* If the responseData returns an error */
                    if(responseData.result == 'error') {
                        console.log(' API ERROR: ', responseData);
                    }

                    /* If the responseData returns a successful result */
                    else if (responseData.result == 'success') {

                        if (responseData.code == 'refresh') {
                            delete responseData.result;//so we don't insert it into the db
                            delete responseData.code;//so we don't insert it into the db
                            if (current_mod == '1900-01-01 12:00:00') {
                                database.add(responseData, function(result) {
                                    if (DEBUG) {
                                     console.log('Adding banner');
                                     console.log(result);
                                     console.log('Setting state: ', responseData.details);
                                    }
                                    _this.setState({banner_ads: responseData.details, ad: responseData.details[0]});
                                });

                            } else {

                                database.update(
                                    { max_mod: current_mod },
                                    { details: responseData.details, max_mod: responseData.max_mod },
                                    function(updated_table) {
                                        if (DEBUG) {
                                        console.log(' Updating banners');
                                        console.log(updated_table);
                                        console.log(' Setting state:', responseData.details);
                                        }

                                        _this.setState({banner_ads: responseData.details, ad: responseData.details[0]});

                                    });
                            }
                        }

                        //no new banners, use the existing banners
                        else {

                            var details = current_data.details;

                            details.sort(sort_by('views',false, parseInt));// bring the ad with the fewest views to the top
                            //console.log('Sorting banner by views:',details);


                            for (var key in current_data.details) {//reset all views to zero
                               current_data.details[key].views = 0;
                            }

                            database.update(
                            { max_mod: current_mod },
                            { details: details },
                            function(updated_table) {
                                if (DEBUG) {
                                    console.log(' Updating banner views');
                                    //console.log(updated_table);
                                }


                                _this.setState({banner_ads: details, ad: details[0]});

                            });

                        }

                    }

                })
                .catch(function(error) {
                    console.log('Banner network error: ', error);
                    var details = current_data.details;
                    details.sort(function (a, b) {return Math.random() - 0.5;});
                    _this.setState({banner_ads: details, ad: details[0]});
                })
                .done();


            })

        }




    },

    trackImpression(_current_ad_array, _ad_index){

        _current_ad_array[_ad_index].views = parseInt(_current_ad_array[_ad_index].views)+1;

        DB.banner_ads.update_id(1, {details: _current_ad_array}, function(details) {

            //console.log('details:',details.banner_ads);

        });

    }



}


var sort_by = function(field, reverse, primer){

         var key = primer ?
             function(x) {return primer(x[field])} :
             function(x) {return x[field]};

         reverse = !reverse ? 1 : -1;

         return function (a, b) {
             return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
           }
      }