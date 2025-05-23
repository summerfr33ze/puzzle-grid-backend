const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const jwt = require('jsonwebtoken')

const passport = require('passport')
const jwtStrategy = require('./strategies/jwt')
passport.use(jwtStrategy);

const cors = require("cors")

const apiRouter = require('./routes/api');

const app = express();
app.use(cors({origin: 'http://localhost:3001'}));


const mongoose = require("mongoose")
mongoose.set('strictQuery', false)
const mongoDB = "mongodb+srv://trevorjamesmurphy:Dacksnebula1@cluster0.gmpgdxl.mongodb.net/puzzle-grid?retryWrites=true&w=majority"
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}






app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use('/', apiRouter);






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



module.exports = app;
