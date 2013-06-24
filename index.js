var express = require("express");

var app = express();

app.get("/", function(req, res) {
  res.end("hello orgs");
});

app.listen(process.env.PORT || 5000);
