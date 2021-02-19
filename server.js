const { urlencoded } = require('express');
const express = require('express')
const mongojs = require('mongojs')
//DB connection, mongojs will make 'todos' collection 
const db = mongojs('TODODB', ['todos'])
const app = express();

//to take a content from a req of POST
//need a body-parser or express
app.use(express.json());

//make one static page and use it all the time
app.use(express.static(__dirname + "/public"));

//mathod 'save' from the main.js
app.post('/save', (req, res) => {
    //getting msg property from req body
    let msg = req.body.msg;
    //save a msg into a DB
    db.todos.insert({ msg: msg, date: new Date().toDateString() }, (err, data) => {
        //send a msg to a main.js if OK,if we are connected
        res.send("OK");
    })
})
//route /get-data to collect the data from DB
app.get('/get-data', (req, res) => {
    //open the DB , table todos
    db.todos.find((err, data) => {
        res.send(data);
    });
})

app.post('/del-todo', (req, res) => {
    let id = req.body.id;
    db.todos.remove({ "_id": db.ObjectId(id) }, (err, data) => {
        res.send("Deleted")
    });
})



app.listen(3000, () => {
    console.log("Listening to port 3000");
})