//mainRow is party of index.html whis makes a cards
let mainRow = document.querySelector('#main-row');
var btId = document.querySelector('#addBtn');
var input = document.querySelector('input');

//on clik btn Create take a value 
btId.addEventListener('click', () => {
    let inputVal = input.value;
    //connection with server.js which can connect to mongojs
    let xml = new XMLHttpRequest();
    //open and sent the request to DB 
    //method POST to preserve the data from inputVal
    xml.open('post', '/save');

    //listening to comunication between 2 computers
    xml.onreadystatechange = function () {
        if (xml.readyState == 4 && xml.status == 200) {
            displayTodos();
        }
    }
    //setting xml to send Json
    xml.setRequestHeader('Content-Type', 'application/json')
    //send a Json format of InputVal to server.js
    //with an object where a msg is inputval
    xml.send(JSON.stringify({ msg: inputVal }));

})

//function to collect data from DB
function displayTodos() {
    //var data is a Promise 
    let data = new Promise((resolve, reject) => {
        let xml = new XMLHttpRequest();
        xml.open('get', '/get-data');
        xml.onreadystatechange = () => {
            if (xml.readyState == 4 && xml.status == 200) {
                //what we got back from the server
                //if OK it will go to .then 
                resolve(JSON.parse(xml.responseText))
            }
        }
        xml.send();
    })
    //when a data arrive run this function 
    //to make a card for each todo task
    data.then((data) => {
        let text = '';
        //go through all the data from DB 
        for (let i = 0; i < data.length; i++) {
            //will make a card 
            text += `
    <div class="col-6">
    <div class="card">
        <div class="card header">
           <button class="btn btn-sm btn-secondary float-left">Task${i + 1}</button>
           <button class="btn btn-sm btn-succes float-right">${data[i].date}</button>
        </div>
        <div class="card body text-center">
            <h3>${data[i].msg}</h3>
        </div>
        <div class="card footer text-center">
            <button data-id="${data[i]._id}" class="btn btn-sm btn-danger">Delete</button>
        </div>
    </div>
</div>`
        }
        //using a mainRow to display a card
        mainRow.innerHTML = text;

        let alldeleteBtns = document.querySelectorAll('[data-id]');

        for (let i = 0; i < alldeleteBtns.length; i++) {
            alldeleteBtns[i].addEventListener('click', deleteTodo);
        }
    })
}
displayTodos();

function deleteTodo() {
    
    let xml = new XMLHttpRequest();
    xml.open('post','/del-todo');
    xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
            displayTodos();
        }
    }
    xml.setRequestHeader('Content-Type','application/json')
    xml.send(JSON.stringify({id:this.getAttribute('data-id')}));
}