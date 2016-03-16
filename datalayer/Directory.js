var { View } = require('react-native')

var DB = require('./DB');

var debug = true;
var SERVER_URL = 'http://restapi.clubappetite.com/api.php';
var _page_name = 'Directory';

module.exports = {



    getDirectoryData(_this) {


        /*
        Check to see if the datalayer has latest bersion of sponsors
        If a record exists in the local datalayer we skip ahead and set the state
        with the result set
        */


        DB.directory.get_all(function(results){

            if(results.totalrows == 0){ // no data in local datalayer

        /*

        leave this for now, it requires tokens which need this feature merged with development.

                var token = _this.state.user_profile.token;
                var initText = '';
                var current_mod = '1900-01-01 12:00:00';
                var URL = SERVER_URL + '?controller=api&action=sponsors&last_mod='+current_mod+'&token='+token;


                console.log(_page_name+' DB records found:', URL);


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

                            if(debug) { console.log(_page_name+' success', responseData);}
                            delete responseData.result;

                            if(responseData.code == 'refresh') {
                                delete responseData.code;
                                DB.directory.add(responseData,function(result){
                                    if(debug) {
                                       console.log('adding directory listings');
                                       console.log(result);
                                    }

                                   //_this.setState({
                                    // dataSource: _this.state.dataSource.cloneWithRows(DirectoryData),
                                    // loaded: true,
                                   //});

                                });
                            } else {
                                console.log('data is up to date ');

                            }

                        } else {
                             console.log(_page_name+' responseData failed(update)', responseData);
                        }



                })
                .catch(function(error) {
                    console.log(_page_name+' unknown failure(update):', error);
                })
                .done();
          */


            } else {

                var nk = [];
                for(var key in results.rows){
                    nk.push(results.rows[key]);
                }
                //DB.directory.erase_db(function(removed_data){
                   //console.log('Directory: remove data result');
                  // console.log(removed_data);
                   //console.log('------------------');
                // });
                //console.log(_page_name+' records found:', nk[0].details);
                _this.setState({
                    dataSource: _this.state.dataSource.cloneWithRows(nk[0].details),
                    loaded: true,
                });

            }

        });


    }


}