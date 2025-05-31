document.addEventListener('DOMContentLoaded', function () {
    const tasksContainer = document.getElementById('tasks');
    const noTasksMessage = document.getElementById('noTasks');

    // Format date to be more readable
    function formatDate(dateString) {
        if (!dateString) return 'No due date';

        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Function to display tasks in the UI
    function displayTasks(tasks) {
        tasksContainer.innerHTML = ''; // Clear current tasks

        if (tasks.length === 0) {
            noTasksMessage.style.display = 'block';
            return;
        }

        noTasksMessage.style.display = 'none';

        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task-item';
            
            // Add a status class based on due date
            const dueDate = task.due_date ? new Date(task.due_date) : null;
            const today = new Date();
            if (dueDate && dueDate < today) {
                taskElement.classList.add('task-overdue');
            }
            
            taskElement.innerHTML = `
                <div class="task-header">
                    <div class="task-title">${task.title}</div>
                    <div class="task-date">Due: ${formatDate(task.due_date)}</div>
                </div>
                <div class="task-description">${task.description || 'No description'}</div>
            `;

            tasksContainer.appendChild(taskElement);
        });
    }

    // Fetch and display tasks with better error handling
    async function loadTasks() {
        try {
            // Show loading indicator
            noTasksMessage.textContent = 'Loading tasks...';
            noTasksMessage.style.display = 'block';
            
            const response = await fetch('/api/tasks');

            if (response.ok) {
                const tasks = await response.json();
                displayTasks(tasks);
            } else {
                console.error('Failed to fetch tasks:', response.status);
                noTasksMessage.textContent = `Failed to load tasks (${response.status}). Please try again later.`;
                noTasksMessage.style.display = 'block';
            }
        } catch (err) {
            console.error('Error loading tasks:', err);
            noTasksMessage.textContent = 'Failed to load tasks. Please check your connection and try again.';
            noTasksMessage.style.display = 'block';
        }
    }

    // Load tasks when page loads
    loadTasks();
});
