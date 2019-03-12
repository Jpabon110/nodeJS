const express = require('express');
const morgan = require('morgan');
const exphds= require('express-handlebars');
const path = require('path');

const flash = require('connect-flash');
const session = require('express-session');
const mysqlStore = require('express-mysql-session');
require('dotenv').config();

const { database } = require('./key');

//initializacion

const app = express();
//setting
app.set('port',process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphds({
 defaultLayout:'main',
 layoutsDir: path.join(app.get('views'),'layout'),
 partialsDir: path.join(app.get('views'),'partials'),
 extname: '.hbs',
 helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//middlewares
app.use(session({
    secret: 'ssshThisASecret',
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));     
app.use(express.json());

//Global varibles
app.use((req, res, next) => {
     app.locals.success = req.flash('success');
    next();
 });

//routes
// se especifica que se usara  la carpeta "routes" y todos sus archivos para especificara donde vamos
app.use(require('./routes'));
app.use(require('./routes/auth'));
app.use('/posts',require('./routes/links'));

//public
app.use(express.static(path.join(__dirname,'public')));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});    
