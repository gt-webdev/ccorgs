var express = require("express"),
    routes = require("./lib/routes");

var app = express();

app.use(express.bodyParser());
app.use(express.methodOverride());

routes.define(app);

app.listen(process.env.PORT || 5000);
