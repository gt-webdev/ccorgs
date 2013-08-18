/**
 * @jsx React.DOM
 */
'use strict';

define(
  ["/js/common.js"],
  function(common) {
    var cGravatar = common.Gravatar;
    var cNavbar = common.Navbar;
    var FacePile = common.FacePile;
    var Link = common.Link;
    var commonEventElements = {};
    var EventListHeader = React.createClass({
      render: function() {
        return <div>
          <h1>CoC Student Organizations</h1>
          <cNavbar />
          <h2>Events</h2>
        </div>;
      }
    });
    commonEventElements.EventListHeader = EventListHeader;

    var EventHeader = React.createClass({
      render: function() {
        console.log(this.props.event);
        return <div>
          <h1>CoC Student Organizations</h1>
          <cNavbar />
          <h2>{this.props.event.title}</h2>
          <FacePile main={this.props.event.org.admin} secondary={this.props.event.org.mods} />
        </div>;
      }
    });
    commonEventElements.EventHeader = EventHeader;

    var EventBox = React.createClass({
      render: function() {
        console.log(this.props.event);
        return <div class='event-box'>
          <Link href={this.props.href}>
          <h4>{this.props.event.title}</h4>
          <p>{this.props.event.short}</p>
          <p>{this.props.event.stime}</p>
          </Link>
        </div>;
      }
    });
    commonEventElements.EventBox = EventBox;

    var EventListItem = React.createClass({
      render: function() {
        return <div class='event-item'>
          <Link href={'/'+this.props.event.org.slug + '/events/' + this.props.event._id}>
          <cGravatar hash={this.props.event.org.emailHash} size={100} />
          <h4>{this.props.event.title} <span class={'gray-text'}> by {this.props.event.org.name}</span></h4>
          <p>{this.props.event.short}</p>
          <p>{this.props.event.stime}</p>
          </Link>
        </div>;

      }
    });
    commonEventElements.EventListItem = EventListItem;

    var AttendeesList = React.createClass({
      render: function() {
        return <div>
            <h4>{"Who's going"}</h4>
            <FacePile secondary={this.props.att} />
          </div>;
      }
    });
    commonEventElements.AttendeesList = AttendeesList;

    return commonEventElements;
  }
);
 
