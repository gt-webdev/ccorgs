/** @jsx React.DOM */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['react'], function(React) {
  var layout = React.createClass({
    render: function() {
      return <html>
        <head>
          <title>{this.props.title || "CCOrgs.com - CoC Student Orgs | Georgia Tech"}</title>
          <script src="/vendor/require.js" type="application/javascript" data-main="/react_view/loader.js"></script>
        </head>
        <body>
          {this.props.children}
        </body>
      </html>;
    }
  });

  return layout;
});
