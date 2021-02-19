const express= require ('express')
const mongojs=require ('mongojs')
//DB connection, mongojs will make 'todos' collection 
const db=mongojs('TODODB',['todos']) 
const app=express();

//make one static page and use it all the time
app.use(express.static(__dirname+"/public"));

app.listen(3000,()=>{
    console.log("Listening to port 3000");
})