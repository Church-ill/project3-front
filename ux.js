'use strict';

var ux = {

  login: function(){
    $('#login-overlay').show();
    $('#main-product-page').hide();
    $('#single-product-page').hide();
    $('#shop-cart').hide(500);
    $('#trans-hist').hide(500);
  },

  showTopNavBar: function() {
    $('.top-nav-bar').css('visibility', 'visible');
  },

  skipLogin: function(){
    $('#login-overlay').hide();
    ux.showTopNavBar();
    $('#main-product-page').show(500);
    $('#single-product-page').hide();
    $('#shop-cart').hide(500);
    $('#trans-hist').hide(500);
  },

  afterLogin: function(){
    $('#login-overlay').hide();
    ux.showTopNavBar();
    $('#main-product-page').show(500);
    $('#single-product-page').hide();
    $('#shop-cart').hide(500);
    $('#trans-hist').hide(500);
  },

  singleProductPage: function(){
    $('#login-overlay').hide();
    ux.showTopNavBar();
    $('#main-product-page').hide();
    $('#single-product-page').show(500);
    $('#shop-cart').hide(500);
    $('#trans-hist').hide(500);
  },

  cartPage: function(){
    $('#login-overlay').hide();
    ux.showTopNavBar();
    $('#main-product-page').hide();
    $('#single-product-page').hide();
    $('#shop-cart').show(500);
    $('#trans-hist').hide(500);
  },

  histPage: function(){
    $('#login-overlay').hide();
    ux.showTopNavBar();
    $('#main-product-page').hide();
    $('#single-product-page').hide();
    $('#shop-cart').hide(500);
    $('#trans-hist').show(500);
  },

};
