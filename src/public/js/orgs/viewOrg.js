/**
 * @jsx React.DOM
 */
'use strict';

define(
  ['/js/common.js', '/js/orgs/common.js', '/js/events/common.js'],
  function(common, orgC, eventC) {
    return function(pageData) {
      var EventBox = eventC.EventBox;
      var SignInBtn = common.SignInBtn;
      var OrgHeader = orgC.OrgHeader;
      var OrgSection = orgC.OrgSection;
      var TabBox = common.TabBox;
      React.renderComponent(
        <OrgHeader org={pageData} />,
        document.getElementById('page-header')
      );
      var events = [];
      for (var i = 0; i < pageData.events.length; i++) {
        events.push(<EventBox 
          event={pageData.events[i]}
          href={'/'+pageData.slug + '/events/' + pageData.events[i]._id} />);
      }
      React.renderComponent(
        <OrgSection org={pageData}>
          <section style={{borderTopColor: pageData.cover}}>
            <TabBox tabs={pageData.desc} />
          </section>
          <section style={{borderTopColor: pageData.cover}}>
            <h2>Events</h2>
            {events}
          </section>
        </OrgSection>,
        document.getElementById('content')
      );
      React.renderComponent(
        <div>
          {"MEMBERS"}
        </div>,
        document.getElementById('aside')
      );
    };
  }
);
