var mongoose = require('mongoose');

// dersprogrami Schema
var MatrisSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
    matris: {
		type: Array
    },
    date: {
		type: Date
    },
    private: {
		type: Boolean
	}
}, {collection: 'matris'});

var Matris = module.exports = mongoose.model('Matris', MatrisSchema);

module.exports.createDersProgrami = function(newDersProgrami, callback){
	newDersProgrami.save(callback);
}
module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	Matris.findOne(query, callback);
}
module.exports.getUserById = function(id, callback){
	Matris.findById(id, callback);
}