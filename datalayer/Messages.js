var { View } = require('react-native')

var DB = require('./DB');

var DEBUG = true;
var SERVER_URL = 'http://restapi.clubappetite.com/api.php';
var _page_name = 'Messages';
var MessagesStore = {};


MessagesStore.getMessageData = function (_this) {

    var self = this;
    var current_mod = '1900-01-01 12:00:00';

    if (_this.mounted === true){ //very important, keep this from firing multiple times.

        /*
        Check to see if the datalayer has latest bersion of sponsors
        If a record exists in the local datalayer we skip ahead and set the state
        with the result set
        */
        DB.messages.get_all(function(results){

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

    }

};

MessagesStore.fetchData = function (_this, token, current_mod, data) {

    var URL = SERVER_URL + '?controller=api&action=messages&last_mod='+current_mod+'&token='+token;
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
                        DB.messages.add(responseData,function(result){
                            if(DEBUG) {
                               console.log(_page_name+' Adding messages');
                               console.log(result);
                               console.log(_page_name+' Setting state:',responseData.details);
                            }
                           _this.setState({
                                dataSource: _this.state.dataSource.cloneWithRows(responseData.details),
                                loaded: true,
                            });
                        });
                    } else {
                        DB.messages.update({max_mod: current_mod}, { details: responseData.details, max_mod: responseData.max_mod }, function(updated_table){
                            if(DEBUG) {
                               console.log(_page_name+' Updating messages');
                               console.log(updated_table.messages);
                               console.log(_page_name+' Setting state:',responseData.details);
                            }

                            _this.setState({
                                dataSource: _this.state.dataSource.cloneWithRows(responseData.details),
                                loaded: true,
                            });
                        });
                    }

                } else {
                    if(DEBUG) { console.log(_page_name+' data is up to date2 ',data[0].details); }
                    
                    if(_this.state.dataSource != undefined){
                        _this.setState({
                            dataSource: _this.state.dataSource.cloneWithRows(data[0].details),
                            loaded: true,
                        });
                    }
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


module.exports = MessagesStore;