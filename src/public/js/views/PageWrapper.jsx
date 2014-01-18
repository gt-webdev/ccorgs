/** @jsx React.DOM */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['react'], function(React) {
  var PageWrapper = React.createClass({
    render: function() {
      var style = {
        borderTop: "3px solid " + (this.props.color || "#ffcc00")
      };
      return <section className="page-wrapper" style={style}>
        <h2 className="page-title">{this.props.title || "Generic Page"}</h2>
        {this.props.children}
      </section>;
    }
  });

  return PageWrapper;
});
