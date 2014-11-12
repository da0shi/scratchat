(function (global) {
  'use strict';
  var chatwork = {
    API_TOKEN: 'PUT YOUR API HERE',
    HOST: 'https://api.chatwork.com/',
    VERSION: 'v1'
  };
  chatwork.me = {
      url: chatwork.HOST + chatwork.VERSION + '/me',
      get: function () {
        $.ajax({
          url: this.url,
          type: 'GET',
          headers: {
            'X-ChatwWorkToken': chatwork.API_TOKEN,
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

  global.chatwork = chatwork;
})(this);
