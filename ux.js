'use strict';

var ux = {

  login: function(){
    $('#main-product-page').hide();
  },

  skipLogin: function(){
    $('#login-overlay').hide();
    $('#main-product-page').show(500);
  },

  afterLogin: function(){
    $('#login-overlay').hide();
    $('#main-product-page').show(500);
  },

  mainProductPage: function(){}


};
