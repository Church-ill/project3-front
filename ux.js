'use strict';

var ux = {

  login: function(){
    $('#main-product-page').hide();
    $('#single-product-page').hide();
  },

  skipLogin: function(){
    $('#login-overlay').hide();
    $('#main-product-page').show(500);
    $('#single-product-page').hide();
  },

  afterLogin: function(){
    $('#login-overlay').hide();
    $('#main-product-page').show(500);
    $('#single-product-page').hide();
  },

  singleProductPage: function(){
    $('#login-overlay').hide();
    $('#main-product-page').hide();
    $('#single-product-page').show(500);
  }


};
