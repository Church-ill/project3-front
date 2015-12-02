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
    e.preventDefault();
  });

  //NavBar//

  $('#nozama').on('click', function (e) {
    ux.skipLogin();
    e.preventDefault();
  });

  $('#logoutButton').on('click', function (e) {
    api.logout(cb.logoutCB);
    e.preventDefault();
  });

  $('#cartButton').on('click', function (e) {
    ux.cartPage();
    api.showTransaction(cb.showTransCB);
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
    }
    e.preventDefault();
  });

  $('#add-to-cart').on('click', function (e){
    ux.cartPage();
    var data = {
      //user_id: "565b262200c6ec466aec2900",
      product_id: $(e.target).data('cart-prod-id'),
      status: "cart",
      qty: 1
    };
    console.log('createTrans data before api:');
    console.log(data);
    api.createTransaction(data, cb.createTransCB);
    e.preventDefault();
  });

  //Shopping Cart Page//

  $('#contShopButton').on('click', function (e) {
    ux.afterLogin();
    e.preventDefault();
  });

  $('#prods-shop-cart').on('click', function (e) {
    var id = $(e.target).data('prod-id');
    var data = { status: "abandoned" };
    console.log("you clicked product id:" + id);
    if (id) {
      api.updateTransaction(id, data, cb.deleteTransCB);
    }
    e.preventDefault();
  });

  // $('').on('click', function(e) {
  //   api.showProduct(cb.allProdsCB);
  //   e.preventDefault();
  // });

  $('#main-search').on('submit', function (e){
    var query = $(this).find("input").val();
    query = query.split(' ').join('+');
    api.mainSearch(query, cb.mainSearchCB);
    e.preventDefault();
  });

});
