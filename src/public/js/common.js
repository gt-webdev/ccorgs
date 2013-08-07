/**
 * @jsx React.DOM
 */
'use strict';

define(
  function() {
    var commonElements = {};
    var NavMenu = React.createClass({
      render: function() {
        return <ul>{this.props.children}</ul>;
      }
    });
    var NavItem = React.createClass({
      render: function() {
        return <li>{this.props.label}</li>;
      }
    });
    commonElements.Navbar = React.createClass({
      render: function() {
        return <nav>
            <NavMenu active={0}>
              <NavItem idx={0} label={"Orgs"} />
              <NavItem idx={1} label={"Events"} />
            </NavMenu>
          </nav>;
      }
    });
    commonElements.Gravatar = React.createClass({
      render: function() {
        var size = this.props.size || "200",
            hash = this.props.hash || "205e460b479e2e5b48aec07710c08d50",
            url = "http://www.gravatar.com/avatar/" + hash + "?s=" + size;
        return <img class={"gravatar-image-" + size} src={url} />;
      }
    });
    commonElements.CoverBar = React.createClass({
      render: function() {
        return <section>{this.props.title}</section>;
      }
    });
    return commonElements;
  }
);

