if (process.env.NODE_ENV !== 'production') {
    // checking if running in production environment.
    // NODE_ENV will be set by node automatically if so

    // loading dotenv vars to process.env
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

// reference to root router for requests froom root URL.
const indexRouter = require('./routes/index');

// setting view engine. 
// @TODO change to pug later https://expressjs.com/ru/guide/using-template-engines.html
app.set('view engine', 'ejs');
// каталог, в котором находятся файлы шаблонов.
app.set('views', __dirname + '/views');
// express layouts. Will be in one file layout
app.set('layout', 'layouts/layout');

// telling to use this layouts
app.use(expressLayouts);
// public files: styles, assets, js files
app.use(express.static('public'));

const mongoose = require('mongoose');
// connecting DB to env variable
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

// accessing connection to DB
const db = mongoose.connection;

db.on('error', error => console.error(error));
db.once('open', () => console.info('Connected to Mongoose DB!'));

// telling express to use this route for root URLs
app.use('/', indexRouter);

// using either specific port or default one
// process.env.PORT will be filled when deployed
app.listen(process.env.PORT || 3000);