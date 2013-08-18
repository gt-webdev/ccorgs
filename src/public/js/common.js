/**
 * @jsx React.DOM
 */
'use strict';

define(
  ['marked'],
  function(marked) {
    var commonElements = {};
    var Link = React.createClass({
      gotoPage: function() {
        CCorgs.ajaxifyReq(this.props.href);
      },
      render: function() {
        return <div onClick={this.gotoPage}>{this.props.children}</div>;
      }
    });
    var NavMenu = React.createClass({
      render: function() {
        return <ul>{this.props.children}</ul>;
      }
    });
    var NavItem = React.createClass({
      gotoPage: function() {
        CCorgs.ajaxifyReq(this.props.path);
      },
      render: function() {
        return <li onClick={this.gotoPage}>
            {this.props.label}
          </li>;
      }
    });
    var Tab = React.createClass({
      render: function() {
        var type = this.props.tab.type || "markdown";
        switch (type) {
          case ('markdown'):
            return <article class={this.props.visibility} dangerouslySetInnerHTML={{__html: marked(this.props.tab.content)}} />
            break;
          default:
            console.log("unrecognized tab type: "+type);
            return <article class={this.props.visibility}>{this.props.tab.content || "no content"}</article>
            break;
        }
      }
    });
    var TabBox = React.createClass({
      getInitialState: function() {
        if (this.props.tabs[0] && this.props.tabs[0].name) {
          return {active: this.props.tabs[0].name};
        }
      },
      changeTab: function(event) {
        this.setState({active: event.target.dataset.target});
      },
      render: function() {
        var changeTabFunc = this.changeTab;
        if (!this.props.tabs || !this.props.tabs.length) {
          return <div>No Description</div>;
        }
        var state = this.state;
        return <div class='tab-box'>
          <nav>
            {this.props.tabs.map(function(tab) {
              return <li data-target={tab.name} onClick={changeTabFunc} ref={tab.name + "-nav"}>{tab.title}</li>;
            })}
          </nav>
          <section>
            {this.props.tabs.map(function(tab) {
              return <Tab ref={tab.name} tab={tab} visibility={(tab.name == state.active)?"visible":"hidden"} />;
            })}
          </section>
        </div>;
      }
    });
    commonElements.TabBox = TabBox;
    commonElements.Navbar = React.createClass({
      render: function() {
        return <nav>
            <NavMenu active={0}>
              <NavItem idx={0} label={"Orgs"} path="/" />
              <NavItem idx={1} label={"Events"} path="/events" />
            </NavMenu>
          </nav>;
      }
    });
    var Gravatar = React.createClass({
      render: function() {
        var size = this.props.size || "200",
            hash = this.props.hash || "205e460b479e2e5b48aec07710c08d50",
            url = "http://www.gravatar.com/avatar/" + hash + "?s=" + size;
        return <img class={"gravatar-image-" + size} src={url} />;
      }
    });
    commonElements.Gravatar = Gravatar;
    commonElements.CoverBar = React.createClass({
      render: function() {
        return <section>{this.props.title}</section>;
      }
    });
    commonElements.FacePile = React.createClass({
      render: function() {
        return <ul class="facepile">
          {(this.props.main)?<li><Gravatar hash={this.props.main.emailHash} size={50} /></li>:null}
          {this.props.secondary.map(function(user) {
            return <li><Gravatar hash={user.emailHash} size={50} /></li>
          })}
        </ul>
      }
    });
    commonElements.Link = Link;
    return commonElements;
  }
);

