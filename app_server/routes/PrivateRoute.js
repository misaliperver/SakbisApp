var path = require('path');
var express = require('express');
var Matris = require('../model/dersprogrami');

var router = express.Router();
var privateController = require(path.join(__dirname, '../controller/Private.js'));


router.use(function(req, res, next){
    console.log('MiddleWare --> PrivateRoute');
    next();
});

//dersprogramı
router.get('/dersprogramivarmi', privateController.get_Ajax_dersProgramiEkle);
router.get('/dersprogramiekle' , privateController.get_dersProgramiEkle);
router.put('/dersprogramiekle' , privateController.put_Ajax_dersProgramiEkle);
//grup
router.get('/grup', privateController.get_dersProgramGrubIndex);
router.get('/grup/olustur', privateController.get_dersProgramGrubOlustur);
router.post('/grup/olustur', privateController.post_dersProgramGrubOlustur);
router.get('/grup/:programID',privateController.get_dersProgramGrubIdIndex);

router.get('/profil', privateController.get_profil);


module.exports = router;