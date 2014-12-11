(function ($, global, undefined) {
  'use strict';
  var dynamicStyle = {
    style: null,
    indexes: {
      hideAll: -1,
      hideNotMention: -1,
      hideNotMine: -1
    }
  };
  var _index = dynamicStyle.indexes;
  dynamicStyle.initialize = function () {
    var style = document.createElement('style');
    style.setAttribute('media', 'screen');
    // WebKit hack ...
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);
    dynamicStyle.style = style;
  };
  dynamicStyle.insert = function (selector, rules) {
    var _sheet = dynamicStyle.style.sheet
    var index = _sheet.cssRules.length;
    if ('insertRule' in _sheet) {
      _sheet.insertRule(selector +'{'+ rules +'}', index);
    } else if ('addRule' in _sheet) {
      _sheet.addRule(selector, rules, index);
    }
    return index;
  };
  dynamicStyle.remove = function (index) {
    var _sheet = dynamicStyle.style.sheet
    if (index === undefined) return false;
    if ('deleteRule' in _sheet) {
      _sheet.deleteRule(index);
    } else if ('removeRule' in _sheet) {
      _sheet.removeRule(index);
    }
    return true;
  };
  dynamicStyle.clean = function () {
    var _sheet = dynamicStyle.style.sheet
    for (var i = _sheet.cssRules.length; i > 0; i--) {
      dynamicStyle.remove(i - 1);
    }
    _index.hideAll = -1;
    _index.hideNotMention = -1;
    _index.hideNotMine = -1;
  };
  dynamicStyle.onlyMine = function () {
    dynamicStyle.clean();
    _index.hideNotMine = dynamicStyle.insert('div._message.chatTimeLineMessageMine', 'display: block;');
    _index.hideAll = dynamicStyle.insert('div._message', 'display:none');
  };
  dynamicStyle.onlyMention = function () {
    dynamicStyle.clean();
    _index.hideNotMention = dynamicStyle.insert('div._message.chatTimeLineMessageMention', 'display: block;');
    _index.hideAll = dynamicStyle.insert('div._message', 'display:none');
  };
  dynamicStyle.allMessages = function () {
    dynamicStyle.clean();
  };
  $(document).ready( function () {
    chatwork.initialize();
    dynamicStyle.initialize();
    console.log(chatwork);
    var switcher = document.createElement('select');
    switcher.id = "scrachat-switcher";
    var mswitch = [
      {func: 'allMessages', text:'All Messages'},
      {func: 'onlyMine', text:'My Messages'},
      {func: 'onlyMention', text:'Mentions'}
    ];
    Array.prototype.forEach.call(mswitch, function (elem, idx) {
      var option = document.createElement('option');
      option.value = idx;
      option.innerText = elem.text;
      switcher.appendChild(option);
    });
    switcher.addEventListener('change', function (event) {
      var fn = dynamicStyle[mswitch[event.target.selectedIndex].func];
      if (typeof fn === 'function') fn();
    });
    var $chatSendTool = $('#_chatSendTool');
    $chatSendTool.append(switcher);
  });
})(jQuery, this);
