/** @jsx React.DOM */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['react', 
  '../Layout.js', 
  '../Header.js', 
  '../PageWrapper.js',
  '../Sidebar.js',
  '../Footer.js'], 
function(React, Layout, Header, PageWrapper, Sidebar, Footer) {
  var index = React.createClass({
    render: function() {
      return <Layout>
        <Header />
        <PageWrapper title="Merge accounts" color="#ffcc00">
          {this.genMessage()}
          <form action="/auth/merge" method="POST" onSubmit={this.submitForm}>
            <input type="hidden" name="_method" value="PUT" />
            <input type="hidden" name="req_user_id" value={this.props.user._id} />
            <input type="hidden" name="merge_user_id" value={this.props.userToMerge._id} />
            {this.genNamePicker()}
            <input type="submit" value="Merge Accounts" />
          </form>
          <pre>
          {JSON.stringify(this.props.user)}
          </pre>
          {JSON.stringify(this.props.userToMerge)}
        </PageWrapper>
        <Sidebar />
        <Footer />
      </Layout>;
    },
    genMessage: function() {
      var newAuthMethod = (this.props.user.fbid? "Facebook": 
        (this.props.user.gglid? "Google": "GitHub"));
      return <div onClick={this.proveReact} className="text-block notice">
          <h4>Thanks for authenticating with {newAuthMethod}!</h4>
          <p>Our system found that there is another user with the same e-mail
          as the one that {newAuthMethod} provided us.<span className="expand"> 
          Since we authenticate against other services and through e-mail 
          account verifications, we consider the fact that your e-mail is 
          already associated with an account to mean that you are the same 
          person authenticating with a different service for the first time. 
          If that's not the case, you may be using someone else's computer or 
          you might be logged-in as someone else on {newAuthMethod}.</span></p>
          <p>For your convinience, we will add {newAuthMethod} as a valid
          authentication method for your existing account, simply pick decide
          which account's display name you'd like to keep and continue to
          ccorgs.com</p>
        </div>;
    },
    genNamePicker: function() {
      // option 1: both names are the same
      if (this.props.user.name === this.props.userToMerge.name) {
        return <div className="name-picker">
            <h4>Display Name:</h4>
            <h5>{this.props.user.name}</h5>
            <p>(The name we had on record was identical to the one we received)</p>
            <input type="hidden" name="finalname" value={this.props.user.name} />
          </div>;
      // option 2: Names are different
      } else if (this.props.user.name !== "" && this.props.userToMerge !== "") {
        return <div className="name-picker">
            <h4>Display Name:</h4>
            <label htmlFor="name-option-1">
              <input id="name-option-1" type="radio" name="finalname" value={this.props.user.name} />
              <h5>{this.props.user.name}</h5>
            </label>
            <label htmlFor="name-option-2">
              <input id="name-option-2" type="radio" name="finalname" value={this.props.userToMerge.name} />
              <h5>{this.props.userToMerge.name}</h5>
            </label>
          </div>;
      // option 3: I guess one or both of the names are empty string, shouldn't
      // be allowed. let's just default to a text prompt
      } else {
        return <div className="name-picker">
            <h4>Display Name:</h4>
            <input type="text" name="finalname" placeholder="Display Name" />
            <p>(We couldn't figure out a proper display name for your account, 
            please enter one now)</p>
          </div>;
      }
    },
    submitForm: function(e) {
      var form = e.target
      require(['/react_view/requester.js'], function(requester) {
        requester.submitForm(form);
      });
      e.preventDefault();
    }
  });

  return index;
});
