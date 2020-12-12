const { SSL_OP_NO_TICKET } = require('constants');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
var expressHbs = require('express-handlebars')
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('connect-flash');
var MongoStore = require('connect-mongo')(session);

const server = require('http').createServer(app);
const io = require('socket.io')(server);
const db = require('./config/keys').MONGO_URI;

const socket = require('./socket/socket');


mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }).then(() => console.log('Connected')).catch(err => console.log(err));
require('./config/passport');
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
const { urlencoded } = require('express');
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(validator());
app.use(cookieParser());
app.use(session({
    secret: 'secret',
 resave: false,
  saveUninitialized: false,
store: new MongoStore({ mongooseConnection: mongoose.connection }),
cookie: { maxAge: 180*60*1000}
}));
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }))
app.set('views', path.join(__dirname, 'views'));
app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
})
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'frontend')));




app.use('/admin', adminRouter);
app.use('/', indexRouter);

socket(io)

server.listen(3000);
