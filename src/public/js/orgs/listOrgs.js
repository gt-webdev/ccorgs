/**
 * @jsx React.DOM
 */
'use strict';

define(
  ['/js/orgs/common.js'],
  function(common) {
    return function(pageData) {
      var OrgBox = common.OrgBox;
      var ListHeader = common.ListHeader;
      var OrgsListSection = common.OrgsListSection;
      React.renderComponent(<div>
          <ListHeader />
        </div>, 
        document.getElementById('page-header'));
      React.renderComponent(<OrgsListSection orgs={pageData.orgs} type='abc' />,
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
