/**
 * @jsx React.DOM
 */
'use strict';

define(
  ["/js/common.js"],
  function(common) {
    var cGravatar = common.Gravatar;
    var commonOrgElements = {};
    commonOrgElements.OrgMiniBox = React.createClass({
      render: function() {
        return <div>
            <a href="#">
              <cGravatar size={100} />
              <h4>{"Org Name"}</h4>
              <p>{"Org Description"}</p>
            </a>
          </div>
      }
    });
    commonOrgElements.OrgHeader = React.createClass({
      render: function() {
        return <div>
          {this.props.title}
        </div>
      }
    });
    return commonOrgElements;
  }
);
 
