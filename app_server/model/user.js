var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	ad: {
		type: String
    },
    soyad: {
		type: String
    },
    yas: {
		type: String
	},
	userimg: {
		type: String
	},
	telno: {
		type: String
	},
	cinsiyet: {
		type: String
	},
	unibolum: {
		type: String
	},
	bio: {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);


module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}


module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.getUserBylimit = function(lim, callback){
	User.find({},{ username: 1, ad: 1, soyad: 1, userimg:1 },callback).sort({_id:-1}).limit(lim);
}
module.exports.getPeer = function(id, callback){
	User.find({"username" : {$regex : id}}, { username: 1} , callback).sort({_id:-1}).limit(10);
}
module.exports.getPeerUserByID = function(username, callback){
	var query = {username: username};
	User.findOne(query, {username:1, ad:1, soyad:1, email:1, yas:1, userimg:1, bio:1, cinsiyet:1, telno:1, unibolum:1} , callback);
}


module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
});
}