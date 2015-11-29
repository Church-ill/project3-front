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

$(document).ready(function(){

  ux.login();

  //Login Actions//

  $('#registerForm').on('submit', function(e) {
    var credentials = form2object(this);
    api.register(credentials, cb.registerCB);
    $(".form-control").val('');
    e.preventDefault();
  });

  $('#loginForm').on('submit', function(e){
    var credentials = form2object(this);
    console.log("creds:", credentials);
    api.login(credentials, cb.loginCB);
    $(".form-control").val('');
    e.preventDefault();
  });

  $('#skipLogIn').on('click', function(e){
    ux.skipLogin();
    e.preventDefault();
  });

});
