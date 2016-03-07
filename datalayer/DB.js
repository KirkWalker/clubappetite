var RNDBModel = require('react-native-db-models')

var DB = {
    "banner_ads": new RNDBModel.create_db('banner_ads'),
    "users": new RNDBModel.create_db('users'),
}

module.exports = DB