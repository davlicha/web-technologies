document.addEventListener('DOMContentLoaded', function() {
    const tasks = document.querySelectorAll('.task');
    const columns = document.querySelectorAll('.kanban-column .tasks');
    const addTaskButtons = document.querySelectorAll('.add-task');

    tasks.forEach(task => {
        task.addEventListener('dragstart', dragStart);
        task.addEventListener('dragend', dragEnd);
    });

    columns.forEach(column => {
        column.addEventListener('dragover', dragOver);
        column.addEventListener('dragenter', dragEnter);
        column.addEventListener('dragleave', dragLeave);
        column.addEventListener('drop', drop);
    });

    addTaskButtons.forEach(button => {
        button.addEventListener('click', addNewTask);
    });

    let dropIndicator = null;

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.target.classList.add('dragging');

        dropIndicator = document.createElement('div');
        dropIndicator.className = 'drop-indicator';
    }

    function dragEnd(e) {
        e.target.classList.remove('dragging');
        if (dropIndicator && dropIndicator.parentNode) {
            dropIndicator.parentNode.removeChild(dropIndicator);
        }
    }

    function dragOver(e) {
        e.preventDefault();
        const draggingTask = document.querySelector('.dragging');
        if (!draggingTask) return;

        const afterElement = getDragAfterElement(this, e.clientY);

        if (dropIndicator.parentNode) {
            dropIndicator.parentNode.removeChild(dropIndicator);
        }

        if (afterElement) {
            this.insertBefore(dropIndicator, afterElement);
        } else {
            this.appendChild(dropIndicator);
        }
    }

    function dragEnter(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    }

    function dragLeave() {
        this.classList.remove('drag-over');
        if (dropIndicator.parentNode === this) {
            this.removeChild(dropIndicator);
        }
    }

    function drop(e) {
        e.preventDefault();
        this.classList.remove('drag-over');

        if (dropIndicator.parentNode) {
            dropIndicator.parentNode.removeChild(dropIndicator);
        }

        const taskId = e.dataTransfer.getData('text/plain');
        const draggedTask = document.getElementById(taskId);

        const afterElement = getDragAfterElement(this, e.clientY);

        if (afterElement) {
            this.insertBefore(draggedTask, afterElement);
        } else {
            this.appendChild(draggedTask);
        }
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    function addNewTask(e) {
        const column = e.target.parentElement;
        const tasksContainer = column.querySelector('.tasks');

        const newTask = document.createElement('div');
        newTask.className = 'task';
        newTask.draggable = true;
        newTask.id = 'task' + Date.now();

        const taskTitle = prompt('Введіть назву завдання:');
        if (!taskTitle) return;

        newTask.innerHTML = `
            <h3>${taskTitle}</h3>
        `;

        newTask.addEventListener('dragstart', dragStart);
        newTask.addEventListener('dragend', dragEnd);

        tasksContainer.appendChild(newTask);
    }
});