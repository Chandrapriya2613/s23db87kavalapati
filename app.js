var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
const connectionString =
  process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rabbitRouter = require('./routes/Rabbit');
var boardRouter = require('./routes/board');
var SelectorRouter = require('./routes/selector');
var RabbitRouter = require("./models/Rabbit");
var resourceRouter = require("./routes/resource");

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function () {
  console.log("Connection to DB succeeded")
});

var app = express();

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
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Rabbit', rabbitRouter);
app.use('/board', boardRouter);
app.use('/selector', SelectorRouter);
app.use('/resource', resourceRouter);

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
