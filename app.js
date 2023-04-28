// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy



// // passport config

// passport.use(new LocalStrategy(Account.authenticate()));
// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());
// //Get the default connection
// var db = mongoose.connection;
// //Bind connection to error event
// db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
// db.once("open", function () {
//   console.log("Connection to DB succeeded")
// });

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var rabbitRouter = require('./routes/Rabbit');
// var boardRouter = require('./routes/board');
// var SelectorRouter = require('./routes/selector');
// var RabbitRouter = require("./models/Rabbit");
// var resourceRouter = require('./routes/resource');

// // Use the existing connection
// // The Account model
// var Account =require('./models/account');
// passport.use(new LocalStrategy(Account.authenticate()));
// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());
// //Get the default connection
// var db = mongoose.connection;
// //Bind connection to error event
// db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
// db.once("open", function () {
//   console.log("Connection to DB succeeded")
// });

// var app = express();

// // We can seed the collection if needed onserver start
// async function recreateDB() {
//   // Delete everything
//   await RabbitRouter.deleteMany();
//   let instance1 = new RabbitRouter({ breed: "MiniLop", color: 'Brown', price: 40 });
//   let instance2 = new RabbitRouter({ breed: "French Lop", color: 'White', price: 60 });
//   let instance3 = new RabbitRouter({ breed: "Holland lop", color: 'Grey', price: 70 });
//   instance1.save().then(() => {

//     console.log("Object 1 created")

//   }).catch((err) => {

//     console.log(err);

//   })
//   instance2.save().then(() => {

//     console.log("Object 2 created")

//   }).catch((err) => {

//     console.log(err);

//   })
//   instance3.save().then(() => {

//     console.log("Object 3 created")

//   }).catch((err) => {

//     console.log(err);

//   })
// }
// let reseed = true;
// if (reseed) { recreateDB(); }
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     Account.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }))

//   app.use(require('express-session')({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false
//   }));
//   app.use(passport.initialize());
//   app.use(passport.session());
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/Rabbit', rabbitRouter);
// app.use('/board', boardRouter);
// app.use('/selector', SelectorRouter);
// app.use('/resource', resourceRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;



// require('dotenv').config();
// const connectionString =
//   process.env.MONGO_CON
// mongoose = require('mongoose');
// mongoose.connect(connectionString,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   });

//Added new code


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function (username, password, done) {
    Account.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rabbitRouter = require('./routes/Rabbit');
var boardRouter = require('./routes/board');
var SelectorRouter = require('./routes/selector');
var RabbitRouter = require("./models/Rabbit");
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Rabbit', rabbitRouter);
app.use('/board', boardRouter);
app.use('/selector', SelectorRouter);
app.use('/resource', resourceRouter);

require('dotenv').config();
const connectionString =
  process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

// passport config
// Use the existing connection
// The Account model
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

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


//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function () {
  console.log("Connection to DB succeeded")
});


// We can seed the collection if needed onserver start
async function recreateDB() {
  // Delete everything
  await RabbitRouter.deleteMany();
  let instance1 = new RabbitRouter({ breed: "MiniLop", color: 'Brown', price: 40 });
  let instance2 = new RabbitRouter({ breed: "French Lop", color: 'White', price: 60 });
  let instance3 = new RabbitRouter({ breed: "Holland lop", color: 'Grey', price: 70 });
  instance1.save().then(() => {

    console.log("Object 1 created")

  }).catch((err) => {

    console.log(err);

  })
  instance2.save().then(() => {

    console.log("Object 2 created")

  }).catch((err) => {

    console.log(err);

  })
  instance3.save().then(() => {

    console.log("Object 3 created")

  }).catch((err) => {

    console.log(err);

  })
}
let reseed = true;
if (reseed) { recreateDB(); }

module.exports = app;