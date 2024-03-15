const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventosRouter = require('./routes/eventos');
var materiasRouter = require('./routes/materias');
var profesoresRouter = require('./routes/profesores');
var seccionesRouter = require('./routes/secciones');
var usuariosRouter = require('./routes/usuarios');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/eventos', eventosRouter);
app.use('/materias', materiasRouter);
app.use('/profesores', profesoresRouter);
app.use('/secciones', seccionesRouter);
app.use('/usuarios', usuariosRouter)

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
