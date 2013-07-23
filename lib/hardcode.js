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
        description: "## THIS IS WEB!\n\n*WELCOME TO WEB!*",
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
    facebook: "GtWebdev"
  }
];
exports.Orgs = {};

exports.Orgs.getOrgById = function(id, cb) {
  if (id == 1) {
    cb(null, exports.orgs[0]);
  } else {
    cb(404);
  }
};

exports.Orgs.getOrgBySlug = function(slug, cb) {
  if (slug == "webdev") {
    cb(null, exports.orgs[0]);
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

exports.events = [
  {
    title: "Welcome to Webdev",
    time: new Date().getTime(),
    description: "## THIS IS WEB!\n\n*WELCOME TO WEB!*",
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
