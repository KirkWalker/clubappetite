var RNDBModel = require('react-native-db-models')

var DB = {

    "users": new RNDBModel.create_db('users'),
    "banner_ads": new RNDBModel.create_db('banner_ads'),
    "directory": new RNDBModel.create_db('directory'),
    "products": new RNDBModel.create_db('products'),
    "messages": new RNDBModel.create_db('messages'),
    "infopage": new RNDBModel.create_db('infopage'),
    "deals": new RNDBModel.create_db('deals'),
}

module.exports = DB