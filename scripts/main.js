(function ($, global, undefined) {
  'use strict';
  var dynamicStyle = {
    style: null
  };
  dynamicStyle.initialize = function () {
    var style = document.createElement('style');
    style.setAttribute('media', 'screen');
    // WebKit hack ...
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);
    dynamicStyle.style = style;
  };
  dynamicStyle.insert = function (selector, rules, index) {
    if ('insertRule' in dynamicStyle.style.sheet) {
      dynamicStyle.style.sheet.insertRule(selector +'{'+ rules +'}', index);
    } else if ('addRule' in dynamicStyle.style.sheet) {
      dynamicStyle.style.sheet.addRule(selector, rules, index);
    }
  }
  dynamicStyle.remove = function (index) {
    if (index === undefined) return false;
    if ('deleteRule' in dynamicStyle.style.sheet) {
      dynamicStyle.style.sheet.deleteRule(index);
    } else if ('removeRule' in dynamicStyle.style.sheet) {
      dynamicStyle.style.sheet.removeRule(index);
    }
    return true;
  }
  dynamicStyle.onlyMine = function () {
    dynamicStyle.insert('div._message', 'display:none');
  };
  dynamicStyle.onlyMention = function () {
  };
  dynamicStyle.allMessages = function () {
  }
  $(document).ready( function () {
    'use strict';
    chatwork.initialize();
    dynamicStyle.initialize();
    console.log(chatwork);
  });
})(jQuery, this);
