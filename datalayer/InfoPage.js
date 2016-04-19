var { View } = require('react-native')

var DB = require('./DB');

var debug = false;
var Config = require('../config');
var SERVER_URL = Config.SERVER_URL;

module.exports = {

    getPageData(_this, _page_name) {

        //if (_this.mounted === true){ //very important, keep this from firing multiple times.

            DB.infopage.get({name: _page_name}, function(result){

                var action = '';
                var token = _this.state.user_profile.token;
                var initText = '';
                var URL = SERVER_URL + '?controller=api&action=infopage&name='+_page_name

                if(result[0]){
                    initText = result[0];
                    action = 'update';
                    current_mod = initText.last_mod;
                } else {
                    action = 'add';
                    current_mod = '1900-01-01 12:00:00';
                }
                if(current_mod == undefined){
                    current_mod = '1900-01-01 12:00:00';
                    action = 'add';
                }
                /*
                Updated with live pull from server
                http://restapi.clubappetite.com/api.php?controller=api&action=infopage&name=faq
                */
                URL += '&token=' + token + '&last_mod=' + current_mod;

                //if(debug) { console.log("Data in state(_this.state):",_this.state);}
                if(debug) { console.log("API URL:",URL);}
                if(debug) { console.log("API token:",token);}
                if(debug) { console.log("API current_mod:",current_mod);}
                /*
                we check server for newer version
                if response is false we have current version
                */


                fetch(URL, {
                    method: 'GET',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    //body: JSON.stringify({
                       //token: token,
                       //last_mod: current_mod
                   // })
                })
                .then((response) => response.json())
                .then((responseData) => {

                    if(responseData.result == 'error'){
                        console.log(_page_name + ' API ERROR:',responseData);
                    } else if(responseData.result == 'update'){


                        var resArray = {
                            name: _page_name,
                            text: responseData.text,
                            page_title: responseData.page_title,
                            logo: responseData.logo,
                            last_mod: responseData.current_mod
                        }

                        if(action == 'update'){
                            DB.infopage.update({name: _page_name }, resArray, function(updated_table){

                                if(debug) { console.log(_page_name+' update succeeded',updated_table.infopage);}
                                _this.setState({htmlText: responseData.text, pageName:responseData.page_title, logo:responseData.logo });
                            });
                        } else {
                            DB.infopage.add(resArray, function(updated_table){
                                if(debug) { console.log(_page_name + ' add succeeded',updated_table);}
                                //if(debug) { console.log(_page_name + ' date:', responseData.current_mod);}
                                _this.setState({htmlText: responseData.text, pageName:responseData.page_title, logo:responseData.logo });
                            });
                        }

                    } else if(responseData.result == 'nochanges'){
                         if(debug) { console.log(_page_name+' nochanges', responseData);}
                         _this.setState({htmlText: initText.text, pageName:initText.page_title, logo:initText.logo});
                    } else {
                         console.log(_page_name+' responseData failed(update)', responseData);
                         _this.setState({htmlText: initText.text, pageName:initText.page_title, logo:initText.logo});
                    }



                })
                .catch(function(error) {
                    console.log(_page_name+' unknown failure(update):', error);
                })
                .done();


            })
        //}

    },


}