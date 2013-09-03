/**
 * @jsx React.DOM
 */
'use strict';

define(
  ['/js/common.js', '/js/users/common.js', '/js/orgs/common.js'],
  function(common, userC, orgC) {
    return function(pageData) {
      var OrgBox = orgC.OrgBox;
      var UserHeader = userC.UserHeader;
      React.renderComponent(
        <UserHeader user={pageData.user} />,
        document.getElementById('page-header')
      );
      React.renderComponent(
        <div>
          <h3>I AM A USER</h3>
        </div>,
        document.getElementById('content')
      );
      React.renderComponent(
        <div>
          {"placeholder aside box"}
        </div>,
        document.getElementById('aside')
      );
    };
  }
);
