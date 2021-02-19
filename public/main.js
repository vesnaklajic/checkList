var btId=document.querySelector('#addBtn');
var input=document.querySelector('input');

//on clik btn Create take a value 
btId.addEventListener('click',()=>{
let inputVal=input.value;
//connection with server.js which can connect to mongojs
let xml= new XMLHttpRequest();
//open and sent the request to DB 
//method POST to preserve the data from inputVal
xml.open('post','/save');

//listening to comunication between 2 computers
xml.onreadystatechange=function(){
if(xml.readyState==4 && xml.status==200){
    console.log(xml.responseText);
}
}
//setting xml to send Json
xml.setRequestHeader('Content-Type','application/json')
//send a Json format of InputVal to server.js
//with an object where a msg is inputval
xml.send(JSON.stringify({msg:inputVal}));
})