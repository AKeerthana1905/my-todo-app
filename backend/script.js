const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");

const API_URL = "http://127.0.0.1:5000/tasks";

// Fetch tasks
async function loadTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.title;

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = () => deleteTask(task.id);

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// Add task
async function addTask() {
  const title = taskInput.value.trim();
  if (!title) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });

  taskInput.value = "";
  loadTasks();
}

// Delete task
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadTasks();
}

addBtn.addEventListener("click", addTask);

// Load tasks on page load
loadTasks();
