//Initialize a new instance of `TaskManager
const taskManager = new TaskManager();

// Selectors
const form = document.querySelector('#addTaskForm'); // form
const taskid = document.querySelector('#taskid'); // task id
const taskTitle = document.querySelector('#taskTitle'); // Input Form Title
const taskDetails = document.querySelector('#taskDetails');// Input Form Description
const taskAssign = document.querySelector('#taskAssign'); // Input Form Assign
const taskDueDate = document.querySelector('#taskDueDate'); // Input Form DueDate
const taskStatus = document.querySelector('#taskStatus'); // Input Form Status
const btnSave = document.querySelector('#btnSave'); // Input Form Save Button
const errMsgTitle = document.querySelector('#errMsgTitle'); // Error Form Title
const errMsgDetails = document.querySelector('#errMsgDetails'); // Error Form Description
const errMsgAssign = document.querySelector('#errMsgAssign'); // Error Form Assign
const errMsgDueDate = document.querySelector('#errMsgDueDate'); // Error Form DueDate
const errMsgStatus = document.querySelector('#errMsgStatus'); // Error Form Status
let validationCount = 0;
//Function
function validFormFieldInput() {
    // Task Tile Validation (no of characters should be greater than 5)
    // if(taskTitle.value.length < 5) {
    //     errMsgTitle.innerHTML = "Task Title should be greater than 5 Characters";
    //     errMsgTitle.style.color = "#ff0000";
    //     taskTitle.style.borderColor = "red";
    //     taskTitle.focus();
    //     validationCount++;
    // }
    // else{
    //     errMsgTitle.innerHTML = "";
    //     taskTitle.style.borderColor = "black";
    // }
    // // Task description Validation (no of characters should be greater than 5)
    // if(taskDetails.value.length < 5) {
    //     errMsgDetails.innerHTML = "Task Description should be greater than 5 Characters";
    //     errMsgDetails.style.color = "#ff0000";
    //     taskDetails.style.borderColor = "red";
    //     taskDetails.focus();
    //     validationCount++;
    // }
    // else{
    //     errMsgDetails.innerHTML = ""; 
    //     taskDetails.style.borderColor = "black";
    // }
    // // Task assign Validation (no of characters should be greater than 1)
    // if(taskAssign.value.length < 2) {
    //     errMsgAssign.innerHTML = "Name should be atleast 2 characters";
    //     errMsgAssign.style.color = "#ff0000";
    //     taskAssign.style.borderColor = "red";
    //     taskAssign.focus();
    //     validationCount++;
    // }
    // else{
    //     errMsgAssign.innerHTML = "";
    //     taskAssign.style.borderColor = "black";
    // }
    // Due Date Validation (should not be blank )
    // if(!taskDueDate.value) {
    //     errMsgDueDate.innerHTML = "Please pick a Due Date";
    //     errMsgDueDate.style.color = "#ff0000";
    //     taskDueDate.style.borderColor = "red";
    //     taskDueDate.focus();
    //     validationCount++;
    // }
    // else{
    //     errMsgDueDate.innerHTML = "";
    //     taskDueDate.style.borderColor = "black";  
    // }
    //Status Validation (should not be blank )
    if (taskStatus.value === "") {
        errMsgStatus.innerHTML = "Please Choose a Status";
        errMsgStatus.style.color = "#ff0000";
        taskStatus.style.borderColor = "red";
        taskStatus.focus();
        validationCount++;
    }
    else {
        errMsgStatus.innerHTML = "";
        taskStatus.style.borderColor = "black";
    }
    // Validating the form and then sending it to tasks array in TaskManager class
    if (validationCount > 0) {
        validationCount = 0;
        return;
    }
    else {
        let id = -1
        if (taskid.value != undefined && taskid.value > -1)
            id = taskid.value;
        // Pushing the data from form into the array task
        taskManager.addTask(
            taskTitle.value,
            taskDetails.value,
            taskAssign.value,
            taskDueDate.value,
            taskStatus.value,
            id
        );
        //Resetting the form after saving the data
        //btnSave.removeEventListener('click',() => form.reset());
    }
    taskManager.render();
    form.reset();
};

function clearFields(){
    form.reset();
}

// Call the events
// form.addEventListener('submit',validFormFieldInput);
btnSave.addEventListener('click', validFormFieldInput);
