var { View } = require('react-native')

var DB = require('./DB');


module.exports = {



    getSponsorData(_this) {
        DB.messages.get_all(function(result){
            //console.log(result);
            _this.setState({count: result.totalrows, dataObj: result});
        })
    }





}