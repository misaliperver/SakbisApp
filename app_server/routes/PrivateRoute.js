var path = require('path');
var express = require('express');
var Matris = require('../model/dersprogrami');

var router = express.Router();
var privateController = require(path.join(__dirname, '../controller/Private.js'));


router.use(function(req, res, next){
    console.log('MiddleWare --> PrivateRoute' + req.url);
    next();
});

//dersprogramı
router.get('/dersprogramivarmi', privateController.get_Ajax_dersProgramiEkle);
router.get('/dersprogramiekle' , privateController.get_dersProgramiEkle);
router.put('/dersprogramiekle' , privateController.put_Ajax_dersProgramiEkle);
router.put('/aciklamaekle' , privateController.put_Ajax_aciklamaEkle);
//grup
router.get('/grup', privateController.get_dersProgramGrubIndex);
router.get('/grup/olustur', privateController.get_dersProgramGrubOlustur);
router.post('/grup/olustur', privateController.post_dersProgramGrubOlustur);
router.get('/grup/:programID',privateController.get_dersProgramGrubIdIndex);
router.post('/grup/:programID',privateController.post_dersProgramGrubIdIndex);
router.delete('/grup/:programID',privateController.delete_dersProgramGrubIdIndex);


router.get('/searchtoPeer/:peerID',privateController.get_searchtoPeer);
router.get('/profil', privateController.get_profil);
router.get('/profil/ayarlar', privateController.get_profilAyarlar);
router.post('/profil/ayarlar', privateController.post_profilAyarlar);
router.get('/profil/duyuru',privateController.get_duyuru);


router.get('/search/', privateController.get_ProfilOtherID);


module.exports = router;
