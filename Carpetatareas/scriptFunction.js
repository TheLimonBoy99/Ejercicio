let tasks = [];

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.id = `task-${task.id}`;

    const titleSpan = document.createElement('span');
    titleSpan.textContent = task.title;
    titleSpan.style.textDecoration = task.completed ? 'line-through' : 'none';
    
    const timeSpan = document.createElement('span');
    timeSpan.textContent = `Creado el: ${formatDate(task.timestamp)}`;
    timeSpan.className = 'ml-2 text-muted';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = task.title;
    editInput.style.display = 'none';

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-warning btn-sm mr-2';
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', () => toggleEditTask(task.id));
    editButton.disabled = task.completed;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(titleSpan);
    li.appendChild(timeSpan);
    li.appendChild(checkbox);
    li.appendChild(editInput);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    if (task.completed) {
        li.style.backgroundColor = '#f8f9fa';
      }
  
      taskList.appendChild(li);
    });
  }

function addTask() {
  const newTaskInput = document.getElementById('newTask');
  const title = newTaskInput.value;

  if (title) {
    const newTask = {
      id: tasks.length + 1,
      title,
      completed: false,
      timestamp: new Date(),
    };

    tasks.push(newTask);
    newTaskInput.value = '';
    renderTasks();
  }
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function toggleEditTask(id) {
  const editInput = document.querySelector(`#task-${id} input[type="text"]`);
  const titleSpan = document.querySelector(`#task-${id} span`);
  const editButton = document.querySelector(`#task-${id} button.btn-warning`);

  if (editInput.style.display === 'none') {
    editInput.style.display = 'inline-block';
    titleSpan.style.display = 'none';
    editButton.textContent = 'Guardar';
  } else {
    editInput.style.display = 'none';
    titleSpan.style.display = 'inline-block';
    editButton.textContent = 'Editar';

    tasks = tasks.map(task =>
      task.id === id ? { ...task, title: editInput.value } : task
    );

    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function formatDate(date) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return new Date(date).toLocaleDateString('es-ES', options);
}

// Initial rendering
renderTasks();
