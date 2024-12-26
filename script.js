const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask() {
    if (inputBox.value === '') {
        alert("You must write a task!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }

    saveData();

}, false);

function saveData() {
    const tasks = [];
    const taskElements = listContainer.querySelectorAll('li');


    taskElements.forEach(task => {

        const taskText = task.firstChild.textContent.trim();

        tasks.push({
            text: taskText,
            checked: task.classList.contains('checked')
        });
    });


    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showTask() {
    const storedData = JSON.parse(localStorage.getItem('tasks'));

    if (storedData) {
        storedData.forEach(taskData => {
            let li = document.createElement("li");
            li.innerText = taskData.text;

            if (taskData.checked) {
                li.classList.add('checked');
            }

            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
            listContainer.appendChild(li);
        });
    }
}

showTask();