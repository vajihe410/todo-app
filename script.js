const taskInput = document.getElementById("add-task")
const dateInput = document.getElementById("add-date")
const addButtion = document.getElementById("add-button")
const showStatus = document.getElementById("show-status")
const tableBody = document.querySelector("tbody")
const deleteAll = document.getElementById("delete-all")
const editButtion = document.getElementById("edit-button")
const filterButtons = document.querySelectorAll(".filter")

let todos = JSON.parse(localStorage.getItem("todosData")) || []

console.log(todos)

const generatorId = ()=>{
    const id = Math.round(Math.random()*Math.random()*Math.pow(10,15))
    return id
}

const saveToLocaleStorage = () =>{
    localStorage.setItem("todosData" , JSON.stringify(todos))
 }  

const showAlert = (text,type) =>{
    showStatus.innerHTML=""
    const message = document.createElement("p");
    message.innerText = text;
    message.classList.add("alert");
    message.classList.add(`${type}`);
    showStatus.appendChild(message)
    setTimeout(()=>{showStatus.style.display="none"},2000)
};


const displayTodos = (data) => {
    let todosList = data || todos
    tableBody.innerHTML = ""
    if(!todosList.length){
        tableBody.innerHTML = "<tr><td colspan='4'>No task found!</td></tr>";
        return;
    }
    else{
        todosList.forEach(todo => {
            tableBody.innerHTML += `
                <tr>
                    <td>${todo.task}</td>
                    <td>${todo.date || "No Date"}</td>
                    <td>${todo.completed ? "Completed" : "Pending"}</td>
                    <td>
                        <button onclick="editHandler(${todo.id})">Edit</button>
                        <button onclick="toggleHandler(${todo.id})">${todo.completed ? "Undo": "Do"}</button>
                        <button onclick="deleteHandler(${todo.id})">Delete</button>
                    </td>
                </tr>
                `;
        }); 
    }
}
const addTask = () => {
    const task = taskInput.value
    const date = dateInput.value
    const todo = {
        id : generatorId(),
        task : task,
        date : date,
        completed : false,
    }
    
    if(!task){
        showAlert("please enter todo","error")
    }
    else{
        todos.push(todo)
        saveToLocaleStorage();
        displayTodos(); 
        taskInput.value = "";
        dateInput.value = "";
        showAlert("todo added successfully","success")
    }
}
const deleteAllHandler = () =>{
    if(todos.length){
        todos = []
        saveToLocaleStorage()
        displayTodos()
        showAlert("Todos cleared successfully","success")
    }
    else{
        showAlert("No items to clear","error")
    }
}

 const deleteHandler = (id) =>{
    const newTodos = todos.filter(todo => todo.id !== id)
    todos = newTodos;
    saveToLocaleStorage();
    displayTodos();
} 

const toggleHandler = (id) =>{
    const todo = todos.find(todo => {todo.id === id});
    console.log(todo)
    todo.completed = !todo.completed;
    saveToLocaleStorage()
    displayTodos()
}

const editHandler = (id) => {
    const todo = todos.find(todo => todo.id === id)
    console.log(todo)
    taskInput.value = todo.task;
    dateInput.value = todo.date;
    addButtion.style.display = "none"
    editButtion.style.display = "inline-block"
    editButtion.dataset.id = id
}
const applayEditHandler = (event) => {
    const id =event.target.dataset.id
    const todo = todos.find(todo => todo.id === id)
    console.log(todo)
    todo.task = taskInput.value
    todo.date = dateInput.value
    taskInput = ""
    dateInput = ""
    editButtion.style.display = "none"
    addButtion.style.display = "inline-block"
    saveToLocaleStorage()
    displayTodos()
    showAlert("edit todo successfully", "success")
}

const filterHandler = (event) => {
    const filterName = event.target.dataset.filter
    let filterdTodos = null
    switch (filterName) {
        case "pending":
            filterdTodos = todos.filter(todo => todo.completed = false)
            break;
        case "completed":
            filterdTodos = todos.filter(todo => todo.completed = false)
            break;
        default:
            filterdTodos = todos
            break;
    }
    displayTodos(filterdTodos)
}
filterButtons.forEach(filterButton => filterButton.addEventListener("click" , filterHandler))
window.addEventListener("load",() => displayTodos())
addButtion.addEventListener("click",addTask)
deleteAll.addEventListener("click" , deleteAllHandler)
editButtion.addEventListener("click",applayEditHandler)


