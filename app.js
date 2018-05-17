const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

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
    title: "jjjansma"
  });
});

app.get('/blend', function(req, res){
  res.render("blend", {
    title: "blend"
  });
});

app.use(function(req, res, next) { // i catch 404s
  console.log("404");
  res.status(404).render("404", {
    title: "404 Not Found"
  });
});

app.use(function (err, req, res, next) {
  console.log("ERROR");
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`jjjansma.com listening at http://${host}:${port}`);
});
