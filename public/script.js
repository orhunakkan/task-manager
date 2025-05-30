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

		console.log('Sending task:', task); // Log what we're sending
		const jsonData = JSON.stringify(task);
		console.log('Stringified JSON:', jsonData); // Verify JSON string

		// Send task to server
		fetch('/tasks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: jsonData
		})
			.then(async response => {
				console.log('Response status:', response.status);
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.error || 'Server error: ' + response.status);
				}
				return response.json();
			})
			.then(data => {
				console.log('Success:', data);
				taskForm.style.display = 'none';
				taskForm.reset();
				alert('Task created successfully!');
			})
			.catch(error => {
				console.error('Error:', error);
				alert('Failed to create task: ' + error.message);
			});
	});
});

