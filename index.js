"use strict";

const addTaskButton = document.getElementById("add-task-button");
const inputTask = document.getElementById("input-task");
const taskList = document.getElementById("task-list");

function addTask() {
  const taskName = inputTask.value.trim();
  if (taskName === "") {
    alert("Task name cannot be empty");
    return;
  }

  const li = document.createElement("li");
  li.classList.add("todo-item");

  const taskWrap = document.createElement("div");
  taskWrap.classList.add("task-wrap");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `task-${Date.now()}`;

  const label = document.createElement("label");
  label.setAttribute("for", checkbox.id);

  const span = document.createElement("span");
  span.classList.add("task");
  span.textContent = taskName;

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
    taskList.removeChild(li);
  });

  // checkbox.addEventListener('change', function () {
  //     if (checkbox.checked) {
  //         span.classList.add('completed');
  //     } else {
  //         span.classList.remove('completed');
  //     }
  // });

  li.appendChild(taskWrap);
  li.appendChild(deleteButton);

  taskList.appendChild(li);

  inputTask.value = "";
}

addTaskButton.addEventListener("click", addTask);
