// create a method task html
function createTaskRow(task) {
    const html = `
        <tr>
            <th scope="row">${task.id}</th>
            <td>${task.title}</td>
            <td>${task.details}</td>
            <td>${task.assignTo}</td>
            <td>${task.dueDate}</td>
            <td>${task.status}</td>
            <td>
                <button data-task-id=${task.id} onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#staticBackdrop" 
                    class="btn btn-primary edit-button">Edit</button>
            </td>
            <td>
                <button data-task-id=${task.id} onclick="deleteTask(this)" class="btn btn-primary del-button">Delete</button>
            </td>
        </tr>
    `
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
    taskManager.deleteTask(Number(e.dataset.taskId));
}

function filterTasks(e) {
    const tasks = taskManager.filterTasks(e.dataset.status);
    taskManager.filterRenderer(tasks);
}


const tasksTableBody = document.querySelector("#tasks-table-body");

class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }
    addTask(taskid, title, details, assignTo, dueDate, status) {
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

    filterTasks(status) {
        return this.tasks.filter(task => task.status == status);
    }

    //Render method
    render() {
        this.clearColumns();
        this.tasks.forEach(currentTask => {
            const taskRow = createTaskRow(currentTask);

            tasksTableBody.innerHTML += taskRow;
        });
    }

    filterRenderer(filterdTasks) {
        this.clearColumns();
        filterdTasks.forEach(currentTask => {
            const taskRow = createTaskRow(currentTask);

            tasksTableBody.innerHTML += taskRow;
        });
    }

    clearColumns() {
        tasksTableBody.innerHTML = "";
    }

}
