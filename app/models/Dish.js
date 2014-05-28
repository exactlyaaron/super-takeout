'use strict';

var dishes = global.nss.db.collection('dishes');
var _ = require('lodash');

class Dish{
  static findAll(fn){
    dishes.find().toArray((err, dishes)=>{
      fn(dishes);
    });
  }

  static menu(fn){
    Dish.findAll(dishes=>{
      var menus = _(dishes).map(d=>d.menu).uniq().value();
      fn(menus);
    });
  }

  static findByMenu(menuType, fn){
    dishes.find({menu:menuType}).toArray((err, dishes)=>{
      fn(dishes);
    });
  }
}

module.exports = Dish;
