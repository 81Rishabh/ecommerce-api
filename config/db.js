const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.connect('mongodb://localhost:27017/Products', {useNewUrlParser: true, useUnifiedTopology: true});

db.on('error' , function(err) {
   console.bind.error(console, "Error in conneting to mongodb");
});

db.once('open' , function() {
  console.log('Connected to mongodb.......✌️ ✌️ ✌️');
});