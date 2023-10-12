const taskInput = document.getElementById("add-task")
const dateInput = document.getElementById("add-date")
const addButtion = document.getElementById("add-button")
const showStatus = document.getElementById("show-status")
const tableBody = document.querySelector("tbody")
const deleteAll = document.getElementById("delete-all")

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


const displayTodos = () => {
    tableBody.innerHTML = ""
    if(!todos.length){
        tableBody.innerHTML = "<tr><td colspan='4'>No task found!</td></tr>";
        return;
    }
    else{
        todos.forEach(todo => {
            tableBody.innerHTML += `
                <tr>
                    <td>${todo.task}</td>
                    <td>${todo.date || "No Date"}</td>
                    <td>${todo.completed ? "Completed" : "Pending"}</td>
                    <td>
                        <button>Edit</button>
                        <button onclick="editHandler(${todo.id})">${todo.completed ? "Undo": "Do"}</button>
                        <button onclick="deleteHandler('${todo.id}')">Delete</button>
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

const editHandler = (id) =>{
    const todo = todos.find(todo => {todo.id === id});
    console.log(todo)
    todo.completed = !todo.completed;
    saveToLocaleStorage()
    displayTodos()
}

window.addEventListener("load",displayTodos)
addButtion.addEventListener("click",addTask)
deleteAll.addEventListener("click" , deleteAllHandler)

