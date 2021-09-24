// create a method task html
function createTaskHtml(id, title, details, assignTo, dueDate, status) {
    const html = `<div id="draggable-handle" class="card mt-2  " >                     
        <!-- Card content -->
        <div class="card-body" >
            <!-- Title -->
            <h4 class="card-title"><a>${title}</a></h4>
            <!-- Text -->
            <div class="card-text taskDescription">
                <label for="cardLabelDescription">Task Description: </label>
                <p class="cardDescriptionValue">${details}</p>
            </div>
            <!-- Assign To -->
            <div class="card-text assignto">
                <label for="cardLabelAssign">Assign To: </label>
                <p class="cardAssignedToValue"> ${assignTo}</p>
            </div>
            <!-- Due Date -->
            <div class="card-text duedate">
                <label for="cardLabelDueDate">DueDate: </label>
                <p class="cardDueDateValue"> ${dueDate}</p>
            </div>
            <!-- Status -->
            <div class="card-text status">
                <label for="cardLabelStatus">Status: </label>
                <p id="todo"class="cardStatusValue">${status}</p>
            </div>
            <!-- Button -->
            <button data-task-id=${id} onclick="editTask(this)"
            data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-primary edit-button">Edit</button>
            <button data-task-id=${id} onclick="deleteTask(this)" class="btn btn-primary del-button">Delete</button>
        </div>                              
    </div> <br>`;
    return html;
};

function editTask(e) {
    const task = taskManager.getTask(Number(e.dataset.taskId));
    taskid.value = task.id;
    taskTitle.value = task.title;
    taskDetails.value = task.details;
    taskAssign.value = task.assignTo;
    taskStatus.value = task.status;
    taskDueDate.value = task.dueDate;
}

function deleteTask(e) {
    taskManager.deleteTask(e.name);
}


const todoColumnDefaultValues = document.querySelector(".todo").innerHTML;
const inProgressColumnDefaultValues = document.querySelector(".inProgress").innerHTML;
const reviewColumnDefaultValues = document.querySelector(".review").innerHTML;
const doneColumnDefaultValues = document.querySelector(".done").innerHTML;

//Creating a class
class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }
    //addTask Method to assign the values and push it into the array
    addTask(title, details, assignTo, dueDate, status, taskid) {
        if (taskid == -1) {
            let newTask = {
                id: this.currentId++,
                title: title,
                details: details,
                assignTo: assignTo,
                dueDate: dueDate,
                status: status,
            };

            this.tasks.push(newTask);
        } else {
            this.editTask(taskid, title, details, assignTo, dueDate, status);
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(x => x.id != id);
        this.render();
    }

    editTask(id, title, details, assignTo, dueDate, status) {
        const matchedTasks = this.tasks.filter(x => x.id == id);
        const matchedTask = matchedTasks[0];

        matchedTask.title = title;
        matchedTask.details = details;
        matchedTask.status = status;
        matchedTask.assignTo = assignTo;
        matchedTask.dueDate = dueDate;
    }

    getTask(id) {
        return this.tasks.find(task => task.id == id);
    }

    //Render method
    render() {
        this.clearColumns();
        this.tasks.forEach(currentTask => {
            console.log(currentTask);
            currentTask.dueDate = `${new Date(currentTask.dueDate)}`

            const column = document.querySelector(`.${currentTask.status}`);
            const taskHtml = createTaskHtml(currentTask.id, currentTask.title, currentTask.details, currentTask.assignTo, currentTask.dueDate, currentTask.status);

            column.innerHTML += taskHtml;
        });
    }

    clearColumns() {
        const todoColumn = document.querySelector(".todo");
        const inProgressColumn = document.querySelector(".inProgress");
        const reviewColumn = document.querySelector(".review");
        const doneColumn = document.querySelector(".done");
        todoColumn.innerHTML = todoColumnDefaultValues;
        inProgressColumn.innerHTML = inProgressColumnDefaultValues;
        reviewColumn.innerHTML = reviewColumnDefaultValues;
        doneColumn.innerHTML = doneColumnDefaultValues;
    }

}

    // render() {
    //     //Declare arrays for different column lists
    //     let tasksHtmlTodoList = [];
    //     let tasksHtmlInProgressList = [];
    //     let tasksHtmlReviewList = [];
    //     let tasksHtmlDoneList = [];
    //     console.log("Task Array" + this.tasks)
    //     console.log(this.currentId);
    //     for (let i = 0; i < this.tasks.length; i++) {
    //         console.log("For loop I" + i);
    //         const tempTask = this.tasks[i];
    //         const date = new Date(tempTask.dueDate);
    //         const formattedDate = `${date}`;
    //         // console.log(tempTask.status);

    //         if (tempTask.status === 'todo') {

    //             if (tasksHtmlTodoList.filter(x => x.id == this.tasks[i].id).length == 0) {
    //                 const taskHtml = createTaskHtml(tempTask.title, tempTask.details, tempTask.assignTo, formattedDate, tempTask.status);
    //                 let t = { id: this.tasks[i].id, html: taskHtml };
    //                 tasksHtmlTodoList.push(t);
    //                 // Set the inner html of the tasksList on the page
    //                 // const tasksHtml = tasksHtmlTodoList.join("\n");
    //                 const tasksList = document.querySelector(".todo");
    //                 tasksList.innerHTML += t.html;
    //             }
    //         }
    //         else if (tempTask.status === 'inProgress') {
    //             let taskHtml = createTaskHtml(tempTask.title, tempTask.details, tempTask.assignTo, formattedDate, tempTask.status);
    //             tasksHtmlInProgressList.push(taskHtml);
    //             // Set the inner html of the tasksList on the page
    //             const tasksHtml = tasksHtmlInProgressList.join("\n");
    //             const tasksList = document.querySelector(".inProgress");
    //             tasksList.innerHTML += tasksHtml;

    //         }
    //         else if (tempTask.status === 'review') {
    //             let taskHtml = createTaskHtml(tempTask.title, tempTask.details, tempTask.assignTo, formattedDate, tempTask.status);
    //             tasksHtmlReviewList.push(taskHtml);
    //             // Set the inner html of the tasksList on the page
    //             const tasksHtml = tasksHtmlReviewList.join("\n");
    //             const tasksList = document.querySelector(".review");
    //             tasksList.innerHTML += tasksHtml;

    //         }
    //         else {
    //             let taskHtml = createTaskHtml(tempTask.title, tempTask.details, tempTask.assignTo, formattedDate, tempTask.status);
    //             tasksHtmlDoneList.push(taskHtml);
    //             // Set the inner html of the tasksList on the page
    //             const tasksHtml = tasksHtmlDoneList.join("\n");
    //             const tasksList = document.querySelector(".done");
    //             tasksList.innerHTML += tasksHtml;

    //         }


    //     }

    // }

