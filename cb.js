'use strict';
var prod_id = "";
var cb = {

  //Handlebars to generate tables//
  allProdsTemplate: function(){},
  cartTemplate: function(){},
  histTemplate: function(){},

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
    this.histTemplate = Handlebars.compile($('#hist-index').html());
  },
  // ^ end Handlebars ^ //

  registerCB: function(err, data){
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  },

  getUserCB: function(err, data){
    if (err) {
      console.log(err);
    } else {
      $('#loginMessage').html("Hello " + data.title);
      console.log('Hello');
      console.log(data.title);
    }
  },///fill this CB function in. If you get a data response, not an error, then use jquery to populate the dom with the username

  loginCB: function(err, data){
    if (err) {
      console.error("error", err);
    } else {
      console.log("successF");
      console.log(data);
      ux.afterLogin();
      api.getUser(cb.getUserCB);
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
      prod_id = data[0]["_id"]; //Global variable
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
      $('#cartTotal').text("Total: $" + total.toFixed(2));
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
      $('#cartTotal').text("Total: $" + total.toFixed(2));
    }
  },

  showHistCB: function(err, data) {
    var total = 0;

    if (err) {
      console.error(err);
    } else {
      console.log(data);
      var rowHTML = cb.histTemplate({transactions: data.trans});
      $("#trans-hist-table").html(rowHTML);
      data.trans.forEach( function (elem) {
        total += elem.product_price;
      });
      $('#histTotal').text("Total: $" + total.toFixed(2));
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
