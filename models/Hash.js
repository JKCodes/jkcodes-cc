var mongoose = require('mongoose');

var HashSchema = new mongoose.Schema({
  word: {type:String, default:''},
  hash: {type:String, default:''},
  timestamp: {type:Date, default:Date.now}
});

module.exports = mongoose.model('HashSchema', HashSchema);