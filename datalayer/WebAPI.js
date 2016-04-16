var {View} = require('react-native');
var DB = require('./DB');

var SERVER_URL = 'http://restapi.clubappetite.com/api.php?controller=api&action=';
var _page_name = '';
var database;
var InfoStore = {};
var listView = false;

var DEBUG = true;
if (DEBUG) { console.log('WebAPI DEBUG flag is set\n---------------------------'); }

InfoStore.getData = function(_this, db) {
	var self = this;
	var current_mod = '1900-01-01 12:00:00';
	_page_name = db;
	database = DB.get(db);

	/*
	 * if-statement keeps this from firing multiple times.
	 *
	 * Check to see if the datalayer has the latest version of the
	 * requested information. If a record exists in the local datalayer
	 * we skip ahead and set the state with the result set.
	 */
	if (_this.mounted === true) {
		database.get_all(function(results) {
			var token = _this.state.user_profile.token;
			
			// If there is no data in the local datalayer
			if(results.totalrows == 0) {
				if(token != undefined) {
					self.fetchData(_this, token, current_mod, '');
				}
			}
			else {
				var nk = [];
				for(var key in results.rows) {
					nk.push(results.rows[key]);
				}

				current_mod = nk[0].max_mod;
				if(token != undefined) {
					self.fetchData(_this, token, current_mod, nk);
				}
			}
		});
	}
};

InfoStore.fetchData = function(_this, token, current_mod, data) {
	// if the data is to be used in a ListView, this needs to be set to true
	if (_page_name == "messages" || _page_name == "sponsors") { listView = true; }
	else { listView = false; }

	var URL = SERVER_URL + _page_name + '&last_mod=' + current_mod + '&token=' + token;
	if (DEBUG) { console.log(_page_name + ' fetchData: ', URL); }

	// if-statement to keep this from firing multiple times.
	if (_this.mounted === true) {
		fetch(URL, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
		.then((response) => response.json())
		.then((responseData) => {

			/* If the responseData returns an error */
			if(responseData.result == 'error') {
				console.log(_page_name + ' API ERROR: ', responseData);
			}

			/* If the responseData returns a successful result */
			else if (responseData.result == 'success') {
				delete responseData.result;

				if (responseData.code == 'refresh') {
					delete responseData.code;

					// If this is the first time, we create the table
					if (current_mod == '1900-01-01 12:00:00') {
						database.add(responseData, function(result) {
							if (DEBUG) {
								console.log(_page_name + ' Adding ' + _page_name);
								console.log(result);
								console.log(_page_name + ' Setting state: ', responseData.details);
							}

							// Puts the data into a dataSource so that it can be displayed in a ListView
							if (listView) {
								_this.setState({
									dataSource: _this.state.dataSource.cloneWithRows(responseData.details),
									searchResults: _this.state.searchResults.cloneWithRows(responseData.details),
									loaded: true,
								});
							}
							// If a ListView isn't being used, the data is put into an array
							else {
								_this.setState({
									DataArray: responseData.details,
									searchResults: responseData.details,
									loaded: true,
								});
							}
						});
					}
					// If not, we update the table instead
					else {
						database.update(
							{ max_mod: current_mod },
							{ details: responseData.details, max_mod: responseData.max_mod },
							function(updated_table) {
								if (DEBUG) {
									console.log(_page_name + ' Updating ' + _page_name);
									console.log(updated_table.database);
									console.log(_page_name + ' Setting state:', responseData.details);
								}

								// Puts the data into a dataSource so that it can be displayed in a ListView
								if (listView) {
									_this.setState({
										dataSource: _this.state.dataSource.cloneWithRows(responseData.details),
										searchResults: _this.state.searchResults.cloneWithRows(responseData.details),
										loaded: true,
									});
								}
								// If a ListView isn't being used, the data is put into an array
								else {
									_this.setState({
										DataArray: responseData.details,
										searchResults: responseData.details,
										loaded: true,
									});
								}
							}
						);
					}
				}
				else {
					if (DEBUG) {console.log(_page_name + ' data is up to date2 ', data[0].details); }

					// Puts the data into a dataSource so that it can be displayed in a ListView
					if (listView) {
						if (_this.state.dataSource != undefined) {
							_this.setState({
								dataSource: _this.state.dataSource.cloneWithRows(data[0].details),
								searchResults: _this.state.searchResults.cloneWithRows(data[0].details),
								loaded: true,
							});
						}
					}
					// If a ListView isn't being used, the data is put into an array
					else {
						var newArray = [];
						var resultset = data[0].details;
						for (var key in resultset) {
							newArray.push(resultset[key]);
						}

						_this.setState({
							DataArray: data[0].details,
							searchResults: data[0].details,
							loaded: true,
						});
					}
				}
			}

			/* If the responseData returns any other result */
			else {
				console.log(_page_name + ' responseData failed(update)', responseData);
			}
		})
		.catch(function(error) {
			console.log(_page_name + ' unknown failure(update): ', error);
		})
		.done();
	}
};

/*
 * Used only in the DealConfirm page. Called when the user redeems points by
 * selecting a deal offered by a sponsor. 
 */
InfoStore.confirmDeal = function (_this) {
	var _token = _this.state.user_profile.token;
	var _amount = _this.props.deal_info.deal_price;
	var _id = _this.props.deal_info.id;

	var _user_profile = _this.state.user_profile;
  var _user_points = _user_profile.user_points;
  var _new_user_points = _user_points - _amount;

  _user_profile.user_points = _new_user_points;

  var URL = SERVER_URL + 'confirmdeal';
  _page_name = 'confirmDeal';

  if (DEBUG) { console.log(_page_name + ' fetchData: ', URL); }

  fetch(URL, {
  	method: 'POST',
  	headers: {
  		'Accept': 'application/json',
  		'Content-Type': 'application.json',
  	},
  	body: JSON.stringify({
  		token: _token,
  		amount: _amount,
  		deal_id: _id,
  	})
  })
  .then((response) => response.json())
  .then((responseData) => {

  	if(responseData.result == 'error') {
  		if (DEBUG) { console.log(_page_name + ' API ERROR: ', responseData); }
  	}
  	else if (responseData.result == 'success') {
  		if (DEBUG) { console.log(_page_name + ' API SUCCESS: ', responseData); }

		DB.users.update({name: _user_profile.name}, { user_points: _new_user_points }, function(updated_table){

			_this.setState({user_profile: _user_profile,
				blnDoneTransaction: true,
				strTransDetails: responseData.result
			});

			if(DEBUG) { console.log('done updating users:', updated_table); }
		})




  	}
  	else {
  		if (DEBUG) { console.log(_page_name + ' reponseData failed(update)', reponseData); }
  	}
  })
  .catch(function(error) {
  	console.log(_page_name + ' Network failure. Is the server offline?');
  	console.log('ERROR: ', error);
  })
  .done();
}

module.exports = InfoStore;