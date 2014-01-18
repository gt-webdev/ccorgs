/** @jsx React.DOM */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['react', '../layout.js'], function(React, Layout) {
  var index = React.createClass({
    render: function() {
      return <Layout>
        <h1>We need more information to finish your registration!</h1>
        <p>Thanks for creating a user on CCOrgs! Before you start checking-in 
        to events on the site, we need to confirm that you're a Georgia Tech
        student. To do this, we need you to input your gtid in this box:</p>
        <form action="/auth/gtid" method="POST" onSubmit={this.makeRequest} >
          <input type="hidden" name="_method" value="PUT" />
          <label htmlFor="gtid_field">gtID: 
            <input 
              type="text" 
              id="gtid_field"
              name="gtid" 
              pattern="90[012]\d{6}" 
              placeholder="902000000" />
          </label>
          <h3>Optional: Add more e-mails</h3>
          <p>In addition to your main e-mail address that we received when you 
          authenticated with us ({this.props.user.email}), you can add more of
          you e-mails to make authentication with other services/kiosk mode
          seemless. Please check out our help pages for more information.</p>
          <label htmlFor="gtid_field">Extra Email 1: 
            <input 
              type="email" 
              name="email1" 
              placeholder="gburdell3@gatech.edu" />
          </label>
          <label htmlFor="gtid_field">Extra Email 2: 
            <input 
              type="email" 
              name="email2" 
              placeholder="burdellistehbest@yahoo.com" />
          </label>
          <input type="submit" value="submit" />
        </form>
        <p>You can also skip this step, but you'll be asked to finish this step
        whenever you try and complete an action or view a page that requires
        you to be logged in.</p>
        <a href="/" onClick={this.loadPage.bind(this, "/")}>Continue to the main page</a>
      </Layout>;
    },
    makeRequest: function(e) {
      var form = e.target
      require(['/react_view/requester.js'], function(requester) {
        requester.submitForm(form);
      });
      e.preventDefault();
    },
    loadPage: function(path, e) {
      require(['/react_view/requester.js'], function(requester) {
        requester.changePage(path);
      });
      e.preventDefault();
    }
  });

  return index;
});
