/** @jsx React.DOM */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['react'], function(React) {
  var Footer = React.createClass({
    render: function() {
      return <section className="footer">
        <h3>{"footer"}</h3>
      </section>;
    }
  });

  return Footer;
});
