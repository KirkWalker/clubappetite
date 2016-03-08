var { View } = require('react-native')

var DB = require('./DB');


module.exports = {



    getDirectoryData(_this) {
        DB.directory.get_all(function(result){
            //console.log(result);
            _this.setState({count: result.totalrows, dataObj: result});
        })
    }





}