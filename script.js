'use strict';

document.querySelector('#create-task-button').addEventListener('click', function () {
	document.querySelector('#task-form').style.display = 'block';
})

document.querySelector('#close-btn').addEventListener('click', function () {
  	document.querySelector('#task-form').style.display = 'none';
});

document.querySelector('#task-form').addEventListener('submit', function (e) {
  e.preventDefault();
});
