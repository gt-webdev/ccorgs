/**
 * @jsx React.DOM
 */
'use strict';

define(
  ["/js/common.js"],
  function(common) {
    var cGravatar = common.Gravatar;
    var cNavbar = common.Navbar;
    var FacePile = common.FacePile;
    var Link = common.Link;
    var commonOrgElements = {};
    commonOrgElements.OrgBox = React.createClass({
      render: function() {
        return <div 
          class={(this.props.list)?"org-list-item orgbox":"orgbox"}
          style={{borderLeft: "5px solid " + this.props.color}} >
            <Link href={'/orgs/' + this.props.slug}>
              <cGravatar size={60} hash={this.props.gravatar} />
              <h4>{this.props.title}</h4>
              <p>{this.props.description}</p>
            </Link>
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
    commonOrgElements.OrgSection = React.createClass({
      render: function() {
        return <div>
          {(this.props.org.github)?<a href={"https://github.com/"+this.props.org.github}><img class="github-fork"  src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub" /></a>:null}
          <header>
            {(this.props.org.facebook)?<iframe src={"//www.facebook.com/plugins/like.php?href=http%3A%2F%2Ffacebook.com%2F" + this.props.org.facebook + "&amp;width=450&amp;height=80&amp;colorscheme=light&amp;layout=standard&amp;action=like&amp;show_faces=true&amp;send=true&amp;appId=167256020120652"} scrolling="no" frameborder="0"  class="fb-pile" allowTransparency="true"></iframe>:null}
            <cGravatar hash={this.props.org.emailHash} size={100} />
            <h2>{this.props.org.name}</h2>
          </header>
          {this.props.children}
        </div>;
      }
    });
    commonOrgElements.ListHeader = React.createClass({
      render: function() {
        return <div>
          <cNavbar />
        </div>;
      }
    });
    return commonOrgElements;
  }
);
 
