const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {type:String, required:true},
  username: {type:String, required:true, unique:true},
  email: {type:String, reqired:true, unique:true},
  password: {type:String, required:true}
}, {timestamps: true});

var User = mongoose.model('User', UserSchema);

module.exports = User;
