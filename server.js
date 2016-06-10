var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');

var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');

var db = require('./config/db');


require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'anystringoftext',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.set('view engine', 'ejs');

require('./app/routes.js')(app, passport);

db.connect(db.MODE_PRODUCTION, function (err) {
    if (err) {
        console.log('Unable to connect to the User Database.');
        process.exit(1);
    } else {
        app.listen(port, function () {
            console.log('Listening on port ' + port + ' ...');
        })
    }
});



