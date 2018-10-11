var express = require('express');
var app = express();
var path = require('path');
var mongoose = require("mongoose");
var port = 3000;
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/my-waypoints"); // connect to my-waypoints collection

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routeSchema = new mongoose.Schema({ // template for start and end locations to be saved to database
  startLoc: String,
  endLoc: String,

})

var Route = mongoose.model("Route", routeSchema);

// viewed at http://localhost:8080
app.get('/', function(req, res) {   // Display the index.html on the local machine
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post("/addroute", (req, res) => {  // save user inputted start and end loccation data to the my-waypoints collection
  var myData = new Route(req.body);
  myData.save()
  .then(item => {
    console.log("item saved");
  })
  .catch(err => {
  res.status(400).send("unable to save to database");
  });
});









app.listen(port, () => {  // listen to port 3000
    console.log("Server listening on port " + port);
});
