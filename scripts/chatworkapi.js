(function (global) {
  'use strict';
  var chatworkapi = {
    API_TOKEN: 'PUT YOUR API HERE',
    HOST: 'https://api.chatwork.com/',
    VERSION: 'v1'
  };
  chatworkapi.me = {
      url: chatworkapi.HOST + chatworkapi.VERSION + '/me',
      get: function () {
        $.ajax({
          url: this.url,
          type: 'GET',
          headers: {
            'X-ChatwWorkToken': chatworkapi.API_TOKEN,
            'Access-Control-Allow-Credentials': true
          },
          dataType: 'jsonp',
          success: function (data, stat) {
            console.log(data);
          },
          error: function (err, stat, thrown) {
            console.log('[ERROR]: ', err);
            console.log('[STATUS]: ', stat);
            console.log('[THROWN]: ', thrown);
          }
        });
      }
    }

  global.chatworkapi = chatworkapi;
})(this);
