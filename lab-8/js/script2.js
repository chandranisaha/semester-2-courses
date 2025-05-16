// Wait for the DOM to fully load before executing
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const todoContainer = document.querySelector('.todo-container');
    
    // Create and append task counter
    const taskCounter = document.createElement('p');
    taskCounter.id = 'taskCounter';
    taskCounter.style.textAlign = 'center';
    taskCounter.style.marginTop = '10px';
    todoContainer.appendChild(taskCounter);
    
    // Array to store tasks
    let tasks = [];
    
    // Add task when button is clicked
    addTaskBtn.addEventListener('click', addTask);
    
    // Add task when Enter key is pressed in the input field
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        
        // Only add non-empty tasks
        if (taskText) {
            // Create new task object
            const task = {
                id: Date.now(), // Unique ID using timestamp
                text: taskText,
                completed: false
            };
            
            // Add task to array
            tasks.push(task);
            
            // Update UI
            renderTasks();
            
            // Clear input field
            taskInput.value = '';
            
            // Focus on input field for next entry
            taskInput.focus();
        }
    }
    
    // Function to toggle task completion status
    function toggleTaskStatus(taskId) {
        // Find task in array and toggle its completed status
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        
        // Update UI
        renderTasks();
    }
    
    // Function to delete a task
    function deleteTask(taskId) {
        // Remove task from array
        tasks = tasks.filter(task => task.id !== taskId);
        
        // Update UI
        renderTasks();
    }
    
    // Function to render tasks to the DOM
    function renderTasks() {
        // Clear current list
        taskList.innerHTML = '';
        
        // Add each task to the list
        tasks.forEach(task => {
            // Create list item
            const li = document.createElement('li');
            
            // Create task text span
            const taskTextSpan = document.createElement('span');
            taskTextSpan.textContent = task.text;
            
            // Add completed class if task is completed
            if (task.completed) {
                taskTextSpan.classList.add('completed');
            }
            
            // Make task text clickable for toggling status
            taskTextSpan.addEventListener('click', function() {
                toggleTaskStatus(task.id);
            });
            
            // Create delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', function() {
                deleteTask(task.id);
            });
            
            // Append elements to list item
            li.appendChild(taskTextSpan);
            li.appendChild(deleteBtn);
            
            // Append list item to task list
            taskList.appendChild(li);
        });
        
        // Update task counter
        updateTaskCounter();
    }
    
    // Function to update the task counter
    function updateTaskCounter() {
        const remainingTasks = tasks.filter(task => !task.completed).length;
        taskCounter.textContent = `${remainingTasks} task${remainingTasks !== 1 ? 's' : ''} remaining`;
    }
    
    // Add CSS for completed tasks
    const style = document.createElement('style');
    style.textContent = `
        .completed {
            text-decoration: line-through;
            color: gray;
        }
    `;
    document.head.appendChild(style);
});