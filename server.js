const express = require('express');
const app  = express();
const port = 3000;

// Establize database connection 
const db = require('./config/db');

//  use bodyparser to parse the form data
app.use(express.urlencoded({extended : false}));
app.use(express.json());

// Establize initial routes
app.use('/' , require('./routes/api/index'));

app.listen(port, function(err) {
     if(err) {
         console.error(err);
         return;
     }
     console.log('listening on port' , port);
});