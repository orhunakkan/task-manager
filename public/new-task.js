document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const titleInput = document.getElementById('title');

    // Set focus to the title field for better UX
    titleInput.focus();

    // Handle form submission
    taskForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        try {
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Adding...';
            
            const title = titleInput.value.trim();
            const description = document.getElementById('description').value.trim();
            const dueDate = document.getElementById('dueDate').value;

            if (!title) {
                alert('Title is required');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                return;
            }

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

                // Show success message
                alert('Task created successfully!');
                
                // Redirect to home page
                window.location.href = '/home';
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'Something went wrong'}`);
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            alert('Failed to create task. Please try again.');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
});
