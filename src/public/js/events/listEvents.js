/**
 * @jsx React.DOM
 */
'use strict';

define(
  ['/js/events/common.js', '/js/orgs/common.js'],
  function(eventC, orgC) {
    return function(pageData) {
      var OrgBox = orgC.OrgBox;
      var EventListHeader = eventC.EventListHeader;
      var EventListItem = eventC.EventListItem;
      var EventHeader = eventC.EventHeader;
      React.renderComponent(<div>
          <EventListHeader />
        </div>, 
        document.getElementById('page-header'));
      React.renderComponent(<div>
          <section class="main-page">
          <h1>{"Events"}</h1>
          {pageData.events.map(function(event) {
            return <EventListItem event={event} />;
          })}
          </section>
        </div>,
        document.getElementById('content')
      );
      React.renderComponent(
        <div>
          {"POPULAR ORGS"}
        </div>,
        document.getElementById('aside')
      );
    };
  }
);
