var { View } = require('react-native')

var DB = require('./DB');


module.exports = {


    getUserImage() {


        return 'here';


    },
    getUserData() {
        DB.users.get_all(function(result){
            console.log(result);
            return result;
        })
    },





}