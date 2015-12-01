'use strict';

var ux = {

  login: function(){
    $('#main-product-page').hide();
    $('#single-product-page').hide();
    $('#shop-cart').hide(500);
  },

  skipLogin: function(){
    $('#login-overlay').hide();
    $('#main-product-page').show(500);
    $('#single-product-page').hide();
    $('#shop-cart').hide(500);
  },

  afterLogin: function(user){
    $('#login-overlay').hide();
    $('#main-product-page').show(500);
    $('#single-product-page').hide();
    $('#shop-cart').hide(500);
    $('.loginMessage').show(500);
    console.log(user);
    console.log("Got user");
  },

  singleProductPage: function(){
    $('#login-overlay').hide();
    $('#main-product-page').hide();
    $('#single-product-page').show(500);
    $('#shop-cart').hide(500);
  },

  cartPage: function(){
    $('#login-overlay').hide();
    $('#main-product-page').hide();
    $('#single-product-page').hide();
    $('#shop-cart').show(500);
  }

};
