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
    
    var OrgBox = React.createClass({
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
    commonOrgElements.OrgBox = OrgBox;
    commonOrgElements.OrgHeader = React.createClass({
      render: function() {
        return <div>
          <cNavbar />
        </div>;
      }
    });
    commonOrgElements.OrgSection = React.createClass({
      render: function() {
        return <div class='org-section' style={{"border-top-color": this.props.org.cover}}>
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
    var OrgsListSection = React.createClass({
      changeType: function() {
        var nextType = (this.state.type=="abc"?"cat":"abc");
        this.setState({type: nextType});
      },
      getInitialState: function() {
        var orgsAbc = this.props.orgs.slice(0);
        orgsAbc.sort(function(a, b) {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          return 0;
        });
        return {type: this.props.type, sorted: orgsAbc}
      },
      render: function() {
        var orgs = this.props.orgs, orgsElems = [], org;
        if (this.state.type == "abc") {
          orgs = this.state.sorted;
        }
        for (var i = 0; i < orgs.length; i += 1) {
          org = orgs[i];
          orgsElems.push(<OrgBox 
            list={true}
            title={org.name} 
            color={org.cover}
            description={org.short}
            slug={org.slug}
            gravatar={org.emailHash} />);
        }
        return <div class='orgs-list-section'>
            <header>
              <h1>All Organizations</h1>
              <h3 onClick={this.changeType} class="orgs-list-type-switcher">
                {this.state.type=="abc"?"View Categories":"View Alphabetical"}
              </h3>
            </header>
            <section class="main-page">
              {orgsElems}
            </section>
          </div>;
      }
    });
    commonOrgElements.OrgsListSection = OrgsListSection;
    return commonOrgElements;
  }
);
 
