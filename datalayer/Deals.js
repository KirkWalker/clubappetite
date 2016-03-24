var { View } = require('react-native')

var DB = require('./DB');

var DEBUG = false;
var SERVER_URL = 'http://restapi.clubappetite.com/api.php';
var _page_name = 'Deals';
var DealsStore = {};


DealsStore.getDealData = function (_this) {

        var self = this;
        var token = _this.state.user_profile.token;
        var current_mod = '1900-01-01 12:00:00';

        if(token == undefined){
            console.log('Deal page token error:', token);
        } else {

            if(DEBUG) { console.log('Deal page token:', token); }

        }

        /*
        Check to see if the datalayer has latest bersion of sponsors
        If a record exists in the local datalayer we skip ahead and set the state
        with the result set
        */
        DB.deals.get_all(function(results){



            if(results.totalrows == 0){ // no data in local datalayer

                if(token != undefined){
                    self.fetchData(_this, token, current_mod, '');
                }

            } else {

                var nk = [];
                for(var key in results.rows){
                    nk.push(results.rows[key]);
                }
                //DB.messages.erase_db(function(removed_data){
                   //console.log('Directory: remove data result');
                   //console.log(removed_data);
                   //console.log('------------------');
                 //});

                current_mod = nk[0].max_mod;
                if(token != undefined){
                    self.fetchData(_this, token, current_mod, nk);
                }

            }

        });

};


DealsStore.fetchData = function (_this, token, current_mod, data) {

    var URL = SERVER_URL + '?controller=api&action=sponsordeals&last_mod='+current_mod+'&token='+token;
    if(DEBUG) { console.log(_page_name+' fetchData:', URL); }


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
                console.log(_page_name + ' API ERROR:',responseData);
            } else if(responseData.result == 'success'){

                //if(debug) { console.log(_page_name+' success', responseData);}
                delete responseData.result;

                if(responseData.code == 'refresh') {
                    delete responseData.code;

                    if(current_mod == '1900-01-01 12:00:00') {//this is first time, we create the table
                        DB.deals.add(responseData,function(result){
                            if(DEBUG) {
                               console.log(_page_name+' Adding deal');
                               console.log(result);
                               console.log(_page_name+' Setting state:',responseData.details);
                            }
                           _this.setState({DealArray: responseData.details});
                        });
                    } else {
                        DB.deals.update({max_mod: current_mod}, { details: responseData.details, max_mod: responseData.max_mod }, function(updated_table){
                            if(DEBUG) {
                               console.log(_page_name+' Updating deals');
                               console.log(updated_table.deals);
                               console.log(_page_name+' Setting state:',responseData.details);
                            }
                            _this.setState({DealArray: responseData.details});
                        });

                    }

                } else {
                    if(DEBUG) { console.log(_page_name+' data is up to date2 ',data[0].details); }


                    var newArray = []; //insert a quantity variable
                    var resultset = data[0].details;
                    for(var key in resultset){
                        newArray.push(resultset[key]);
                    }





                    _this.setState({DealArray: data[0].details});
                }

            } else {
                 console.log(_page_name+' responseData failed(update)', responseData);
            }

        })
        .catch(function(error) {
            console.log(_page_name+' unknown failure(update):', error);
        })
        .done();


};



DealsStore.confirmDeal = function (_this) {

    DEBUG=true;
    var _token=_this.state.user_profile.token;
    var _amount = _this.props.deal_info.deal_price;
    var _id = _this.props.deal_info.id;

    var _user_profile = _this.state.user_profile;
    var _user_points = _user_profile.user_points;
    var _new_user_points = _user_points - _amount;

    _user_profile.user_points = _new_user_points;


    var URL = SERVER_URL + '?controller=api&action=confirmdeal';
    _page_name = 'confirmDeal';

    if(DEBUG) { console.log(_page_name+' fetchData:', URL); }

    fetch(URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: _token,
            amount: _amount,
            deal_id: _id,
        })
    })
    .then((response) => response.json())
    .then((responseData) => {

        if(responseData.result == 'error'){

            console.log(_page_name + ' API ERROR:',responseData);

        } else if(responseData.result == 'success'){

            console.log(_page_name + ' API SUCCESS:',responseData);

            _this.setState({user_profile:_user_profile, blnDoneTransaction:true,strTransDetails:responseData.result});

        } else {
             console.log(_page_name+' responseData failed(update)', responseData);
        }

    })
    .catch(function(error) {
        console.log(_page_name+' Network failure (is server offline?):', error);
    })
    .done();


};

module.exports = DealsStore;