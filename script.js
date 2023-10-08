const taskInput = document.getElementById("add-task")
const dateInput = document.getElementById("add-date")
const addButtion = document.getElementById("add-button")
const showStatus = document.getElementById("show-status")

const generatorId = ()=>{
    const id = Math.round(Math.random()*Math.random()*Math.pow(10,15))
    return id
}
generatorId()
const showAlert = (text,type) =>{
    showStatus.innerHTML=""
    const message = document.createElement("p");
    message.innerText = text;
    message.classList.add("alert");
    message.classList.add(`${type}`);
    showStatus.appendChild(message)
    setInterval(()=>{showStatus.style.display="none"},2000)
};

const todos = []

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
        taskInput.value = "";
        dateInput.value = "";
        showAlert("todo added successfullu","success")
    }
}

addButtion.addEventListener("click",addTask)
