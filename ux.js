'use strict';

var ux = {

  login: function(){
    $('#login-overlay').show();
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

  afterLogin: function(){
    $('#login-overlay').hide();
    $('#main-product-page').show(500);
    $('#single-product-page').hide();
    $('#shop-cart').hide(500);
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
