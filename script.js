'use strict';

let data = {
	taskName: "",
	taskDescription: "",
	dueDate: ""
};

document.querySelector('#create-task-button').addEventListener('click', function () {
	document.querySelector('#task-form').style.display = 'block';
})

document.querySelector('#close-btn').addEventListener('click', function () {
	document.querySelector('#task-form').style.display = 'none';
});

document.querySelector('#task-form').addEventListener('submit', function (e) {
	e.preventDefault();

	data.taskName = document.querySelector('#task-name').value;
	data.taskDescription = document.querySelector('#task-description').value;
	data.dueDate = document.querySelector('#due-date').value;

	fetch('/tasks', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	})
	.then(response => {
		if (!response.ok) {
			throw new Error(`Server error: ${response.status}`);
		}
		return response.json();
	})
	.then(result => {
		console.log('Success:', result);
		document.querySelector('#task-form').style.display = 'none';
	})
	.catch(error => {
		console.error('Failed to save task:', error);
		alert('Task could not be saved. See console for details.');
	});
});

