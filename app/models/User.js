'use strict';

var users = global.nss.db.collection('users');
var bcrypt = require('bcrypt');
var Mongo = require('mongodb');

class User{
  constructor(obj){
    this.email = obj.email;
    this.password = obj.password;
  }

  static findByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);
    users.findOne({_id: userId}, (err, user)=>{
      fn(user);
    });
  }

  login(fn){
    users.findOne({email: this.email}, (err, user)=>{
      if(user){
        var isMatch = bcrypt.compareSync(this.password, user.password);
        if(isMatch){
          fn(user);
        } else {
          fn(null);
        }
      } else {
        this.password = bcrypt.hashSync(this.password, 8);
        users.save(this, (err, user)=>{
          fn(user);
        });
      }
    });
  }

}

module.exports = User;
