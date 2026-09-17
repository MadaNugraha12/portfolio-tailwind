const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// 1. Muat data dari localStorage saat halaman pertama kali dibuka
document.addEventListener("DOMContentLoaded", loadTasks);

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    createTaskElement(taskText, false);
    saveTasks();

    taskInput.value = "";
    taskInput.focus();
}

function createTaskElement(text, completed) {
    const task = document.createElement("li");
    task.className = "flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all cursor-pointer group";

    task.innerHTML = `
        <span class="task-text text-slate-800 text-sm font-medium flex items-center gap-2 ${completed ? 'line-through text-slate-400' : ''}">
            <span class="w-2 h-2 rounded-full ${completed ? 'bg-slate-300' : 'bg-slate-900'} font-bullet"></span>
            ${text}
        </span>

        <button class="delete-btn text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors text-xs font-mono flex items-center gap-1">
            <i class="fa-solid fa-trash-can"></i>
            <span class="hidden sm:inline">Delete</span>
        </button>
    `;

    // Fitur Toggle Completed (Coret task jika diklik)
    task.addEventListener("click", function (e) {
        if (e.target.closest('.delete-btn')) return; // Jangan jalankan jika yang diklik tombol delete
        
        const span = task.querySelector(".task-text");
        const bullet = task.querySelector(".font-bullet");
        
        span.classList.toggle("line-through");
        span.classList.toggle("text-slate-400");
        span.classList.toggle("bg-slate-900");
        bullet.classList.toggle("bg-slate-300");
        bullet.classList.toggle("bg-slate-900");
        
        saveTasks();
    });

    // Fitur Delete
    task.querySelector(".delete-btn").addEventListener("click", function () {
        task.remove();
        saveTasks();
    });

    taskList.appendChild(task);
}

// Simpan daftar task ke localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        const text = li.querySelector(".task-text").innerText.trim();
        const completed = li.querySelector(".task-text").classList.contains("line-through");
        tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Ambil data dari localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => createTaskElement(task.text, task.completed));
}