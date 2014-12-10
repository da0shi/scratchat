(function (global) {
  'use strict';
  var chatwork= {
    HOST: 'https://www.chatwork.com',
    chatlist: {
      initialize: null,
      rooms: {},
      users: {},
    },
    myself: null,
    initialize: null
  };

  var User = function (rid, aid, name, icon, nickname) {
    this.roomid = rid;
    this.accountid = aid;
    this.name = name;
    this.icon = icon || null;
    this.nickname = nickname || null;
  };
  var Room = function (rid, name, icon, isGroup) {
    this.roomid = rid;
    this.name = name;
    this.icon = icon;
    this.isGroup = isGroup;
    this.isMychat = false;
  }
  var _chatlist = chatwork.chatlist;

  _chatlist.update = function () {
    var $rooms = $('#_roomListItems li._room');
    Array.prototype.forEach.call($rooms, function (item) {
      var icon = $(item).find('img')[0];
      var rid = item.dataset.rid;
      var name = item.getAttribute('aria-label');
      _chatlist.rooms[rid] = new Room(rid, name, icon.src);
      _chatlist.rooms[rid].isGroup = (icon.dataset.aid === undefined);
      if (! _chatlist.rooms[rid].isGroup) {
        _chatlist.users[rid] = new User (rid, icon.dataset.aid, name, icon.src);
      }
      if (name === 'My Chat') {
        _chatlist.rooms[rid].isMychat = true;
        chatwork.myself = _chatlist.users[rid];
      }
    });
  };

  _chatlist.initialize = function () {
    if (Object.keys(_chatlist.rooms).length === 0 ||
       Object.keys(_chatlist.users).length === 0) {
      _chatlist.update();
    }
  }

  _chatlist.save = function () {
    localStorage.setItem('chatwork.chatlist', _chatlist);
  }

  chatwork.initialize = function () {
    _chatlist.initialize();
    _chatlist.undefined;
  };

  global.chatwork = chatwork;
})(this);
