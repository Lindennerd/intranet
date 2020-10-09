const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('client-sessions');
const fileupload = require('express-fileupload');
const hbs = require('express-handlebars');
const hbshelpers = require('handlebars-helpers');
const moment = require('moment');

require('dotenv').config();
require('./repository/database').connect();

const indexRouter = require('./routes/index');
const securityRouter = require('./routes/security');
const usersRouter = require('./routes/users');
const profileRouter = require('./routes/profile');
const scheduleRouter = require('./routes/schedule');

const app = express();
const multihelpers = hbshelpers();

app.use(fileupload());

app.use(session({
  cookieName: 'session', // cookie name dictates the key name added to the request object
  secret: process.env.SECRET, // should be a large unguessable string
  duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
  activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));

app.engine('hbs', hbs({
  partialsDir: ["views/partials"],
  extname: '.hbs',
  layoutsDir: 'views',
  defaultLayout: 'layout',
  helpers: {
    formatdate: function (date, format) {
      return moment(date).format(format);
    },
    multihelpers
  }
}))

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/security', securityRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);
app.use('/schedule', scheduleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
