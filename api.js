'use strict';

/*
  possibilites to handle:

  front-end local, api local
  front-end local, api remote - prod=true
  front-end remote, api local - dev=true
  front-end remote, api remote
*/

var getBaseApiUrl = function getBaseApiUrl(dev, prod) {
  var baseUrl;
  var $location = $(location); //browser thing

  var params = $location.attr('search')
    .slice(1)
    .split('&')
    .reduce(function(hash, element) {
      if (element) {
        var nameValuePair = element.split('=');
        hash[nameValuePair[0]] = nameValuePair[1];
      }

      return hash;
    }, {});

  if (params.dev === 'true' ||
    $location.attr('hostname') === 'localhost' && params.prod !== 'true') {
    baseUrl = dev;
  } else {
    baseUrl =  prod;
  }

  return baseUrl;
};

var dev = 'http://localhost:3000';
var prod = 'https://something-at.herokuapp.com';


var baseApiUrl = getBaseApiUrl(dev, prod);

console.log(baseApiUrl);

var api = {

  url: baseApiUrl,

  ajax: function(config, cb) {
    // $.ajaxSetup({
    //   xhrFields: {
    //     withCredentials: true
    //   }
    // });
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

  logout: function(callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/logout',
      contentType: 'application/json'
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

  showTransaction: function(callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/transactions',
      contentType: 'application/json'
      //dataType: 'json'
    }, callback);
  },

  createTransaction: function(data, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/transactions',
      contentType: 'application/json',
      data: JSON.stringify(data)
      //dataType: 'json'
    }, callback);
  },

  updateTransaction: function(id, data, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.url + '/transactions/' + id,
      contentType: 'application/json',
      data: JSON.stringify(data)
      //dataType: 'json'
    }, callback);
  },

  deleteTransaction: function(id, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.url +'/transactions/' + id,
      contentType: 'application/json',
      //dataType: 'json'
    }, callback);
  },

  mainSearch: function(query, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/products?q=' + query,
      contentType: 'application/json'
      //dataType: 'json'
    }, callback);
  },

};
