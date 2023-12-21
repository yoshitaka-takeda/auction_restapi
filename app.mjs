// Tidying-up
// var createError = require('http-errors');
import * as errors from 'http-errors';
const e = errors();

// var express = require('express');
import fastify from "fastify";
import * as dotenv from "dotenv";
import pino from "pinojs";
import * as cors from "@fastify/cors";

dotenv.config();

// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
import path from 'path';
import cookieParser from 'cookie-parser';

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();
try{
  const app = fastify();
  app.use(cors);

  // view engine setup
  // app.set('views', path.join(__dirname, 'views'));
  // app.set('view engine', 'pug');

  // app.use(logger('dev'));
  // app.use(express.json());
  // app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', indexRouter);
  app.use('/users', usersRouter);

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
}catch(e){
  throw new error(e);
}

module.exports = app;
