'use strict';

module.exports.defineModels = function(remongo) {
  var Org, Event, User;
  // Org schema
  Org = remongo.createSchema();
  Org.publics({
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    cover: {
      type: String
    },
    github: {
      type: String
    },
    short: {
      type: String,
      required: true
    },
    facebook: {
      type: String
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    emailHash: {
      type: String,
      required: true
    }
  });
  Org.privates({
    desc: {
      type: Object,
      array: true,
      array_limit: 0
    },
    announcements: {
      type: Object,
      array: true,
      array_limit: 0
    }
  });
  Org.embeds({
    admin: {
      type: "User",
      required: true,
      include_anyway: true
    },
    mods: {
      type: "User",
      array: true,
      array_limit: 0,
      include_anyway: true
    },
    events: {
      type: "Event",
      array: true,
      array_limit: 10
    }
  });
  Org.save("Org");
  // Event schema
  Event = remongo.createSchema();
  Event.publics({
    title: {
      type: String,
      required: true
    },
    stime: {
      type: Date,
      required: true
    },
    etime: {
      type: Date,
      required: true
    },
    short: {
      type: String,
      required: true
    }
  });
  Event.privates({
    desc: {
      type: Object,
      array: true,
      required: true
    }
  });
  Event.embeds({
    org: {
      type: "Org",
      required: true
    },
    attendees: {
      type: "User",
      array: true
    }
  });
  Event.save("Event");
  // User schema
  User = remongo.createSchema();
  User.publics({
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    fbid: {
      type: Number,
      required: false,
      unique: true
    },
    emailHash: {
      type: String
    }
  });
  User.privates({
    dekel: {
      type: Boolean,
      required: true
    },
    admin: {
      type: Boolean,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    }
  });
  User.embeds({
    orgs: {
      type: "Org",
      array: true
    }
  });
  User.save("User");
};
