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
        <OrgHeader org={pageData.org} />,
        document.getElementById('page-header')
      );
      var events = [];
      for (var i = 0; i < pageData.org.events.length; i++) {
        events.push(<EventBox 
          event={pageData.org.events[i]}
          href={'/'+pageData.org.slug + '/events/' + pageData.org.events[i]._id} />);
      }
      React.renderComponent(
        <OrgSection org={pageData.org}>
          <section style={{borderTopColor: pageData.org.cover}}>
            <TabBox tabs={pageData.org.desc} />
          </section>
          <section style={{borderTopColor: pageData.org.cover}}>
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
