var cb = {

  //Handlebars to generate tables//
  allProdsTemplate: function(){},

  init: function(){
    Handlebars.registerHelper('ifOnLoan', function (conditionalVariable, options){
      if (conditionalVariable === options.hash.value) {
        return options.fn(this)
      } else {
        return options.inverse(this);
      }
    });

    this.allProdsTemplate = Handlebars.compile($('#allProd-index').html());
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
      console.log(data);
      ux.afterLogin(data);
    }
  },

  loginCB: function(err, data){
    if (err) {
      console.error("error", err);
    } else {
      console.log("successF");
      console.log(data);
      setTimeout(api.getUser(cb.getUserCB), 5000);
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
      console.log(data);
    }
  }

};
