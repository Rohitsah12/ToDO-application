function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || { todoList: [] };
    console.log(todos);
    return todos;
}

function addTodoToLocalStorage(todo) {
    const todos = loadTodos();
    todos.todoList.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function appendTodoInHtml(todo) {
    const todoList = document.getElementById("todoList");

    const todoItem = document.createElement("li");

    const textDiv=document.createElement("div")

    textDiv.textContent = todo.text; // Fixed: Changed `todo` to `todoItem`
    todoItem.classList.add("todoItem");

    const wrapper=document.createElement("div")
    wrapper.classList.add("todoButtons");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete"; // Fixed: Correctly assigned to `deleteBtn`
    deleteBtn.classList.add("deleteBtn");

    const completedBtn = document.createElement("button");
    completedBtn.textContent = "Completed"; // Fixed: Correctly assigned to `completedBtn`
    completedBtn.classList.add("completedBtn");

    wrapper.appendChild(editBtn);
    wrapper.appendChild(deleteBtn);
    wrapper.appendChild(completedBtn);

    todoItem.appendChild(textDiv)
    todoItem.appendChild(wrapper)

    todoList.appendChild(todoItem);
}

document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todoInput");
    const submitButton = document.getElementById("addTodo");
    const todoList = document.getElementById("todoList");

    submitButton.addEventListener("click", (event) => {
        const todoText = todoInput.value.trim();
        if (todoText === '') {
            alert("Please write something for the todo.");
        } else {
            addTodoToLocalStorage({text:todoText,isCompleted:false});
            appendTodoInHtml({text:todoText,isCompleted:false});
            todoInput.value = ''; // Fixed: Clear input field properly
        }
    });

    todoInput.addEventListener("input", (event) => {
        const todoText = event.target.value;
        event.target.value = todoText.trimStart();
    });

    const todos = loadTodos();

    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo); // Use existing function to append todos to the HTML
    });
});
