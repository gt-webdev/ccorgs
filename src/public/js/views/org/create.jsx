/** @jsx React.DOM */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['react', '../layout.js'], function(React, Layout) {
  var index = React.createClass({
    render: function() {
      return <Layout>
        <h1 onClick={this.clickme}>{"create a new org"}</h1>
      </Layout>;
    },
    clickme: function(e) {
      console.log('clicked!');
      e.preventDefault();
    }
  });

  return index;
});
