/**
 * @jsx React.DOM
 */
'use strict';

define(
  ['/js/common.js', '/js/events/common.js'],
  function(common, eventC) {
    return function(pageData) {
      var EventHeader = eventC.EventHeader;
      var AttendeesList = eventC.AttendeesList;
      var TabBox = common.TabBox;
      React.renderComponent(
        <EventHeader event={pageData.event} />,
        document.getElementById('page-header')
      );
      var tabs = [
        {
          name: "description",
          title: "Description",
          type: "markdown",
          content: "**HELLO WORLD!**\n\n##HELLO!"
        }
      ];
      React.renderComponent(
        <div>
          <TabBox tabs={pageData.event.desc} />
        </div>,
        document.getElementById('content')
      );
      React.renderComponent(
        <div>
          <AttendeesList att={pageData.event.attendees} />
        </div>,
        document.getElementById('aside')
      );
    };
  }
);
