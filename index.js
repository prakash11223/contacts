const express = require("express");
const path = require("path");
const port = 7000;


const db = require('./config/mongoose');

const Contact = require("./models/contact");
const app = express();

app.set("view engine", 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static("assests"));

// // middleware1
// app.use(function(req, res, next) {
//     console.log("middleware1 called");
//     next() //next is for calling next middleware or further code otherwise it stuck at this position
// });
// app.use(function(req, res, next) {
//     console.log("middleware2 called");
//     next() //next is for calling next middleware or further code otherwise it stuck at this position
// });




var contactlist = [{
    name: "Prakash kumar",
    phone: '1111111111'
}, {
    name: "Riya Pramanick",
    phone: '0000000000'
}, {
    name: "Rohan kumar",
    phone: '5555555551'
}]
app.get('/', function(req, res) {
    // res.send('<h1>its running cool!</h1>')
    Contact.find({}, function(err, contacts) {
        if (err) {
            console.log('error in fetching contacts from db');
            return;
        }
        res.render('home', {
            'title': 'Contact List',
            contacts: contacts,
        });
    });

});
app.get('/practice', function(req, res) {
    res.render('practice', {
        'title': 'play with ejs'
    });
});
app.post('/create-contact', function(req, res) {
    // contactlist.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, data) {
        if (err) {
            console.log('error in creating a contact');
            return;
        }
        console.log('******', data)
        return res.redirect('back');
    });

});


//for deleting a contact
app.get('/delete-contact/', function(req, res) {
    //get the id from query in the url
    let id = req.query.id;
    //find contact in the database using id and delete them
    Contact.findByIdAndDelete(id, function(err) {
        if (err) {
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect("back");
    });

});
app.listen(port, function(err, data) {
    if (err) {
        console.log("error in running the server", err);
    }
    console.log("sucess", port);
})