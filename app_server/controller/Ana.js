var path = require('path'); //path modülünü ekledik
var User = require('../model/user');

module.exports.get_AnaSayfa = function(req, res){
    var limit = 5;
   User.getUserBylimit(limit,function(err, kullanicilar){
       if(kullanicilar){   
           console.log(kullanicilar)      
           res.render('anasayfa', {kullanicilar: kullanicilar});
        }
   })
   
}
module.exports.get_Hakkimizda = function(req, res){
    res.render('hakkimizda');
 }


