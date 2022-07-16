// npm  
import createError from 'http-errors';
import express from 'express';
import nunjucks from 'nunjucks';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
import cookieParser from 'cookie-parser';
import session from 'express-session';
import expressMySqlSession from 'express-mysql-session'
  let mysqlStore = expressMySqlSession(session)
import bodyParser from 'body-parser';
import passport from 'passport';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import csp from 'helmet-csp';

import logger from './BackEnd/logger/logger.js';


// router
import indexRouter from './BackEnd/src/routes/index.js';
import apiRouter from './BackEnd/src/routes/api.js';
import apiDocsRouter from './BackEnd/src/routes/api-docs.js';


// add config 
import dotenv from 'dotenv';
import sequelizeIndex from './DB/sequelize/models/index.js';
 const sequelize = sequelizeIndex.sequelize
import passportConfig from './BackEnd/passport/index.js';
import cloudinary from './BackEnd/src/function/cloudinary/config.js';

// config
dotenv.config();
sequelize.sync();
passportConfig();
cloudinary.config();


// express start
const app = express();


// port
app.set('httpPort', process.env.PORT || 3000);

app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, '/FrontEnd/html'), {
  express: app,
  watch: true
});

// add middleware
if(process.env.NODE_ENV==='production'){
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(hpp());
  app.use(csp({
    directives: {
      defaultSrc: ["https://hairlogapi.herokuapp.com/"],
      scriptSrc: ["*"],
      imgSrc: ["https://hairlogapi.herokuapp.com/", '*'],
    }
  }))
} else {
  app.use(morgan('dev'));
}
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/FrontEnd')));
app.use(session({
  resave : false,
  saveUninitialized : false,
  secret : process.env.SESSION_SECRET,
  cookie : {
    httpOnly : true,
    secure : false,
  },
}));
app.use(cookieParser());

const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
};


if(process.env.NODE_ENV==='production'){
  sessionOption.proxy=true;
  // sessionOption.cookie.secure=true;
}
app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());


// add router
app.use(cors());
app.use('/', indexRouter);
app.use('/api', apiRouter);
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

export default app;
