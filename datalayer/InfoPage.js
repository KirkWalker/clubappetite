var { View } = require('react-native')

var DB = require('./DB');


module.exports = {

    getFaqPageData(_this) {
        DB.infopage.get_all(function(result){


            //console.log(result);
            _this.setState({count: result.totalrows, dataObj: result});
        })
    },

    getTermPageData(_this) {
        DB.infopage.get_all(function(result){



            //console.log(result);
            _this.setState({count: result.totalrows, dataObj: result});
        })
    }

}