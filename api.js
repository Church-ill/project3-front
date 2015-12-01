'use strict';

$.ajaxSetup({
  xhrFields: {
    withCredentials: true
  }
});


var api = {

  url: 'http://localhost:3000',

  ajax: function(config, cb) {
  $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  // Unauthenticated actions
  register: function(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/signup',
      contentType: 'application/json',
      data: JSON.stringify(credentials)
      //dataType: 'json'
    }, callback);
  },

  login: function(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/login',
      contentType: 'application/json',
      data: JSON.stringify(credentials)
      //dataType: 'json'
    }, callback);
  },

  getUser: function(callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/users',
      contentType: 'application/json',
      xhrFields: {
                  withCredentials: true
                  }
      //dataType: 'json'
    }, callback);
  },

  logout: function(callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/logout',
      xhrFields: {
                  withCredentials: true
                  }
      // contentType: 'application/json'
      //dataType: 'json'
    }, callback);
  },

  indexProducts: function(callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/products',
      contentType: 'application/json'
      //dataType: 'json'
    }, callback);
  },

  showProduct: function(id, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/products/' + id,
      contentType: 'application/json'
      //dataType: 'json'
    }, callback);
  },

  showTransaction: function(query, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/transactions/' + query,
      contentType: 'application/json'
      //dataType: 'json'
    }, callback);
  },

  createTransaction: function(data, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/transactions',
      contentType: 'application/json'
      //dataType: 'json'
    }, callback);
  },

  updateTransaction: function(id, data, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.url + '/transactions/' + id,
      contentType: 'application/json',
      data: data
      //dataType: 'json'
    }, callback);
  }

};
