/** @jsx React.DOM */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['react', '../layout.js'], function(React, Layout) {
  var index = React.createClass({
    render: function() {
      return <Layout>
        <h1>This is where we resolve a merge conflict</h1>
        <a href="/" onClick={this.loadPage.bind(this, "/")}>Continue to the main page</a>
      </Layout>;
    },
    makeRequest: function(e) {
      var form = e.target
      require(['/react_view/requester.js'], function(requester) {
        requester.submitForm(form);
      });
      e.preventDefault();
    },
    loadPage: function(path, e) {
      require(['/react_view/requester.js'], function(requester) {
        requester.changePage(path);
      });
      e.preventDefault();
    }
  });

  return index;
});
