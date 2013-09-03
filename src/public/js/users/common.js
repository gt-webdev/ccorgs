/**
 * @jsx React.DOM
 */
'use strict';

define(
  ["/js/common.js"],
  function(common) {
    var cGravatar = common.Gravatar;
    var cNavbar = common.Navbar;
    var Link = common.Link;
    var commonUserElements = {};
    
    var UserHeader = React.createClass({
      render: function() {
        return <div>
          <h1>CoC Student Organizations</h1>
          <cNavbar />
          <cGravatar hash={this.props.user.emailHash} size={200} />
          <h2>{this.props.user.name}</h2>
        </div>;
      }
    });
    commonUserElements.UserHeader = UserHeader;
    
    return commonUserElements;
  }
);
 
