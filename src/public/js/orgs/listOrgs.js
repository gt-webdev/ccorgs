/**
 * @jsx React.DOM
 */
'use strict';

define(
  ['/js/orgs/common.js', '/js/common.js'],
  function(orgsC, common) {
    return function(pageData) {
      var OrgBox = orgsC.OrgBox;
      var ListHeader = orgsC.ListHeader;
      var SignInBtn = common.SignInBtn;
      React.renderComponent(<div>
          <ListHeader />
        </div>, 
        document.getElementById('page-header'));
      React.renderComponent(<div>
          <section class="main-page">
            <h1>{"CoC Student Organizations"}</h1>
            {pageData.map(function(org) {
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
      React.renderComponent(
        <div>
          {"UPCOMING EVENTS"}
        </div>,
        document.getElementById('aside')
      );
    };
  }
);
