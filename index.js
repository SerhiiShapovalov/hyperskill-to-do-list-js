"use strict";

const addTaskButton = document.getElementById("add-task-button");
const inputTask = document.getElementById("input-task");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage or create an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function for saving tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    const taskWrap = document.createElement("div");
    taskWrap.classList.add("task-wrap");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `task-${task.id}`;
    checkbox.checked = task.completed;

    const label = document.createElement("label");
    label.setAttribute("for", checkbox.id);

    const span = document.createElement("span");
    span.classList.add("task");
    span.textContent = task.name;

    if (task.completed) {
      span.style.textDecoration = "line-through";
    }

    label.appendChild(span);
    taskWrap.appendChild(checkbox);
    taskWrap.appendChild(label);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "icon-delete-task");
    svg.setAttribute("width", "8");
    svg.setAttribute("height", "8");

    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", "./images/icons.svg#close-black");

    svg.appendChild(use);
    deleteButton.appendChild(svg);

    deleteButton.addEventListener("click", function () {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    li.appendChild(taskWrap);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskName = inputTask.value.trim();
  if (taskName === "") {
    alert("Task name cannot be empty");
    return;
  }

  const newTask = {
    id: Date.now(),
    name: taskName,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  inputTask.value = "";
}

addTaskButton.addEventListener("click", addTask);

document.addEventListener("DOMContentLoaded", renderTasks);
