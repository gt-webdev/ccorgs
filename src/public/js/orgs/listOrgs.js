/**
 * @jsx React.DOM
 */
'use strict';

define(
  ['/js/orgs/common.js'],
  function(common) {
    return function(pageData) {
      var OrgBox = common.OrgBox;
      var OrgHeader = common.OrgHeader;
      React.renderComponent(<div>
          <OrgHeader />
        </div>, 
        document.getElementById('page-header'));
      React.renderComponent(<div>
          <section class="main-page">
            {pageData.map(function(org) {
              console.log(org);
              return <OrgBox 
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
    };
  }
);
