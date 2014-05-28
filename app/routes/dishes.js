'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');
//var User = traceur.require(__dirname + '/../models/user.js');

exports.menu = (req, res)=>{
  Dish.findByMenu(req.params.menu, dishes=>{
    res.render('dishes/menu', {dishes:dishes});
  });
};
