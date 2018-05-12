var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render("index", {
    title: "jjjansma.com"
  });
});

app.get('/try', function(req, res){
  res.render("try", {
    title: "jjjansma.com"
  });
});

// app.listen(3000, function(){
//   console.log("Server started on Port 3000.");
// });

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
