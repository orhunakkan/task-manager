'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const createTaskButton = document.getElementById('create-task-button');
    const taskForm = document.getElementById('task-form');
    const closeBtn = document.getElementById('close-btn');

    taskForm.style.display = 'none';

    createTaskButton.addEventListener('click', function () {
        taskForm.style.display = 'block';
    });

    closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        taskForm.style.display = 'none';
    });

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const taskName = document.getElementById('task-name').value;
        const taskDescription = document.getElementById('task-description').value;
        const dueDate = document.getElementById('due-date').value;

        if (!taskName.trim()) {
            alert('Task name is required!');
            return;
        }

        const task = {
            name: taskName,
            description: taskDescription,
            dueDate: dueDate
        };

        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Server error');
            }
            return response.json();
        })
        .then(data => {
            taskForm.style.display = 'none';
            taskForm.reset();
            alert('Task created successfully!');
        })
        .catch(error => {
            alert('Failed to create task');
        });
    });
});

