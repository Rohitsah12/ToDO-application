
console.log("Welcome to my todo app");

let todos=[];

let todoDataList=document.getElementById('todo-data-list');
let saveButton=document.getElementById("save-todo");
let todoInputBar=document.getElementById("todo-input-bar");
let getPendingTodosButton=document.getElementById("get-todos");
let darkModeSwitch = document.getElementById("flexSwichCheckDefault");

getPendingTodosButton.addEventListener("click",()=>{
    todos=todos.filter((todo)=>todo.status!="Finished");
    reRenderTodos();
})

darkModeSwitch.addEventListener("change", function toggleDarkMode() {
    if (darkModeSwitch.checked) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
});


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

function editTodo(event){
    let editButtonPressed=event.target;
    let indexToEdit=Number(editButtonPressed.getAttribute("todo-idx"));
    let detailDiv=document.querySelector(`div[todo-idx="${indexToEdit}"]`);
    let input=document.querySelector(`input[todo-idx="${indexToEdit}"]`);
    detailDiv.style.display="none";
    input.type="text";
    input.value=detailDiv.textContent;
}


function SaveEdittedtoDo(event){
    let input=event.target;
    let indexToEdit=Number(input.getAttribute("todo-idx"));

    let detailDiv=document.querySelector(`div[todo-idx="${indexToEdit}"]`);
    if(event.keyCode==13){
        detailDiv.textContent=input.value;
        detailDiv.style.display="block";
        input.value='';
        input.type="hidden"
    }
    
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
    let editButton=document.createElement("button");
    let hiddenInput=document.createElement("input")
    let hr=document.createElement("hr");

    //adding classes
    rowDiv.classList.add("row")
    todoItem.classList.add("todo-item", "d-flex", "flex-row", "justify-content-between", "align-items-center")
    todoNumber.classList.add("todo-no");
    todoDetail.classList.add("todo-detail","text-dark");
    todoStatus.classList.add("todo-status","text-dark");
    todoAction.classList.add("todo-action","d-flex","justify-content-start","gap-2");
    deleteButton.classList.add("btn","btn-danger","delete-todo");
    finishedButton.classList.add("btn","btn-success","finished-todo");
    editButton.classList.add("btn","btn-warning","edit-todo");
    hiddenInput.classList.add("form-control","todo-detail");
    hiddenInput.type="hidden"

    //Adding attributes
    finishedButton.setAttribute("todo-idx",todoCount-1);
    deleteButton.setAttribute("todo-idx",todoCount-1);
    editButton.setAttribute("todo-idx",todoCount-1);
    todoDetail.setAttribute("todo-idx",todoCount-1);
    hiddenInput.setAttribute("todo-idx",todoCount-1);
    hiddenInput.addEventListener("keypress",SaveEdittedtoDo)

    // adding listener

    deleteButton.onclick=removeTodo;
    finishedButton.onclick=finishedTodo;
    editButton.onclick=editTodo;
    


    todoNumber.textContent=`${todoCount}.`;
    todoDetail.textContent=todo.text;//sets the todo text sent from the inptut element
    todoStatus.textContent=todo.status;
    deleteButton.textContent="Delete";
    finishedButton.textContent=todo.finishedButtontext;
    editButton.textContent="Edit";

    todoAction.appendChild(deleteButton);
    todoAction.appendChild(finishedButton);
    todoAction.appendChild(editButton);

    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(hiddenInput);
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
