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
    currentRoom: null,
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

  _chatlist.initialize = function () {
    var $rooms = $('#_roomListItems li._room');
    if (Object.keys(_chatlist.rooms).length === $rooms.length) return;
    Array.prototype.forEach.call($rooms, function (item) {
      var icon = $(item).find('img')[0];
      var rid = item.dataset.rid;
      var name = item.getAttribute('aria-label');
      _chatlist.rooms[rid] = new Room(rid, name, icon.src);
      _chatlist.rooms[rid].isGroup = (icon.dataset.aid === undefined);
      if (item.classList.contains('_roomSelected')) chatwork.currentRoom = rid;
      if (! _chatlist.rooms[rid].isGroup) {
        _chatlist.users[rid] = new User (rid, icon.dataset.aid, name, icon.src);
      }
      if (name === 'My Chat') {
        _chatlist.rooms[rid].isMychat = true;
        chatwork.myself = _chatlist.users[rid];
      }
    });
  };

  _chatlist.save = function () {
    localStorage.setItem('chatwork.chatlist', _chatlist);
  }

  chatwork.updateCurrentRoom = function (target) {
    if (target.classList.contains('_roomSelected')) {
      chatwork.currentRoom = target.dataset.rid;
    }
  };

  chatwork.initialize = function () {
  };

  var observers = {};
  observers.currentRoom = new MutationObserver(function (mutations) {
    mutations.forEach(function(mutation){
      chatwork.updateCurrentRoom(mutation.target);
    })
  }).observe(document.getElementById('_roomListItems'), {
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  });
  observers.roomList = new MutationObserver(function (mutations) {
      _chatlist.initialize();
  }).observe(document.getElementById('_roomListItems'), {childList: true});

  global.chatwork = chatwork;
})(this);
