//first require a liberary
const mongoose = require('mongoose');
// connection is made from database
mongoose.connect('mongodb://localhost/contacts_list_db');
// connection via store to intaract thourogh db or acquare database
const db = mongoose.connection;
// if any error came it print
db.on('error', console.error.bind(console, 'connection error:'));
// if it is up and running then print success 
db.once('open', function() {
    console.log("succesfully connected to the database");
});