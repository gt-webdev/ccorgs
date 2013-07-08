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
    cover: "#37a9ff",
    github: "gt-webdev",
    facebook: "GtWebdev"
  }
];

exports.getOrgById = function(id, cb) {
  if (id == 1) {
    cb(null, exports.orgs[0]);
  } else {
    cb(404);
  }
};

exports.getOrgBySlug = function(slug, cb) {
  if (slug == "webdev") {
    cb(null, exports.orgs[0]);
  } else {
    cb(404);
  }
};
