var cb = {

  //Handlebars to generate tables//
  allProdsTemplate: function(){},
  cartTemplate: function(){},

  init: function(){
    Handlebars.registerHelper('ifOnLoan', function (conditionalVariable, options){
      if (conditionalVariable === options.hash.value) {
        return options.fn(this)
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

  loginCB: function(err, data){
    if (err) {
      console.error("error", err);
    } else {
      console.log("successF");
      console.log(data);
      ux.afterLogin();
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
      $('#prodName').text(data[0].name);
      $('#prodPrice').text("$" + data[0].price);
      $('#prodDesc').text(data[0].desc);
      $('#add-to-cart').attr('data-cart-prod-id',data[0]["_id"]);
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
  }

};
