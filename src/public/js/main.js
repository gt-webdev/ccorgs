/**
 * @jsx React.DOM
 */
'use strict';

require.config({
  paths: {
    "marked": "https://rawgithub.com/chjj/marked/d53f20690fa141870bccab64b0d74dfe141462f7/lib/marked"
  }
});

var CCorgs = {};

CCorgs.loadPage = function(module, pageData) {
  require([module], function(pageModule) {
    pageModule(pageData);
  });
};

CCorgs.ajaxifyReq = function(path) {
  console.log("loading "+path);
  var xhr = new XMLHttpRequest();
  xhr.open("GET", path + "?format=json", true);
  xhr.setRequestHeader("accepts", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var xhrJson = JSON.parse(xhr.response);
      if (xhrJson.jsView && xhrJson.pageData) {
        history.pushState(null, null, path);
        CCorgs.loadPage(xhrJson.jsView, xhrJson.pageData);
      }
    }
  };
  xhr.send();
};

window.addEventListener('popstate', function(e) {
  CCorgs.ajaxifyReq(location.pathname);
});
