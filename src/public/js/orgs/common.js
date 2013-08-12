/**
 * @jsx React.DOM
 */
'use strict';

define(
  ["/js/common.js"],
  function(common) {
    var cGravatar = common.Gravatar;
    var cNavbar = common.Navbar;
    var commonOrgElements = {};
    commonOrgElements.OrgBox = React.createClass({
      render: function() {
        return <div>
            <a href={'/orgs/' + this.props.slug}>
              <cGravatar hash={this.props.gravatar} size={100}  />
              <h4>{this.props.title}</h4>
              <p>{this.props.description}</p>
            </a>
          </div>;
      }
    });
    commonOrgElements.OrgHeader = React.createClass({
      render: function() {
        return <div>
          <cNavbar />
        </div>;
      }
    });
    return commonOrgElements;
  }
);
 
