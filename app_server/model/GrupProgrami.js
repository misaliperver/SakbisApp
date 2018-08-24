var mongoose = require('mongoose');

// dersprogrami Schema
var GrupSchema = mongoose.Schema({
    programId:{
        type: String,
        index: true
    }, 
    from: {
      type: String
    },    
    title: {
      type: String
    },
    issue: {
	  	type: String
    },
    startTime: {
		  type: Date
    },
    finishTime: {
		  type: Date
    },
    people: {
		  type: Array
    },
    interval: {
		  type: Number
    },
    secret: {
		  type: Boolean
	}
}, {collection: 'Grup'});

var Grup = module.exports = mongoose.model('Grup', GrupSchema);

module.exports.createGrupProgrami = function(newGrup, callback){
	newGrup.save(callback);
}
module.exports.getGrupByProjectId = function(grupID, callback){
  var query = {programId: grupID};
	Grup.findOne(query, callback);
}
module.exports.removeGrupByProjectId = function(grupID, callback){
  var query = {programId: grupID};
	Grup.remove(query, callback);
}
module.exports.getGrupByUsername = function(username, callback){
  var query = {from: username};
	Grup.find(query,callback)
}
module.exports.getGrupbyIDandSecret= function(id, callback){
	Grup.find({"programId" : {$regex : id}, "secret": false},{programId:1, title:1}, callback).sort({_id:-1}).limit(10);
}
module.exports.getGrupLimit= function(callback){
	Grup.find({},{programId:1, title:1, issue:1}, callback).sort({_id:-1}).limit(10);
}
