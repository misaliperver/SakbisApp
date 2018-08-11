var path = require('path');
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../model/user');

var router = express.Router();
var loginController = require(path.join(__dirname, '../controller/Login.js'));


router.use(function(req, res, next){
    console.log('Middleware --> LoginRoute');
    next();
});

router.get(   '/giris'    , LoginOldumu2 , loginController.get_Giris);
router.get(   '/kayitol'  , LoginOldumu2 , loginController.get_KayitOl);
router.post(  '/kayitol'  , LoginOldumu2 , loginController.post_KayitOl);
router.post(  '/giris'    , passport.authenticate('local', { successRedirect: '/', failureRedirect: '/L/giris', failureFlash: true }), loginController.post_Giris);
router.get(   '/cikis'    , loginController.get_Cikis);

function LoginOldumu2(req, res, next){
	if(req.isAuthenticated()){
		res.redirect('/');
	} else {
		return next();
	}
}

module.exports = router;