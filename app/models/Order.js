'use strict';

// var users = global.nss.db.collection('users');
var dishes = global.nss.db.collection('dishes');
var orders = global.nss.db.collection('orders');
var Mongo = require('mongodb');
var moment = require('moment');
// var async = require('async');

class Order{
  constructor(data, userId){
    this.userId = userId;
    this.date = moment().format('MMM Do YYYY');
    this.meal = [];
  }

  static findByUserId(userId, fn){
    orders.find({userId: userId}).toArray((err, orders)=>{
      fn(orders);
    });
  }

  save(fn){
    orders.save(this, ()=>fn());
  }

  findMealFoods(data, fn){

    if(!Array.isArray(data.qty)){

      var dishId = data.dishId;
      dishId = Mongo.ObjectID(dishId);
      dishes.find({_id: dishId}).toArray((err, dishes)=>{
        fn(dishes);
      });

    } else {

      var dishIds = data.dishId;

      for(var i = 0; i < dishIds.length; i++){
        dishIds[i] = Mongo.ObjectID(dishIds[i]);
      }

      dishes.find({_id: { $in: dishIds }}).toArray((err, dishes)=>{
        fn(dishes);
      });
    }
  }

  buildMealArray(data, dishes, fn){

    for(var i = 0; i < data.qty.length; i++){
      var item = {};
      item.qty = data.qty[i];
      item.food = dishes[i];
      this.meal.push(item);
    }
    fn(this.meal);
  }

  calculateTotalCost(data){
    var totalCost = 0;

    for(var i = 0; i < data.length; i++){
      var qty = parseFloat(data[i].qty);

      var price = parseFloat(data[i].food.cost);

      var subtotal = qty * price;
      totalCost += subtotal;
    }
    return totalCost.toFixed(2);
  }

  calculateTotalCalories(data){
    var totalCals = 0;
    for(var i = 0; i < data.length; i++){
      var itemCals = parseFloat(data[i].food.calories);
      var itemQty = parseFloat(data[i].qty);
      var subCals = itemCals * itemQty;
      totalCals += subCals;
    }
    return totalCals;
  }

}

module.exports = Order;
