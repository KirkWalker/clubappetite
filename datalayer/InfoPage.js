var { View } = require('react-native')

var DB = require('./DB');

var debug = false;
var SERVER_URL = 'http://appdev.appsolutemg.com/api.php';

module.exports = {

    getPageData(_this, _page_name) {

        DB.infopage.get({name: _page_name}, function(result){

            var initText = '';

            if(!result[0]){

                if(debug) { console.log("inserting " + _page_name + " data"); }
                /*
                Updated with live pull from server
                http://appdev.appsolutemg.com/api.php?controller=api&action=infopage&name=faq
                */

                var _token = _this.state.user_profile.token;

                fetch(SERVER_URL + '?controller=api&action=infopage&name='+_page_name, {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: _token,
                        last_mod: '1900-01-01 12:00:00'
                    })
                })
                .then((response) => response.json())
                .then((responseData) => {

                    if(responseData.result == 'error'){
                        console.log(_page_name + ' API ERROR:',responseData);
                    } else if(responseData.result == 'update'){


                        if(debug) { console.log('responseData succeeded', responseData);}
                        var resArray = {name: _page_name, last_mod: responseData.current_mod, text: responseData.text}
                        if(debug) { console.log('inserting: ', resArray);}

                        DB.infopage.add(resArray, function(updated_table){
                            if(debug) { console.log(_page_name + ' add succeeded',updated_table);}
                            if(debug) { console.log(_page_name + ' date:', responseData.current_mod);}
                            _this.setState({htmlText: responseData.text});
                        })

                    } else {
                        console.log(_page_name + ' responseData failed(add)', responseData);
                    }
                })
                .catch(function(error) {
                    console.log(_page_name + ' unknown failure (add)', error);
                })
                .done();

            } else {

                initText = result[0];
                if(debug) { console.log("FAQ data in db(initText):",initText);}
                //if(debug) { console.log("FAQ data in state(_this.state):",_this.state);}

                /*
                we check server for newer version
                if response is false we have current version
                */
                var _last_mod = initText.last_mod;
                var _token = _this.state.user_profile.token;

                fetch(SERVER_URL + '?controller=api&action=infopage&name='+_page_name, {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                       token: _token,
                       last_mod: _last_mod
                    })
                })
                .then((response) => response.json())
                .then((responseData) => {

                    if(responseData.result == 'error'){
                        console.log(_page_name + ' API ERROR:',responseData);
                    } else if(responseData.result == 'update'){
                        DB.infopage.update({name: _page_name }, {text: responseData.text, last_mod: responseData.current_mod}, function(updated_table){
                        	if(debug) { console.log(_page_name+' update succeeded',updated_table.infopage.rows);}
                        	_this.setState({htmlText: responseData.text});
                        })
                    } else if(responseData.result == 'nochanges'){
                         if(debug) { console.log(_page_name+' nochanges', responseData);}
                        _this.setState({htmlText: initText.text});
                    } else {
                         console.log(_page_name+' responseData failed(update)', responseData);
                    }

                })
                .catch(function(error) {
                    console.log(_page_name+' unknown failure(update):', error);
                })
                .done();

            }
        })


    },


}