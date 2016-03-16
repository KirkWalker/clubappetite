var { View } = require('react-native')

var DB = require('./DB');

var DEBUG = false;
var SERVER_URL = 'http://restapi.clubappetite.com/api.php';
var _page_name = 'Products';
var ProductsStore = {};


ProductsStore.getProductData = function (_this) {

        var self = this;

        var current_mod = '1900-01-01 12:00:00';

        /*
        Check to see if the datalayer has latest bersion of sponsors
        If a record exists in the local datalayer we skip ahead and set the state
        with the result set
        */
        DB.products.get_all(function(results){

            var token = _this.state.user_profile.token;

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


ProductsStore.fetchData = function (_this, token, current_mod, data) {

    var URL = SERVER_URL + '?controller=api&action=products&last_mod='+current_mod+'&token='+token;
    if(DEBUG) { console.log(_page_name+' fetchData:', URL); }

    if (_this.mounted === true){ //very important, keep this from firing multiple times.

        fetch(URL, {
            method: 'POST',
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
                        DB.products.add(responseData,function(result){
                            if(DEBUG) {
                               console.log(_page_name+' Adding product');
                               console.log(result);
                               console.log(_page_name+' Setting state:',responseData.details);
                            }
                           _this.setState({ProductArray: responseData.details});
                        });
                    } else {
                        DB.products.update({max_mod: current_mod}, { details: responseData.details, max_mod: responseData.max_mod }, function(updated_table){
                            if(DEBUG) {
                               console.log(_page_name+' Updating products');
                               console.log(updated_table.products);
                               console.log(_page_name+' Setting state:',responseData.details);
                            }
                            _this.setState({ProductArray: responseData.details});
                        });

                    }

                } else {
                    if(DEBUG) { console.log(_page_name+' data is up to date2 ',data[0].details); }
                    _this.setState({ProductArray: data[0].details});
                }

            } else {
                 console.log(_page_name+' responseData failed(update)', responseData);
            }

        })
        .catch(function(error) {
            console.log(_page_name+' unknown failure(update):', error);
        })
        .done();
    }

};


module.exports = ProductsStore;