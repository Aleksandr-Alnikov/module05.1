const tasks = [];
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

document.getElementById('addTaskBtn').addEventListener('click', () => {
    const taskText = taskInput.value;
    if (taskText) {
        const task = { text: taskText, completed: false };
        tasks.push(task);
        renderTasks();
        taskInput.value = '';
    }
});

const renderTasks = (filter = 'all') => {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        if ((filter === 'completed' && !task.completed) ||
            (filter === 'pending' && task.completed)) {
            return;
        }
        const li = document.createElement('li');
        
        li.classList.toggle('completed', task.completed);

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.classList.add('task-text');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Редактировать';
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            editTask(index);
        });

        const toggleCompleteBtn = document.createElement('button');
        toggleCompleteBtn.textContent = task.completed ? 'Невыполнено' : 'Выполнено';
        toggleCompleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            task.completed = !task.completed;
            renderTasks(filter);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            renderTasks(filter);
        });

        taskContainer.appendChild(taskText);
        taskContainer.appendChild(editBtn);
        taskContainer.appendChild(toggleCompleteBtn);
        taskContainer.appendChild(deleteBtn);
        li.appendChild(taskContainer);
        taskList.appendChild(li);
    });
}

const editTask = (index) => {
    const newText = prompt("Редактировать задачу:", tasks[index].text);
    if (newText) {
        tasks[index].text = newText;
        renderTasks();
    }
}

document.getElementById('showAllBtn').addEventListener('click', () => renderTasks('all'));
document.getElementById('showCompletedBtn').addEventListener('click', () => renderTasks('completed'));
document.getElementById('showPendingBtn').addEventListener('click', () => renderTasks('pending'));