let input = document.querySelector(".input");
let submit = document.querySelector("#add");
let tasksDiv = document.querySelector(".tasks");
let defaultBtn = document.querySelector("#default-btn");
let customBtn = document.querySelector("#custom-btn");
let plusIcon = document.querySelector("#plus");
let year = new Date();

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Empty Input Field
  }
};

function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Array Of Tasks
  arrayOfTasks.push(task);
  // Add Tasks To Page
  addElementsToPageFrom(arrayOfTasks);
  // Add Tasks To Local Storage
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function addElementsToPageFrom(arrayOfTasks) {
  // Empty Tasks Div
  tasksDiv.innerHTML = "";
  // Looping On Array Of Tasks
  arrayOfTasks.forEach((task) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    // Check If Task is Done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    let textSpan = document.createElement("span");
    textSpan.className = "text";
    let taskTitle = document.createElement("span");
    let taskTime = document.createElement("span");
    taskTitle.appendChild(document.createTextNode(task.title));
    taskTime.appendChild(
      document.createTextNode(
        `${year.getFullYear()}-${year.getMonth()}-${year.getDate()}`
      )
    );
    textSpan.appendChild(taskTitle);
    textSpan.appendChild(taskTime);
    div.appendChild(textSpan);
    // Create Delete Button
    let span = document.createElement("i");
    span.className = "fa-solid fa-trash-can del";
    let check = document.createElement("i");
    check.className = "fa-solid fa-check";
    let img = document.createElement("img");
    img.src = "";
    let icon = document.createElement("span");
    // Append Button To Main Div
    icon.appendChild(span);
    icon.appendChild(check);
    div.appendChild(icon);
    // div.appendChild(img);
    // Add Task Div To Tasks Container
    tasksDiv.appendChild(div);
    span.onclick = (e) => {
      arrayOfTasks = arrayOfTasks.filter(
        (task) => task.id != icon.parentElement.getAttribute("data-id")
      );
      window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
      div.remove();
    };
    check.onclick = (e) => {
      // e.target.parentElement;
      div.classList.toggle("done");
      // Toggle Completed For The Task
      for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == div.getAttribute("data-id")) {
          arrayOfTasks[i].completed == false
            ? (arrayOfTasks[i].completed = true)
            : (arrayOfTasks[i].completed = false);
        }
      }
      window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
    };
  });
  defaultBtn.onclick = () => {
    defaultBtn.click();
  };
}
plusIcon.onclick = () => {
  input.focus();
};
