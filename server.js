const { urlencoded } = require('express');
const express= require ('express')
const mongojs=require ('mongojs')
//DB connection, mongojs will make 'todos' collection 
const db=mongojs('TODODB',['todos']) 
const app=express();

//to take a content from a req of POST
//need a body-parser or express
app.use(express.json());

//make one static page and use it all the time
app.use(express.static(__dirname+"/public"));

//mathod 'save' from the main.js
app.post('/save',(req,res) => {
    //getting msg property from req body
    let msg=req.body.msg;
    //send a msg to a main.js if OK,if we are connected
    res.send(msg);
})

app.listen(3000,()=>{
    console.log("Listening to port 3000");
})