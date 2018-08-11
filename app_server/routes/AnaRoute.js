var path = require('path');
var express = require('express');

var router = express.Router();
var anaController = require(path.join(__dirname, '../controller/Ana.js'));


router.use(function(req, res, next){
    console.log('MiddleWare --> AnaRoute');
    next();
});

router.get('/', anaController.get_AnaSayfa);
router.get('/Hakkimizda', anaController.get_Hakkimizda);

module.exports = router;