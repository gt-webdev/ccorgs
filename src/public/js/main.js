/**
 * @jsx React.DOM
 */
'use strict';

var CCorgs = {};

CCorgs.loadPage = function(module, pageData) {
  require([module], function(pageModule) {
    console.log(pageModule);
    pageModule(pageData);
  });
};

CCorgs.ajaxifyReq = function(path) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", path + "?format=json", true);
  xhr.setRequestHeader("accepts", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var xhrJson = JSON.parse(xhr.response);
      if (xhrJson.jsView && xhrJson.data) {
        CCorgs.loadPage(xhrJson.jsView, xhrJson.data);
      }
    }
  };
  xhr.send();
};
