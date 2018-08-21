var mongoose = require('mongoose');

// dersprogrami Schema
let GrupSchema = mongoose.Schema({
    programId:{
        type: String,
        index: true
    },
    interval: {
		  type: Number
    },
    gun:{
      type:Number
    },
    saat:{
      type:Number
    }

}, {collection: 'Duyuru'});

var Duyuru = module.exports = mongoose.model('Duyuru', GrupSchema);
