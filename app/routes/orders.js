/* jshint unused:false */
'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');
var User = traceur.require(__dirname + '/../models/user.js');
var Order = traceur.require(__dirname + '/../models/order.js');

exports.new = (req, res)=>{
  Dish.menu(menus=>{
    User.findByUserId(req.session.userId, user=>{

      debugger;

      res.render('orders/new', {menus: menus, user: user, title: 'Order Food'});
    });
  });
};

exports.create = (req, res)=>{
  var order = new Order(req.body, req.session.userId);
  order.findMealFoods(req.body, dishes=>{
    order.buildMealArray(req.body, dishes, meal=>{
      order.totalCost = order.calculateTotalCost(meal);
      order.totalCalories = order.calculateTotalCalories(meal);
      order.save(()=>{
        Order.findByUserId(req.session.userId, orders=>{
          res.render('users/history', {orders: orders, title: 'Order History'});
        });
      });
    });
  });
};
