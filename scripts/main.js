(function ($, global, undefined) {
  'use strict';
  var dynamicStyle = {
    style: null
    indexes: {
      hideAll: -1,
      hideNotMention: -1
      hideNotMine: -1,
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
    var index = dynamicStyle.style.sheet.cssRules.length;
    if ('insertRule' in dynamicStyle.style.sheet) {
      dynamicStyle.style.sheet.insertRule(selector +'{'+ rules +'}', index);
    } else if ('addRule' in dynamicStyle.style.sheet) {
      dynamicStyle.style.sheet.addRule(selector, rules, index);
    }
    return index;
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
    if (index.hideNotMention >= 0) {
      dynamicStyle.remove(index.hideNotMention);
      index.hideNotMention = -1;
    }
    if (index.hideNotMine < 0) {
      index.hideNotMine = dynamicStyle.insert('div._message.chatTimeLineMessageMine', 'display: block;');
    }
    if (index.hideAll < 0) {
      index.hideAll = dynamicStyle.insert('div._message', 'display:none');
    }
  };
  dynamicStyle.onlyMention = function () {
    if (index.hideNotMine >= 0) {
      dynamicStyle.remove(index.hideNotMine);
      index.hideNotMine = -1;
    }
    if (index.hideNotMention < 0) {
      index.hideNotMention = dynamicStyle.insert('div._message.chatTimeLineMessageMention', 'display: block;');
    }
    if (index.hideAll < 0) {
      index.hideAll = dynamicStyle.insert('div._message', 'display:none');
    }
  };
  dynamicStyle.allMessages = function () {
    if (index.hideAll >= 0) {
      dynamicStyle.remove(index.hideAll);
      index.hideAll = -1;
    }
    if (index.hideNotMention >= 0) {
      dynamicStyle.remove(index.hideNotMention);
      index.hideNotMention = -1;
    }
    if (index.hideNotMine >= 0) {
      dynamicStyle.remove(index.hideNotMine);
      index.hideNotMine = -1;
    }
  }
  $(document).ready( function () {
    'use strict';
    chatwork.initialize();
    dynamicStyle.initialize();
    console.log(chatwork);
  });
})(jQuery, this);
