const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./app_server/model/user');

var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sakbisapp');
var db = mongoose.connection;


var app = express();
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');

const http = require('http');

//Public Folder
app.use(express.static(path.join(__dirname, 'public')));

//View-Engine
app.set('view engine', 'ejs'); // Kullandığım görüntü motorunu belirttim
app.set('views', path.join(__dirname, './app_server/views')); //Görüntüleri oluşturacağım klasörümün konumunu bildirdim

//BodyParser
app.use(bodyParser.urlencoded({ extended: false })); // reuest objesini kullanabileceğimiz forma getirecek
app.use(bodyParser.json());
app.use(cookieParser());
app.use(ejsLayouts);// ejs-layoutsu ekle

//Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
          , root      = namespace.shift()
          , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
}));

//Strategy'yi belirledim
passport.use(new LocalStrategy(
	function (username, password, done) {
		User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Tanımsız Kullanıcı' });
			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Yanlış Parola.' });
				}
			});
		});
	}));

passport.serializeUser(function (user, done) {
    console.log('serialize -- - -- buraya geldim')
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log('deserialize -- - -- buraya geldim')
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});

//Connect Flash
app.use(flash());

//Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null; //kullanıcın bilgilerini gönderiyor
  next();
});

console.log("Server Started at port 80");
require(path.join(__dirname, './app_server/routes/ManagerRoute.js'))(app);//ManagerRoute (Uygulamadaki Tüm Yönlendiriceler) Ekleniyor




http.Server(app).listen(80); // make server listen on port 80