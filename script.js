let inputText = document.getElementById("inputText");
let addButton = document.getElementById("addButton");
let removeDoneButton = document.getElementById("removeDoneButton");
let removeNotDoneButton = document.getElementById("removeNotDoneButton");
let removeAllButton = document.getElementById("removeAllButton");
let todoUl = document.getElementById("notDoneUl");
let doneUl = document.getElementById("doneUl");
const notDoneButtonString = '<hr><button class = "edit">edit</button><button class = "toggle">toggle</button><button class = "done">set done</button><button class = "delete">delete</button>';
const doneButtonString = '<hr><br><button class = "edit">edit</button><button class = "toggle">toggle</button><button class = "notDone">set not done</button><button class = "delete">delete</button>';
let todoList = [];
let doneList = [];


window.addEventListener("keydown", function (event) {
    if (event.key == 'Enter') {
        addButton.click();
    }
}, true);

addButton.addEventListener("click", addTodo);

function addTodo() {
    if (inputText.value) {
        addToDoList(inputText.value);
        addTodoDOM();
        inputText.value = "";
    }
    else {
        alert("Do not submit an empty Todo");
    }
}

function addNotDone(notDoneItem) {
    addToDoList(notDoneItem);
    addTodoDOM();
}

function addToDoList(todo) {
    todoList.push(todo);
    console.log(todoList);
}

function addTodoDOM() {
    if (todoUl) {
        todoUl.innerHTML = " ";
    }
    todoList.forEach((todo, index) => {
        let liItem = document.createElement("li")
        liItem.innerHTML = `${todo} ${notDoneButtonString}`;
        liItem.id = index;
        liItem.className = "notDoneItem col-auto justify-content-center"
        todoUl.appendChild(liItem);
    })
}

function addDone(doneItem) {
    addDoneList(doneItem);
    addDoneDOM();
    reload();
}

function addDoneList(done) {
    doneList.push(done)
}

function addDoneDOM() {
    if (doneUl) {
        doneUl.innerHTML = " ";
    }

    doneList.forEach((done, index) => {
        let liItem = document.createElement("li")
        liItem.innerHTML = `${done} ${doneButtonString}`;
        liItem.id = index;
        liItem.className = "doneItem col-auto justify-content-center"
        doneUl.appendChild(liItem);
    })
}


function reload() {
    if (doneUl) {
        doneUl.innerHTML = " ";
        doneList.forEach((done, index) => {
            let liItem = document.createElement("li")
            liItem.innerHTML = `${done} ${doneButtonString}`;
            liItem.id = index;
            liItem.className = "doneItem col-auto justify-content-center"
            doneUl.appendChild(liItem);
        })
    }



    if (todoUl) {
        todoUl.innerHTML = " ";
        todoList.forEach((todo, index) => {
            let liItem = document.createElement("li")
            liItem.innerHTML = `${todo} ${notDoneButtonString}`;
            liItem.id = index;
            liItem.className = "notDoneItem col-auto justify-content-center"
            todoUl.appendChild(liItem);
        })
    }


}


removeAllButton.addEventListener("click", removeAll)

function removeAll() {
    todoList.splice(0, todoList.length);
    if (todoUl) {
        todoUl.innerHTML = " ";
    }

    doneList.splice(0, doneList.length);
    if (doneUl) {
        doneUl.innerHTML = " ";
    }
}


removeNotDoneButton.addEventListener("click", removeNotDoneItems);

function removeNotDoneItems() {
    todoList.splice(0, todoList.length);
    if (todoUl) {
        todoUl.innerHTML = " ";
    }

}

removeDoneButton.addEventListener("click", removeDoneItems);

function removeDoneItems() {
    doneList.splice(0, doneList.length);
    if (doneUl) {
        doneUl.innerHTML = " ";
    }
}


todoUl.addEventListener('click', checkFunction);
doneUl.addEventListener('click', checkFunction);

function checkFunction(e) {
    if (e.target.parentNode.id != null) {
        console.log(e.target.classList);
        if (e.target.classList.contains("edit")) {
            editTodo(e)
        }
        else if (e.target.classList.contains("toggle")) {
            toggleTodo(e);
        }
        else if (e.target.classList.contains("done")) {
            setDoneTodo(e);
        }
        else if (e.target.classList.contains("notDone")) {
            setNotDone(e);
        }
        else if (e.target.classList.contains("delete")) {
            removeItem(e);
        }
    }

}

//Edit

function editTodo(e) {
    let parentId = e.target.parentNode.id;
    let newInput = window.prompt("Enter new to do", "new todo task");
    todoList[parentId] = newInput;
    document.getElementById(parentId).innerHTML = `${newInput} ${notDoneButtonString}`;
}

//Toggle

function toggleTodo(e) {
    let parentId = e.target.parentNode.id;
    if (document.getElementById(parentId).style.textDecoration == "line-through") {
        document.getElementById(parentId).style.textDecoration = "none";
    }
    else {
        document.getElementById(parentId).style.textDecoration =" line-through";
    }
}

function setNotDone(e) {
    let parentId = e.target.parentNode.id;
    addNotDone(doneList[parentId]);
    removeItem(e);
}

function setDoneTodo(e) {
    let parentId = e.target.parentNode.id;
    addDone(todoList[parentId]);
    removeItem(e);
}

//Delete

function removeItem(e) {
    let parentId = e.target.parentNode.id;
    if (e.target.parentNode.classList.contains("notDoneItem")) {
        console.log("went into not done");
        todoList.splice(parentId, 1);
    }
    else if (e.target.parentNode.classList.contains("doneItem")) {
        console.log("went into done");
        doneList.splice(parentId, 1);
    }
    reload();

    console.log("Todo List: " + todoList)
    console.log("Done List: " + doneList)
}
