'use strict';

var util = require('util'),
    md5 = require('MD5');

exports.orgs = [
  {
    _id: "1",
    name: "{gt: webdev}",
    slug: "webdev",
    desc: [
      {
        title: "About",
        content: "We are an org dedicated to advocating web deolpment and encouraging a strong community of web developers within the college of computing"
      }
    ],
    email: "thegtwebdev@gmail.com",
    emailHash: md5('thegtwebdev@gmail.com'),
    announcements: [
      {
        "type": "important",
        "msg": "I LIKE HAMMERS!"
      }
    ],
    events: [
      {
        title: "Welcome to Webdev",
        time: new Date().getTime(),
        body: "## THIS IS WEB!\n\n*WELCOME TO WEB!*"
      }
    ],
    admin: [
      {
        name: "Yuval Dekel",
        username: "thedekel",
        id: 1,
        fbid: 641657005,
        email: "thedekel@gmail.com"
      }
    ],
    mods: [],
    cover: "#37a9ff",
    github: "gt-webdev",
    short: "We sell webz and webz accessories",
    facebook: "GtWebdev"
  },
  {
    _id: "2",
    name: "SAB",
    slug: "sab",
    desc: [
      {
        title: "About",
        content: "COME TO SAB\n\nBE IN SAB\n\nNO LARPING."
      }
    ],
    email: "thedekel@gmail.com",
    emailHash: md5('thedekel@gmail.com'),
    announcements: [
      {
        "type": "important",
        "msg": "I LIKE HAMMERS!"
      }
    ],
    events: [
      {
        title: "Welcome to Webdev",
        time: new Date().getTime(),
        body: "## THIS IS WEB!\n\n*WELCOME TO WEB!*"
      }
    ],
    admin: [
      {
        name: "Yuval Dekel",
        username: "thedekel",
        id: 1,
        fbid: 641657005,
        email: "thedekel@gmail.com"
      }
    ],
    mods: [],
    cover: "#37a9ff",
    github: "sabsab",
    short: "COME TO SAB, BE IN SAB.",
    facebook: "SabAtCC"
  }
];
exports.Orgs = {};

exports.Orgs.getOrgById = function(id, cb) {
  if (id == 1) {
    cb(null, exports.orgs[0]);
  } else if (id==2){
    cb(null, exports.orgs[1]);
  } else {
    cb(404);
  }
};

exports.Orgs.createOrg = function(org_data, cb) {
  console.log('trying to create org with data:', util.inspect(org_data));
  cb(null);
};

exports.Orgs.updateOrg = function(org_obj, cb) {
  console.log('trying to update org with data:', util.inspect(org_obj));
  cb(null);
};

exports.Orgs.deleteOrg = function(org_obj, cb) {
  console.log('trying to delet org with data:', util.inspect(org_obj));
  cb(null);
};

exports.Orgs.getOrgBySlug = function(slug, cb) {
  if (slug == "webdev") {
    cb(null, exports.orgs[0]);
  } else if (slug == "sab") {
    cb(null, exports.orgs[1]);
  } else {
    cb(404);
  }
};

exports.Orgs.getAll = function(cb) {
  cb(null, exports.orgs);
};

exports.users = [
  {
    name: "Yuval Dekel",
    username: "thedekel",
    id: 1,
    fbid: 641657005,
    email: "thedekel@gmail.com",
    dekel: true,
    admin: true,
    orgs:
    {
      _id: "1",
      name: "{gt: webdev}",
      slug: "webdev",
      cover: "#37a9ff",
      github: "gt-webdev",
      facebook: "GtWebdev",
      email: "thegtwebdev@gmail.com",
      short: "We sell webz and webz accessories"
    }
  }
];

exports.Users = {};

exports.Users.getByFBId = function(fbid, cb) {
  if (fbid && fbid == 641657005) {
    cb(null, exports.users[0]);
  } else {
    cb({errnum: 404, msg: "User with the provided fbid was not found!"});
  }
};

exports.Users.getById = function(id, cb) {
  if (id && id == 1) {
    cb(null, exports.users[0]);
  } else {
    cb({errnum: 404, msg: "User with the provided id was not found!"});
  }
};

exports.Users.getByUsername = function(username, cb) {
  if (username && username == 'thedekel') {
    cb(null, exports.users[0]);
  } else {
    cb({errnum: 404, msg: "User with the provided username was not found!"});
  }
};

exports.Users.getAll = function(cb) {
  cb(null, exports.users);
};

exports.Users.createFromFB = function(fb_profile, cb) {
  console.log("trying to create user from fb_data:", util.inspect(fb_profile));
  cb(null, fb_profile);
};

exports.Users.deleteUser = function(user, cb) {
  console.log("trying to delete user from fb_data:", util.inspect(user));
  cb(null);
};


exports.Users.updateUser = function(user_obj, cb) {
  console.log('trying to update user with data:', util.inspect(user_obj));
  cb(null);
};

exports.events = [
  {
    _id: "1",
    title: "Welcome to Webdev",
    time: new Date().getTime(),
    body: "## THIS IS WEB!\n\n*WELCOME TO WEB!*",
    org: {
      _id: "1",
      name: "{gt: webdev}",
      slug: "webdev",
      cover: "#37a9ff",
      github: "gt-webdev",
      facebook: "GtWebdev",
      email: "thegtwebdev@gmail.com",
      short: "We sell webz and webz accessories"
    }
  }
];

exports.Events = {};

exports.Events.getAll = function(cb) {
  cb(null, exports.events);
};

exports.Events.getByOrgId = function(orgid, cb) {
  if (orgid && orgid == "1") {
    cb(null, [exports.events[0]]);
  } else {
    cb({errnum: 404, msg: "Org with id '"+orgid+"' could not be found"});
  }
};

exports.Events.getByOrgSlug = function(slug, cb) {
  if (slug && slug == "webdev") {
    cb(null, [exports.events[0]]);
  } else {
    cb({errnum: 404, msg: "Org with slug '"+slug+"' could not be found"});
  }
};

exports.Events.getById = function(id, cb) {
  if (id && id == "1") {
    cb(null, exports.events[0]);
  } else {
    cb({errnum: 404, msg: "event with id '"+id+"' could not be found"});
  }
};

exports.Events.createEvent = function(event_data, cb) {
  var x;
  var event = Object.create(exports.events[0]);
  for (x in event_data) {
    event[x] = event_data[x];
  }
  cb(null, event);
};

exports.Events.updateEvent = function(event_obj, cb) {
  console.log('trying to update event with data:', util.inspect(event_obj));
  cb(null);
};

exports.Events.deleteEvent = function(event_obj, cb) {
  console.log('trying to delet event with data:', util.inspect(event_obj));
  cb(null);
};
