document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const newTaskBtn = document.getElementById('newTaskBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const taskFormContainer = document.getElementById('taskFormContainer');
    
    // Show the form when the New Task button is clicked
    newTaskBtn.addEventListener('click', function() {
        taskFormContainer.style.display = 'block';
        newTaskBtn.style.display = 'none';
    });
    
    // Hide the form when the Cancel button is clicked
    cancelBtn.addEventListener('click', function() {
        taskFormContainer.style.display = 'none';
        newTaskBtn.style.display = 'inline-block';
        taskForm.reset();
    });
    
    // Handle form submission
    taskForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('dueDate').value;
        
        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    dueDate: dueDate || null
                })
            });
            
            if (response.ok) {
                const task = await response.json();
                console.log('Task created:', task);
                
                // Clear the form
                taskForm.reset();
                
                // Hide the form and show the button
                taskFormContainer.style.display = 'none';
                newTaskBtn.style.display = 'inline-block';
                
                // Show success message
                alert('Task created successfully!');
                
                // You could add code here to display the new task in the UI
                // This would require a GET endpoint to fetch tasks
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'Something went wrong'}`);
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            alert('Failed to create task. Please try again.');
        }
    });
});
