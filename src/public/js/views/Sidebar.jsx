/** @jsx React.DOM */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['react'], function(React) {
  var Sidebar = React.createClass({
    render: function() {
      return <section className="sidebar">
        <h3>{"sidebar"}</h3>
        {(this.props.user)?<p>hello {this.props.user.values.name}</p>:null}
      </section>;
    }
  });

  return Sidebar;
});
