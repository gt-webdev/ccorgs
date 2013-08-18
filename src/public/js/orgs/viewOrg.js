/**
 * @jsx React.DOM
 */
'use strict';

define(
  ['/js/common.js', '/js/orgs/common.js', '/js/events/common.js'],
  function(common, orgC, eventC) {
    return function(pageData) {
      var EventBox = eventC.EventBox;
      var OrgHeader = orgC.OrgHeader;
      var TabBox = common.TabBox;
      console.log(pageData);
      React.renderComponent(
        <OrgHeader org={pageData} />,
        document.getElementById('page-header')
      );
      React.renderComponent(
        <div>
          <TabBox tabs={pageData.desc} />
          <h3>Events</h3>
          {pageData.events.map(function(event) {
            return <EventBox 
                    event={event}
                    href={'/'+pageData.slug + '/events/' + event._id}
                    />;
          })}
        </div>,
        document.getElementById('content')
      );
    };
  }
);
