
console.log("Welcome to my todo app");

let todoDataSection=document.getElementById('todo-data');
function addTodo(todoData){
    let rowDiv=document.createElement("div");
    let todoItem=document.createElement("div");
    let todoNumber=document.createElement("div");
    let todoDetail=document.createElement("div");
    let todoStatus=document.createElement("div");
    let todoAction=document.createElement("div");
    let deleteButton=document.createElement("button");
    let finishedButton=document.createElement("button");
    let hr=document.createElement("hr");

    //adding classes
    rowDiv.classList("row")
    todoItem.classList.add("todo-item", "d-flex", "flex-row", "justify-content-between", "align-items-center")
    todoNumber.classList.add("todo-no");
    todoDetail.classList.add("todo-detail","text-muted");
    todoStatus.classList.add("todo-status","text-muted");
    todoAction.classList.add("todo-action","d-flex","justify-content-start","gap-2");
    deleteButton.classList.add("btn","btn-danger");
    finishedButton.classList.add("btn","btn-success");


    todoNumber.textContent="1";
    todoDetail.textContent=todoData;//sets the todo text sent from the inptut element
    todoStatus.textContent="In Progress";
    deleteButton.textContent="Delete";
    finishedButton.textContent="Finished";

    todoAction.appendChild(deleteButton);
    todoAction.appendChild(finishedButton);

    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoAction);

    rowDiv.appendChild(todoItem);
    rowDiv.appendChild(hr);

    todoDataSection.appendChild(rowDiv); 
}









































//Reference
// let  getTodosButton=document.getElementById('get-todos');
//Registration of an event listener
// getTodosButton.addEventListener("click",()=>{
//     console.log("clicked");   
// });


// getTodosButton.onclick=()=>{
//     console.log("clicked");
    
// }

// function clickBtn (){
//     console.log("Clicked");
    
// }
