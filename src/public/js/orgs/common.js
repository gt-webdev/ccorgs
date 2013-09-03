/**
 * @jsx React.DOM
 */
'use strict';

define(
  ["/js/common.js"],
  function(common) {
    var cGravatar = common.Gravatar;
    var cNavbar = common.Navbar;
    var SignInBtn = common.SignInBtn;
    var FacePile = common.FacePile;
    var Link = common.Link;
    var commonOrgElements = {};
    commonOrgElements.OrgBox = React.createClass({
      render: function() {
        return <div>
            <Link href={'/orgs/' + this.props.slug}>
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
          <SignInBtn />
        </div>;
      }
    });
    commonOrgElements.OrgExtraStuff = React.createClass({
      render: function() {
        return <div>
          <FacePile main={this.props.org.admin} secondary={this.props.org.mods} />
          {(this.props.org.facebook)?<iframe src={"//www.facebook.com/plugins/like.php?href=http%3A%2F%2Ffacebook.com%2F" + this.props.org.facebook + "&amp;width=450&amp;height=80&amp;colorscheme=light&amp;layout=standard&amp;action=like&amp;show_faces=true&amp;send=true&amp;appId=167256020120652"} scrolling="no" frameborder="0"  allowTransparency="true"></iframe>:null}
          {(this.props.org.github)?<a href={"https://github.com/"+this.props.org.github}><img class="github-fork"  src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub" /></a>:null}
        </div>;
      }
    });
    commonOrgElements.ListHeader = React.createClass({
      render: function() {
        return <div style={{display:"inline"}}>
          <cNavbar />
          <SignInBtn />
        </div>;
      }
    });
    return commonOrgElements;
  }
);
 
