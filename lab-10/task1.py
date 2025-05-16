'''
TASK: You are suppose to create a To-Do List with FastAPI.

Pydantic Request model scheme:
1. Name
2. Activity
3. Completed

Pydantic Response model scheme:
1. unique id
2. Name
3. Activity
4. Completed

Pydantic Update model scheme:
1. completed

Requirements:
1. A dictionary to hold the activities
2. A Pydantic model for the To-Do List both request and response model
3. A GET request to get all the completed tasks
    /get-completed
4. A GET request to get all the uncompleted tasks
    /get-uncompleted
5. A POST request to add a new task
    /add-new
6. An UPDATE request to update an old task based on unique id ( Only update the task status )
    /update-task
7. A DELETE request to delete a task based on unique id
    /delete-task
    
Do not use path parameters or route parameters for this task.

This is an open ended question.

Marking Scheme.
1. 1 mark for running this model
2. 1 mark for Req 3.
3. 1 mark for Req 4
4. 2 marks for Req 5 ( 1 for basic, 1 for checking if a task with id exists ) 
5. 1 marks for correct implementation of pydantic model
6. 2 mark for Req 6 ( 1 for basic, 1 for checking if a task with id exists )
7. 2 makks for Req 7 ( 1 for basic, 1 for checking if a task with id exists )
'''
from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from typing import Dict, List, Optional
import uuid

# Create FastAPI application instance
app = FastAPI(title="Task Manager API")

# In-memory data store for tasks
# Format: {task_identifier: {"task_name": str, "task_description": str, "is_done": bool}}
task_storage: Dict[str, dict] = {}

# Define data models using Pydantic
class TaskRequestModel(BaseModel):
    task_name: str
    task_description: str
    is_done: bool = False  # Default to not completed

class TaskResponseModel(BaseModel):
    task_id: str
    task_name: str
    task_description: str
    is_done: bool

class TaskStatusUpdateModel(BaseModel):
    is_done: bool

# Endpoint to retrieve all completed tasks
@app.get("/get-completed", response_model=List[TaskResponseModel])
def retrieve_completed_tasks():
    result = []
    for tid, task_data in task_storage.items():
        if task_data["is_done"]:
            result.append(
                TaskResponseModel(
                    task_id=tid,
                    task_name=task_data["task_name"],
                    task_description=task_data["task_description"],
                    is_done=task_data["is_done"]
                )
            )
    return result

# Endpoint to retrieve all pending tasks
@app.get("/get-uncompleted", response_model=List[TaskResponseModel])
def retrieve_pending_tasks():
    result = []
    for tid, task_data in task_storage.items():
        if not task_data["is_done"]:
            result.append(
                TaskResponseModel(
                    task_id=tid,
                    task_name=task_data["task_name"],
                    task_description=task_data["task_description"],
                    is_done=task_data["is_done"]
                )
            )
    return result

# Endpoint to create a new task
@app.post("/add-new", response_model=TaskResponseModel)
def create_task(task_data: TaskRequestModel):
    # Generate unique identifier
    new_id = str(uuid.uuid4())
    
    # Store task information
    task_storage[new_id] = {
        "task_name": task_data.task_name,
        "task_description": task_data.task_description,
        "is_done": task_data.is_done
    }
    
    # Return complete task info with ID
    return TaskResponseModel(
        task_id=new_id,
        task_name=task_data.task_name,
        task_description=task_data.task_description,
        is_done=task_data.is_done
    )

# Endpoint to modify task completion status
@app.put("/update-task", response_model=TaskResponseModel)
def modify_task_status(task_id: str = Body(...), status_update: TaskStatusUpdateModel = Body(...)):
    # Verify task exists
    if task_id not in task_storage:
        raise HTTPException(status_code=404, detail="Task identifier not found")
    
    # Update completion status only
    task_storage[task_id]["is_done"] = status_update.is_done
    
    # Return updated task information
    return TaskResponseModel(
        task_id=task_id,
        task_name=task_storage[task_id]["task_name"],
        task_description=task_storage[task_id]["task_description"],
        is_done=task_storage[task_id]["is_done"]
    )

# Endpoint to remove a task
@app.delete("/delete-task", response_model=dict)
def remove_task(task_id: str = Body(...)):
    # Verify task exists
    if task_id not in task_storage:
        raise HTTPException(status_code=404, detail="Task identifier not found")
    
    # Remove task from storage
    del task_storage[task_id]
    
    # Return success confirmation
    return {"result": f"Task {task_id} successfully removed from system"}

