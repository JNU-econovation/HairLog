// npm  
const createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    redis = require('redis'),
    RedisStore = require('connect-redis')(session),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    helmet = require('helmet'),
    hpp = require('hpp');


const logger = require('./BackEnd/logger/logger.js');


// router
const indexRouter = require('./BackEnd/src/routes/index'),
    usersRouter = require('./BackEnd/src/routes/users'),
    apiTest = require('./BackEnd/src/routes/api')
    apiDocsRouter = require('./BackEnd/src/routes/api-docs');


// add config 
const dotenv = require('dotenv'),
    sequelize = require('./DB/sequelize/models').sequelize,
    passportConfig = require('./BackEnd/passport');

// config
dotenv.config();
sequelize.sync();
passportConfig();


// express start
var app = express();


// port
app.set('httpPort', process.env.PORT || 3000);


// view engine setup
app.set('views', path.join(__dirname, '/BackEnd/views'));
app.set('view engine', 'jade');
// app.set('view engine', 'html');
// nunjucks.configure(path.join(__dirname, 'html 위치'), {
//   express: app,
//   watch: true
// });

// add middleware
if(process.env.NODE_ENV==='production'){
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(hpp());
} else {
  app.use(morgan('dev'));
}
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
  legacyMode: true
});
redisClient.connect()
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  store:  new RedisStore({ client: redisClient }),
};
if(process.env.NODE_ENV==='production'){
  sessionOption.proxy=true;
  // sessionOption.cookie.secure=true;
}
app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());


// add router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiTest);
app.use('/api-docs', apiDocsRouter);




// catch 404 and forward to error handler  
app.use((req,res,next) => { 
  const err = new Error('NotFound');
  err.status=404;
  logger.info('hello');
  logger.error(err.message);
  next(err);
});

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler  
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});


app.listen(app.get('httpPort'), () => {
  console.log(app.get('httpPort'), '번 포트에서 대기중');
});

module.exports = app;
