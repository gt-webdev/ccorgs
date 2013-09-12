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
      React.renderComponent(<div>
          <ListHeader />
        </div>, 
        document.getElementById('page-header'));
      React.renderComponent(<div>
          <section class="main-page">
            {pageData.map(function(org) {
              return <OrgBox 
                list={true}
                title={org.name} 
                color={org.cover}
                description={org.short}
                slug={org.slug}
                gravatar={org.emailHash} />;
            })}
          </section>
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
