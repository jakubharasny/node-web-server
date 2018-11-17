/* eslint-disable no-console */
const express = require('express');
const hbs = require('hbs'); // eslint-disable-line
const app = express();
const fs = require('fs');

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');


// handlebar helpers
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => text.toUpperCase());

// all files/pages inside public directory
// Express Middleware

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', `${log}\n`, (err) => {
    if (err) {
      console.log('Unable to append server.log');
    }
  });
  next(); // necessary for middleware to finish
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(`${__dirname}/public`));

// specific pages rendered through hbs
app.get('/', (req, res) => {
  res.render('homepage.hbs', {
    pageTitle: 'HomePage',
    welcome: 'Siema cie ludzie',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

// custom page when 404
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Lets just say that this is 404',
  });
});

app.listen(3000, () => {
  console.log('Server is up on localhost:3000');
});
