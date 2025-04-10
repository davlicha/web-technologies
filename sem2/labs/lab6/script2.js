// Pure functions
const generateId = () => Date.now().toString(36) + Math.random().toString(36);

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const showSnackbar = (message) => {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.style.visibility = 'visible';

    setTimeout(() => {
        snackbar.style.visibility = 'hidden';
    }, 3000);
};

const filterTasks = (tasks, filter) => {
    switch (filter) {
        case 'completed':
            return tasks.filter(task => task.completed);
        case 'active':
            return tasks.filter(task => !task.completed);
        default:
            return tasks;
    }
};

const sortTasks = (tasks, sortBy) => {
    switch (sortBy) {
        case 'date-added':
            return [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        case 'date-updated':
            return [...tasks].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        default:
            return tasks;
    }
};

// DOM manipulation functions
const renderTasks = (tasks) => {
    const taskList = document.getElementById('task-list');

    // Clear the list
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="empty-message">Немає завдань. Додайте перше завдання!</li>';
        return;
    }

    // Render each task
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskItem.dataset.id = task.id;

        taskItem.innerHTML = `
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                    <div class="task-content">
                        <div class="task-text" contenteditable="${!task.completed}">${task.text}</div>
                        <div class="task-date">
                            Додано: ${formatDate(task.createdAt)} | 
                            Оновлено: ${formatDate(task.updatedAt)}
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="edit-btn">Редагувати</button>
                        <button class="delete-btn">Видалити</button>
                    </div>
                `;

        taskList.appendChild(taskItem);
    });
};

// State management
let tasks = [];
let currentFilter = 'all';
let currentSort = null;

// Event handlers
const handleAddTask = () => {
    const input = document.getElementById('task-input');
    const text = input.value.trim();

    if (!text) return;

    const newTask = {
        id: generateId(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    tasks.push(newTask);
    input.value = '';

    showSnackbar('Завдання додано!');
    applyFiltersAndSort();
};

const handleDeleteTask = (id) => {
    const taskItem = document.querySelector(`.task-item[data-id="${id}"]`);
    taskItem.classList.add('removing');

    setTimeout(() => {
        tasks = tasks.filter(task => task.id !== id);
        showSnackbar('Завдання видалено!');
        applyFiltersAndSort();
    }, 500);
};

const handleToggleComplete = (id) => {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed,
                updatedAt: new Date().toISOString()
            };
        }
        return task;
    });

    showSnackbar('Статус завдання оновлено!');
    applyFiltersAndSort();
};

const handleEditTask = (id, newText) => {
    tasks = tasks.map(task => {
        if (task.id === id && task.text !== newText) {
            return {
                ...task,
                text: newText,
                updatedAt: new Date().toISOString()
            };
        }
        return task;
    });

    applyFiltersAndSort();
};

const handleFilterClick = (filter) => {
    currentFilter = filter;
    applyFiltersAndSort();
};

const handleSortClick = (sortBy) => {
    currentSort = sortBy;
    applyFiltersAndSort();
};

const applyFiltersAndSort = () => {
    let filteredTasks = filterTasks(tasks, currentFilter);

    if (currentSort) {
        filteredTasks = sortTasks(filteredTasks, currentSort);
    }

    renderTasks(filteredTasks);
};

// Initialize the app
const init = () => {
    // Sample data for testing
    tasks = [
        {
            id: generateId(),
            text: 'Вивчити JavaScript',
            completed: false,
            createdAt: '2025-01-15T10:00:00Z',
            updatedAt: '2025-01-15T10:00:00Z'
        },
        {
            id: generateId(),
            text: 'Зробити лабораторну роботу',
            completed: true,
            createdAt: '2025-02-20T14:30:00Z',
            updatedAt: '2025-02-21T09:15:00Z'
        },
        {
            id: generateId(),
            text: 'Приготувати обід',
            completed: false,
            createdAt: '2025-03-05T09:15:00Z',
            updatedAt: '2025-03-05T09:15:00Z'
        }
    ];

    // Set up event listeners
    document.getElementById('add-btn').addEventListener('click', handleAddTask);

    document.getElementById('task-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const taskItem = e.target.closest('.task-item');
            handleDeleteTask(taskItem.dataset.id);
        }

        if (e.target.classList.contains('filter-btn')) {
            handleFilterClick(e.target.dataset.filter);
        }

        if (e.target.classList.contains('sort-btn')) {
            handleSortClick(e.target.dataset.sort);
        }
    });

    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('task-checkbox')) {
            const taskItem = e.target.closest('.task-item');
            handleToggleComplete(taskItem.dataset.id);
        }
    });

    document.addEventListener('blur', (e) => {
        if (e.target.classList.contains('task-text')) {
            const taskItem = e.target.closest('.task-item');
            handleEditTask(taskItem.dataset.id, e.target.textContent.trim());
        }
    }, true);

    // Initial render
    applyFiltersAndSort();
};

// Start the app
document.addEventListener('DOMContentLoaded', init);