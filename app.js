// npm
var createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    passport = require('passport'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan');


// router
var indexRouter = require('./BackEnd/src/routes/index'),
    usersRouter = require('./BackEnd/src/routes/users'),
    apiTest = require('./BackEnd/src/routes/api')
    apiDocsRouter = require('./BackEnd/src/routes/api-docs');


// add config 
var dotenv = require('dotenv'),
    sequelize = require('./DB/sequelize/models').sequelize,
    passportConfig = require('./BackEnd/passport');

// config
dotenv.config();
sequelize.sync();
passportConfig();


// express start
var app = express();


// port
app.set('httpPort', process.env.HTTP_PORT || 3000);


// view engine setup
app.set('views', path.join(__dirname, '/BackEnd/views'));
app.set('view engine', 'jade');
// app.set('view engine', 'html');
// nunjucks.configure(path.join(__dirname, 'html 위치'), {
//   express: app,
//   watch: true
// });

// add middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/BackEnd/public')));
app.use(session({
  resave : false,
  saveUninitialized : false,
  secret : process.env.SESSIONSECRET,
  cookie : {
    httpOnly : true,
    secure : false,
  },
}));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

const Swagger = require('./Swagger/Swagger');

// add router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiTest);
app.use('/api-docs', apiDocsRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// server start
app.listen(app.get('httpPort'), () => {
  console.log(app.get('httpPort'), '번 포트에서 대기중');
});

module.exports = app;
