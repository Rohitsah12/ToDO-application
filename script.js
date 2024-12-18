
console.log("Welcome to my todo app");

let todos=[];

let todoDataList=document.getElementById('todo-data-list');
let saveButton=document.getElementById("save-todo");
let todoInputBar=document.getElementById("todo-input-bar")

todoInputBar.addEventListener("keyup", function toggleSaveButton(){
    let todoText=todoInputBar.value;
    if(todoText.length==0){
        if(saveButton.classList.contains("disabled")) return;
        saveButton.classList.add("disabled");
    }
    else if(saveButton.classList.contains("disabled")){
        saveButton.classList.remove("disabled");
    }
   
})

saveButton.addEventListener("click",function getTextAndAddTodo(){
    let todoText=todoInputBar.value;
    let todo={text: todoText,status:'In progress',finishedButtontext:'finished'};
    todos.push(todo);
    // console.log(todoText);
    if(todoText.length==0){
        return;
    }
    addTodo(todo,todos.length);
    todoInputBar.value='';
})


function reRenderTodos(){
    todoDataList.innerHTML='';
    todos.forEach((element,idx)=>{
        addTodo(element,idx+1)
    });
}

function removeTodo(event){
    // console.log("clicked");
    // event.target.parentElement.parentElement.parentElement.remove();
    let deleteButtonPressed=event.target;
    let indexTobeRemoved=Number(deleteButtonPressed.getAttribute("todo-idx"))
    todos.splice(indexTobeRemoved,1);
    todoDataList.innerHTML='';
    todos.forEach((element,idx)=>{
        addTodo(element,idx+1)
    });
    reRenderTodos();
}



function finishedTodo(event){
    let finishButtonPressed=event.target;
    let indexToBeFinished=Number(finishButtonPressed.getAttribute("todo-idx"));

    //Toggle functionality

    if(todos[indexToBeFinished].status=="Finished"){
        todos[indexToBeFinished].status="In Progress";
        todos[indexToBeFinished].finishedButtontext="Finished";
    }
    else{
        todos[indexToBeFinished].status="Finished";
        todos[indexToBeFinished].finishedButtontext="Undo";
    }
    todos.sort((a,b)=>{
        if(a.status=='Finished'){
            return 1;
        }
        return -1;

    })

    reRenderTodos();
}

function addTodo(todo,todoCount){
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
    rowDiv.classList.add("row")
    todoItem.classList.add("todo-item", "d-flex", "flex-row", "justify-content-between", "align-items-center")
    todoNumber.classList.add("todo-no");
    todoDetail.classList.add("todo-detail","text-muted");
    todoStatus.classList.add("todo-status","text-muted");
    todoAction.classList.add("todo-action","d-flex","justify-content-start","gap-2");
    deleteButton.classList.add("btn","btn-danger","delete-todo");
    finishedButton.classList.add("btn","btn-success","finished-todo");

    finishedButton.setAttribute("todo-idx",todoCount-1);
    deleteButton.setAttribute("todo-idx",todoCount-1);
    deleteButton.onclick=removeTodo;
    finishedButton.onclick=finishedTodo;

    todoNumber.textContent=`${todoCount}.`;
    todoDetail.textContent=todo.text;//sets the todo text sent from the inptut element
    todoStatus.textContent=todo.status;
    deleteButton.textContent="Delete";
    finishedButton.textContent=todo.finishedButtontext;

    todoAction.appendChild(deleteButton);
    todoAction.appendChild(finishedButton);

    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoAction);

    rowDiv.appendChild(todoItem);
    rowDiv.appendChild(hr);

    todoDataList.appendChild(rowDiv); 
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
