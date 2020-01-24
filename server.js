require('./models/db');
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const path = require('path');

const app = express();
app.use(logger('dev'));
app.set('view engine','ejs');
app.use(express.static('views'));
app.set('views',path.join(__dirname,'/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var indexRoute = require('./controllers/controller.model');
app.use('/',indexRoute);
app.use('/addproject',indexRoute);
app.use('/admin',indexRoute);
app.use('/list',indexRoute);

port = process.env.PORT || 3973
app.listen(port,() => {
    console.log("SERVR RUNNING ON PORT: " + port);
})