/** @jsx React.DOM */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['react', '../Layout.js'], function(React, Layout) {
  var index = React.createClass({
    render: function() {
      return <Layout>
        <h1 onClick={this.clickme}>{"Choose an Authentication Service"}</h1>
        <a href="/auth/facebook">Facebook</a>
        <a href="/auth/google">Google+</a>
        <a href="/auth/github">Github</a>
      </Layout>;
    },
    clickme: function(e) {
      console.log('clicked!');
      e.preventDefault();
    }
  });

  return index;
});
