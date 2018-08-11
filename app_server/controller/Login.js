var passport = require('passport');
var User = require('../model/user');

module.exports.get_Giris = function(req, res){
   console.log(req.url) 
   res.render('Login/giris');
}
module.exports.get_KayitOl = function(req, res){
    res.render('Login/kayitol');
}


module.exports.post_KayitOl = function(req, res){
    var ad     = req.body.ad;
    var soyad  = req.body.soyad;
    var yas    = req.body.yas;
	var email  = req.body.email;
	var username = req.body.okulno;
	var sifre  = req.body.sifre;
    var sifre2 = req.body.sifre2;

	// Validation
    req.checkBody('ad', 'Ad kısmı boş bırakılmamalıdır.').notEmpty();
    req.checkBody('soyad', 'Soyad kısmı boş bırakılmamalıdır.').notEmpty();
    req.checkBody('email', 'Email kısmı boş bırakılmamalıdır.').notEmpty();
    req.checkBody('yas', 'Yas kısmı boş bırakılmamalıdır.').notEmpty();
	req.checkBody('email', 'Email uygun bulunmadı.').isEmail();
	req.checkBody('okulno', 'Okulno kısmı boş bırakılmamalıdır.').notEmpty();
	req.checkBody('sifre', 'Sifre kısmı boş bırakılmamalıdır.').notEmpty();
    req.checkBody('sifre2', 'Sifreler birbiri ile uyumsuz.').equals(req.body.sifre);
  
        
    var hatalar = req.validationErrors();
    if(username.length!=10) 
        hatalar.push({param:'okulno',msg:'Bu bir okul numarası olmayabilir.', value:''})
	if (hatalar) {
		res.render('Login/kayitol', {
			hatalar: hatalar
		});
	}
	else {
		//checking for email and username are already taken
		User.findOne({ username: { 
			"$regex": "^" + username + "\\b", "$options": "i"
	        }}, function (err, user) {
                    User.findOne({ email: { 
                        "$regex": "^" + email + "\\b", "$options": "i"
		        }}, function (err, mail) {
                        if (user || mail) {
                            res.render('Login/kayitol', {
                                user: user,
                                mail: mail
                            });
				        }
                        else {
                            var newUser = new User({
                                ad: ad,
                                soyad: soyad,
                                email: email,
                                yas: yas,
                                username: username,
                                password: sifre
                            });
					        User.createUser(newUser, function (err, user) {
                            if (err) throw err;
                            console.log(user);
					        });
                            req.flash('success_msg', 'You are registered and can now login');
                            res.redirect('/L/giris');
                        }
			});
		});
	}
}

module.exports.post_Giris = function(req, res){
    res.redirect('/');
}

module.exports.get_Cikis = function (req, res) {
	req.logout();

	//req.flash('success_msg', 'You are logged out');..

	res.redirect('/L/giris');
}