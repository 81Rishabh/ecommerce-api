const express = require('express');
const app  = express();
const port = 5000
const path = require('path');
const dotenv = require('dotenv');
const errorHandler = require('./middileware/error');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
dotenv.config({ path: path.resolve(__dirname, '../.env') });


// Establize database connection 
const db = require('./config/db');

//  use bodyparser to parse the form data
app.use(express.urlencoded({extended : false}));
app.use(express.json());

// logger
app.use(morgan('dev'));

// cors middileware
app.use(cors({origin: 'http://localhost:3000'}))

// Establize initial routes
app.use('/' , require('./routes/api/index'));

// Error handle middleware
app.use(errorHandler);



app.listen(process.env.PORT || port, function(err) {
     if(err) {
         console.error(err);
         return;
     }
     console.log('listening on port' , process.env.port || port);
});