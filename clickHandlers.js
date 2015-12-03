'use strict';

var form2object = function(form) {
  var data = {};
   $(form).find("input").each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
       data[$(this).attr('name')] = $(this).val();
      }
   });
  return data;
};

var wrap = function(root, formData) {
  var wrapper = {};
  wrapper[root] = formData;
  return wrapper;
};


$(document).ready(function() {

  ux.login();
  cb.init();

  //Login Actions//

  $('#registerForm').on('submit', function (e) {
    var credentials = form2object(this);
    api.register(credentials, cb.registerCB);
    $(".form-control").val('');
    e.preventDefault();
  });

  $('#loginForm').on('submit', function (e){
    var credentials = form2object(this);
    console.log("creds:", credentials);
    api.login(credentials, cb.loginCB);
    $(".form-control").val('');
    e.preventDefault();
    $('.loginMessage').show();
  });

  $('#skipLogIn').on('click', function (e){
    ux.skipLogin();
    api.indexProducts(cb.allProdsCB);
    api.mostClicks(cb.mostClicksCB);
    e.preventDefault();
  });

  //NavBar//

  $('#nozama').on('click', function (e) {
    ux.skipLogin();
    api.indexProducts(cb.allProdsCB);
    api.mostClicks(cb.mostClicksCB);
    e.preventDefault();
  });

  $('#logoutButton').on('click', function (e) {
    api.logout(cb.logoutCB);
    e.preventDefault();
  });

  $('#cartButton').on('click', function (e) {
    ux.cartPage();
    api.showTransaction('cart', cb.showTransCB);
    e.preventDefault();
  });

  $('#histButton').on('click', function (e) {
    ux.histPage();
    api.showTransaction('purchased', cb.showHistCB);
    e.preventDefault();
  });

  //Product Pages//

  $('#allProdsPage').on('click', function (e){
    var prodClicked = $(e.target);
    var id = prodClicked.data('prods-id');
    console.log("you clicked product id:" + id);
    if (id) {
      ux.singleProductPage();
      api.showProduct(id, cb.showProdsCB);
      api.pClicks(id, cb.pClicksCB);
    }
    e.preventDefault();
  });

  $('#add-to-cart').on('click', function (e){
    ux.cartPage();
    var data = {
      product_id: prod_id,
      status: "cart",
      qty: 1
    };
    console.log('createTrans data before api:', data);
    api.createTransaction(data, cb.createTransCB);
    e.preventDefault();
  });

  //Shopping Cart Page//

  $('.contShopButton').on('click', function (e) {
    ux.afterLogin();
    api.indexProducts(cb.allProdsCB);
    api.mostClicks(cb.mostClicksCB);
    e.preventDefault();
  });

  //remove button//
  $('#prods-shop-cart').on('click', function (e) {
    var id = $(e.target).data('trans-id');
    var data = { status: "abandoned" };
    console.log("you clicked transaction id:" + id);
    if (id) {
      api.updateTransaction(id, data, cb.deleteTransCB);
    }
    e.preventDefault();
  });

  $('#main-search').on('submit', function (e){
    var query = $(this).find("input").val();
    query = query.split(' ').join('+');
    api.mainSearch(query, cb.mainSearchCB);
    e.preventDefault();
  });

});
