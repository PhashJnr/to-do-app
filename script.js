"use strict";
// const addTask = document.querySelector(".addtask");
// const textInput = document.querySelector(".input");

// addTask.addEventListener("click", () => {
//   const taskText = textInput.value.trim();
// });

document.addEventListener("DOMContentLoaded", function () {
  const addTaskBtn = document.getElementById("addTaskButton");
  addTaskBtn.addEventListener("click", addTask);

  loadTasks();
});

function addTask() {
  const textInput = document.getElementById("input");
  const taskText = textInput.value.trim();

  if (taskText !== "") {
    const taskList = document.getElementById("taskList");
    const listItem = document.createElement("li");
    // listItem.innerHTML = `<input type="checkbox" onchange='toggleTask(this)'>
    // <span>${taskText}</span>
    // <button onclick='deleteTask(this)'>Delete</button>`;

    listItem.innerHTML = `<input type="checkbox" onchange='toggleTask(this)'>
    <span>${taskText}</span>
    <button class="listbtn" onclick='deleteTask(this)'>Delete</button>`;

    taskList.appendChild(listItem);

    saveTasks();

    textInput.value = "";
  }
}

function toggleTask(checkbox) {
  const taskText = checkbox.nextElementSibling;
  taskText.classList.toggle("completed");

  saveTasks();
}

function deleteTask(button) {
  const listItem = button.parentElement;
  listItem.remove();

  saveTasks();
}

function saveTasks() {
  const taskList = document.getElementById("taskList");
  const tasks = [];

  for (let i = 0; i < taskList.children.length; i++) {
    const listItem = taskList.children[i];
    const taskText = listItem.querySelector("span").innerText;
    const isCompleted = listItem.querySelector("input").checked;
    tasks.push({ text: taskText, completed: isCompleted });
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const taskList = document.getElementById("taskList");
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    const tasks = JSON.parse(storedTasks);

    tasks.forEach(function (task) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
      <input type='checkbox' ${
        task.completed ? "checked" : ""
      } onchange="toggleTask(this)" >
      <span>${task.text}</span>
      <button class="listbtn" onclick='deleteTask(this)'>Delete</button>`;

      taskList.appendChild(listItem);

      if (task.completed) {
        listItem.querySelector("span").classList.add("completed");
      }
    });
  }
}
