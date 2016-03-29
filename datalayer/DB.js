var RNDBModel = require('react-native-db-models')

var DB = {

    "users": new RNDBModel.create_db('users'),
    "banner_ads": new RNDBModel.create_db('banner_ads'),
    "sponsors": new RNDBModel.create_db('sponsors'),
    "products": new RNDBModel.create_db('products'),
    "messages": new RNDBModel.create_db('messages'),
    "infopage": new RNDBModel.create_db('infopage'),
    "sponsordeals": new RNDBModel.create_db('sponsordeals'),
}

DB.get = function(database) {
	switch(database) {
		case "users":
			return DB.users;
			break;
		case "banner_ads":
			return DB.banner_ads;
			break;
		case "sponsors":
			return DB.sponsors;
			break;
		case "products":
			return DB.products;
			break;
		case "messages":
			return DB.messages;
			break;
		case "infopage":
			return DB.infopage;
			break;
		case "sponsordeals":
			return DB.sponsordeals;
			break;
	}
};

module.exports = DB