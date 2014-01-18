/** @jsx React.DOM */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['react'], function(React) {
  var Header = React.createClass({
    render: function() {
      return <header className="site-header">
        <h1 className="site-title">ccorgs.com</h1>
        <nav className="main-nav">
          <li>
            <a href="/orgs" onClick={this.loadPage.bind(this, '/orgs')}>
              Orgs
            </a>
          </li>
          <li>
            <a href="/events" onClick={this.loadPage.bind(this, '/events')}>
              Events
            </a>
          </li>
        </nav>
      </header>;
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

  return Header;
});
