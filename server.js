const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const random = require('random-number-generator');

const port = process.env.PORT || 3000;
var app = express();

// setting hbs partials views directory
hbs.registerPartials(__dirname + '/views/partials');

// setting the view engine (hbs)
app.set('view engine', 'hbs');

// Another Middleware (app.use...)
// This gets called everytime there is a request to the server
app.use((req, res, next) => {
  var now = new Date().toString();

  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync('server.log', log + '\n');


  // This next must be called always when we are done with Middleware
  // so the application can continue the execution normally.
  next();
});

// Maintenance mode Middleware
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// setting a folder for static contents (css, js, etc) (Middleware)
app.use(express.static(__dirname + '/public'));


// Registering a helper (custom function that we want to use inside hbs templates)
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/test-json', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.send({
    name: 'Julio',
    likes: [
      'Skateboarding',
      'Futbol'
    ]
  });
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page Title',
    welcomeMessage: 'Welcome to JC Website'
  });
});

app.get('/once', (req, res) => {
  var winningNumber = "" + random(9) + random(9) + random(9) + random(9) + random(9);
  res.render('once.hbs', {
    pageTitle: 'La ONCE App',
    winningNumber: winningNumber
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page Title',
    welcomeMessage: 'About Message'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'JC Projects Title',
    welcomeMessage: 'JC Projects Here'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request! :('
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
