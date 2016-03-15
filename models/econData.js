var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var econDataSchema= new Schema({
  name: {
    type: String,
  },
  link:{
    type:String
  },
  notes: [{
    type: Schema.Types.ObjectID, 
    ref: 'notes'
  }]
});

var econData = mongoose.model('econData', econDataSchema);
module.exports = econData;

