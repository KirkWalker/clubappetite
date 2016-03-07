var { View } = require('react-native')

var DB = require('./DB');
var resultData;

module.exports = {



    getAdData(_this) {
        DB.banner_ads.get_all(function(result){
            //console.log(result);
            resultData = result;
            _this.setState({count: result.totalrows, dataObj: result});
            //return result;
        })
    },
    getResult(){
        return this.resultData;
    }






}