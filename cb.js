'use strict';
var prod_id = "";
var cb = {

  //Handlebars to generate tables//
  allProdsTemplate: function(){},
  cartTemplate: function(){},

  init: function(){
    Handlebars.registerHelper('ifOnLoan', function (conditionalVariable, options){
      if (conditionalVariable === options.hash.value) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    });

    this.allProdsTemplate = Handlebars.compile($('#allProd-index').html());
    this.cartTemplate = Handlebars.compile($('#cart-index').html());
  },
  // ^ end Handlebars ^ //

  registerCB: function(err, data){
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  },

  getUserCB: function(){},///fill this CB function in. If you get a data response, not an error, then use jquery to populate the dom with the username

  loginCB: function(err, data){
    if (err) {
      console.error("error", err);
    } else {
      console.log("successF");
      console.log(data);
      ux.afterLogin();
      //trigger api call GET request to http://localhost/users
      //pass this api a callback function, named cb.getuserCB
      api.indexProducts(cb.allProdsCB);
    }
  },

  logoutCB: function(err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log("success:", data);
    }
  },

  allProdsCB: function(err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
      var rowHTML = cb.allProdsTemplate({products: data});
      $("#allProdsPage").html(rowHTML);
    }
  },

  showProdsCB: function(err, data) {
    if (err) {
      console.error(err);
    } else {
      $('#prodUrl').attr('src', data[0].url);
      $('#prodName').text(data[0].name);
      $('#prodPrice').text("$" + data[0].price);
      $('#prodDesc').text(data[0].desc);
      $('#add-to-cart').attr('data-cart-prod-id',data[0]["_id"]);
      prod_id = data[0]["_id"]; //Gloabal variable
    }
  },

  createTransCB: function(err, data) {
    var total = 0;

    if (err) {
      console.error(err);
    } else {
      console.log(data);
      var rowHTML = cb.cartTemplate({transactions: data.trans});
      $("#prods-shop-cart").html(rowHTML);
      data.trans.forEach( function (elem) {
        total += elem.product_price;
      });
      $('#cartTotal').text("Total: " + total);
    }
  },

  showTransCB: function(err, data) {
    var total = 0;

    if (err) {
      console.error(err);
    } else {
      console.log(data);
      var rowHTML = cb.cartTemplate({transactions: data.trans});
      $("#prods-shop-cart").html(rowHTML);
      data.trans.forEach( function (elem) {
        total += elem.product_price;
      });
      $('#cartTotal').text("Total: " + total);
    }
  },

  mainSearchCB: function(err, data){
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      var rowHTML = cb.allProdsTemplate({products: data});
      $("#allProdsPage").html(rowHTML);
    }
  },

  deleteTransCB: function(err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
      api.showTransaction(cb.showTransCB);
    }
  }

};
