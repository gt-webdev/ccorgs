/**
 * @jsx React.DOM
 */
'use strict';

define(
  ['/js/orgs/common.js'],
  function(common) {
    return function(pageData) {
      console.log(common);
      var OrgHeader = common.OrgHeader;
      React.renderComponent(
        <OrgHeader title="Orgs List" />,
        document.getElementById('page-header')
      );
    };
  }
);
