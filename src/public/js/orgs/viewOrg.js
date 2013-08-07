/**
 * @jsx React.DOM
 */
'use strict';

define(
  ['/js/orgs/common.js'],
  function(common) {
    return function(pageData) {
      console.log(pageData);
      var OrgHeader = common.OrgHeader;
      React.renderComponent(
        <OrgHeader title={pageData.name} />,
        document.getElementById('page-header')
      );
    };
  }
);
