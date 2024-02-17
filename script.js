// Display the number of tasks remaining
const newElementsDiv = document.getElementById("newElements");
let elementCounter = newElementsDiv.childElementCount;
// check collection is used to avoid having a double subtraction of the remaining tasks number when checking and deleting
var check = new Map();

// JavaScript code to handle button click and send the task to the telegram bot api
document.getElementById("btn").addEventListener("click", async () => {
    const newTask = document.getElementById("input").value.trim(); // Trim whitespace  
    console.log(newTask);
    const response = await fetch("http://localhost:3000/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: newTask })
    });
    if (response.ok) {
        alert("Task sent to bot successfully!");
    } else {
        alert("Error sending task to bot. Please try again later.");
    }
});

// this function is used to initialize the check value to false for each element when the cursor is passed on it
function checkValues(div) {   
    const taskId = div.getAttribute("data-task-id");
    if(check.has(taskId) == false) {
        check.set(taskId, "unChecked");
    }
}

// set the check value of the task as checked and insert it at the end of the tasks then updating the task counter
function clik(button) {
    const icon = button.querySelector(".fa-check"); // get the icon query selector
    const div = button.parentNode; // get the current div where the task exist for getting the ID of the task
    const taskId = div.getAttribute("data-task-id"); // taskId is used to check the value on the user interface and the database
    const parentDiv = document.getElementById("newElements"); // get the "newElements" div to insert the task on the end or the first place

    if(icon.style.display == "inline") {
        icon.style.display = "none"; // uncheck the button style
        elementCounter = elementCounter + 1; // increment the counter
        updatePendingTasks(); // update the counter
        check.set(taskId, "unChecked"); // change the value of the task on the check collection
        parentDiv.insertBefore(div, parentDiv.firstChild); // insert the task at the first
        updateTaskStatus(taskId, "0"); // change the task status on the database to unchecked "0"
    }
    else {
        icon.style.display = "inline";
        elementCounter = elementCounter - 1;
        updatePendingTasks();
        check.set(taskId, "checked");
        parentDiv.appendChild(div);
        updateTaskStatus(taskId, "1");
    }
}

function updateTaskStatus(taskId, isChecked) {
    // Send an AJAX request to update the task status in the database
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "todos.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("taskId=" + encodeURIComponent(taskId) + "&isChecked=" + isChecked);
}

function remove(button) { // remove one task
    const div = button.parentNode;
    const taskId = div.getAttribute("data-task-id");
    if (check.get(taskId) == "unChecked") {
        elementCounter = elementCounter - 1;
        updatePendingTasks();
    }
    check.delete(taskId); // delete the task from the check collection
    div.remove(); // remove all the div container of the task
    
    // Send an AJAX request to remove the task from the database
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "todos.php?action=remove_one", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("taskId=" + encodeURIComponent(taskId));  
}

function removeAllTasks() { // remove all tasks 
    const containerDiv = document.getElementById("newElements");
    while (containerDiv.firstChild) {
        containerDiv.firstChild.remove();
    }
    elementCounter = 0; // set the counter to 0
    updatePendingTasks();
    
    // Send an AJAX request to remove all tasks from the database
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "todos.php?action=remove_all", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
}

function updatePendingTasks() {     // update counter function
    const inputCounter = document.getElementById("inputCounter");       
    if(elementCounter == 0) {
        inputCounter.value = "You have 0 pending task";
    }
    else if(elementCounter == 1) {
        inputCounter.value = "You have 1 pending task";
    }
    else {
        inputCounter.value = "You have " + elementCounter + " pending tasks";
    }
}

// this function is called when loading the page and it's for check the style of the existing tasks and change there places (first last)
function checkExistingElements() {
    const existingElements = document.querySelectorAll('.div-todo');//select all elements of the document that have the div-todo className (tasks)
    const parentDiv = document.getElementById("newElements");

    existingElements.forEach((element) => {
        const checked = element.getAttribute("data-task-checked"); // get the check value from the database of the task
        const taskId = element.getAttribute("data-task-id"); // get the task id to set his value on the check collection 
        const icon = element.querySelector(".fa-check"); // get the icon query selector
        if (checked === "1") { // if the value is set to "1" that means this task was checked soo we check him again 
            icon.style.display = "inline";
            parentDiv.appendChild(element);
            elementCounter--;
            updatePendingTasks();
            check.set(taskId, "checked"); // check collection
        } else { 
            check.set(taskId, "unChecked");
            icon.style.display = "none";
            parentDiv.insertBefore(element, parentDiv.firstChild);
        }
    });
}
