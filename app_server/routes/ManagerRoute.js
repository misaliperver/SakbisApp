// Uygulamadaki Tüm Yönlendiriciler bu Klasörde Olacak
var path = require('path');

var anaRoute = require(path.join(__dirname, './AnaRoute.js')); // Yönlendirici modulüm ile controllere ulaşıp oradanda sayfalarımı yayınayacağım MVC gibi düşün
var loginRoute = require(path.join(__dirname, './LoginRoute.js'));
var privateRoute = require(path.join(__dirname, './PrivateRoute.js'));

module.exports = function(app){
    app.use('/L', loginRoute);

    app.use('/userApp', LoginOldumu , privateRoute);
    
    app.use('/', anaRoute); // req '/' olduğunda bizim kurduğumuz route nesenesine gidecek
                        // Burada login işlenleri için  app.use('/login', Loginroute); olabilirdi

   
}
function LoginOldumu(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/L/giris');
	}
}