# Task Manager API

## Overview

- Task Manager API is a simple RESTful API built using Express.js for managing tasks.
- Supports basic CRUD operations (Create, Read, Update, Delete) on tasks.
- Includes additional features like:
  - Filtering tasks by their completion status.
  - Sorting tasks by creation date (oldest/newest first).
  - Getting tasks data by priority.
  - Can be tested by `curl` or any API testing tools like `Postman`.

## Setup Instructions

### Prerequisites

- **Node.js v18+** ([Installation Link](https://nodejs.org/))
    

### Installation

1. Clone the repository:
    
```bash
git clone https://github.com/airtribe-projects/task-manager-api-kunal2899.git
cd task-manager-api-kunal2899
```
    
2. Install dependencies:

```bash
npm install
```
    
3. Start the server:
    
```bash
npm run dev
```
    Server will listen on `localhost:3000` 🚀
       
4. Run tests:
    
```bash
npm test
```

## Detailed API Documentation for Task Manager API

### 1. **Get All Tasks**

- **Endpoint**: `GET /v1/tasks`
- **Description**: Retrieves a list of all tasks.
- **Query Parameters**:
  - `completed` (optional): Filters tasks by completion status (`true` or `false`).
  - `sortBy` (optional): Sorts tasks by creation date (`oldest` or `newest`).
- **Response**:
  - **200 OK**: Returns a list of tasks that match the provided filters and sort order.
  - **Example Response**:
    ```json
    [
      {
        "id": 1,
        "title": "Set up environment",
        "description": "Install Node.js, npm, and git",
        "completed": true,
        "priority": "low",
        "createdAt": "2023-10-01T12:00:00.000Z"
      }
    ]
    ```
- **curl Example**:
  ```bash
  curl -X GET "http://localhost:3000/v1/tasks?completed=true&sortBy=newest"
  ```

---

### 2. **Get a Task by ID**

- **Endpoint**: `GET /v1/tasks/:id`
- **Description**: Retrieves a specific task by its ID.
- **URL Parameters**:
  - `id`: The ID of the task to be retrieved.
- **Response**:
  - **200 OK**: Returns the task with the given ID.
  - **404 Not Found**: Returns if the task with the given ID does not exist.
  - **Example Response**:
    ```json
    {
      "id": 1,
      "title": "Set up environment",
      "description": "Install Node.js, npm, and git",
      "completed": true,
      "priority": "low",
      "createdAt": "2023-10-01T12:00:00.000Z"
    }
    ```

- **curl Example**:
  ```bash
  curl -X GET "http://localhost:3000/v1/tasks/1"
  ```

---

### 3. **Create a Task**

- **Endpoint**: `POST /v1/tasks`
- **Description**: Creates a new task.
- **Request Body**:
  - `title`: String (Required)
  - `description`: String (Required)
  - `completed`: Boolean (Required)
  - `priority`: String (`low`, `medium`, or `high`) (Required)
- **Validation**:
  - The `priority` field must have one of the following values: `low`, `medium`, or `high`. Any other value will result in a `400` error.
  - If the body contains any keys other than `title`, `description`, `completed`, `priority`, or `createdAt`, a `400` error will be returned.
- **Response**:
  - **201 Created**: Returns the newly created task with an assigned ID.
  - **400 Bad Request**: Returns if the payload is invalid or missing required fields.
  - **Example Response**:
    ```json
    {
      "id": 16,
      "title": "New Task",
      "description": "Task Description",
      "completed": false,
      "priority": "medium",
      "createdAt": "2023-10-05T12:00:00.000Z"
    }
    ```
  
- **curl Example**:
  ```bash
  curl -X POST http://localhost:3000/v1/tasks \
    -H "Content-Type: application/json" \
    -d '{
      "title": "New Task",
      "description": "Task Description",
      "completed": false,
      "priority": "medium"
    }'
  ```

---

### 4. **Update a Task**

- **Endpoint**: `PUT /v1/tasks/:id`
- **Description**: Updates an existing task by its ID.
- **URL Parameters**:
  - `id`: The ID of the task to be updated.
- **Request Body**:
  - `title`: String (Optional)
  - `description`: String (Optional)
  - `completed`: Boolean (Optional)
  - `priority`: String (`low`, `medium`, or `high`) (Optional)
- **Validation**:
  - The request body must only include the valid keys: `title`, `description`, `completed`, `priority`, `createdAt`. Any other keys will result in a `400` error.
- **Response**:
  - **200 OK**: Returns the updated task.
  - **404 Not Found**: Returns if the task with the given ID does not exist.
  - **400 Bad Request**: Returns if any invalid keys are provided in the request body.
  - **Example Response**:
    ```json
    {
      "id": 1,
      "title": "Updated Task",
      "description": "Updated Description",
      "completed": true,
      "priority": "high",
      "createdAt": "2023-10-01T12:00:00.000Z"
    }
    ```

- **curl Example**:
  ```bash
  curl -X PUT http://localhost:3000/v1/tasks/1 \
    -H "Content-Type: application/json" \
    -d '{
      "title": "Updated Task",
      "description": "Updated Description",
      "completed": true,
      "priority": "high"
    }'
  ```

---

### 5. **Delete a Task**

- **Endpoint**: `DELETE /v1/tasks/:id`
- **Description**: Deletes a task by its ID.
- **URL Parameters**:
  - `id`: The ID of the task to be deleted.
- **Response**:
  - **200 OK**: Returns a message indicating the task was successfully deleted.
  - **404 Not Found**: Returns if the task with the given ID does not exist.
  - **Example Response**:
    ```json
    {
      "message": "Task deleted successfully"
    }
    ```

- **curl Example**:
  ```bash
  curl -X DELETE http://localhost:3000/v1/tasks/1
  ```

---

### 6. **Get Tasks by Priority**

- **Endpoint**: `GET /v1/tasks/priority/:level`
- **Description**: Retrieves tasks filtered by priority level.
- **URL Parameters**:
  - `level`: The priority level (`low`, `medium`, or `high`).
- **Response**:
  - **200 OK**: Returns a list of tasks with the specified priority.
  - **400 Bad Request**: Returns if the `level` parameter is not one of the valid values (`low`, `medium`, or `high`).
  - **Example Response**:
    ```json
    [
      {
        "id": 1,
        "title": "Set up environment",
        "description": "Install Node.js, npm, and git",
        "completed": true,
        "priority": "high",
        "createdAt": "2023-10-01T12:00:00.000Z"
      }
    ]
    ```

- **curl Example**:
  ```bash
  curl -X GET http://localhost:3000/v1/tasks/priority/high
  ```

---

### Error Handling

- **400 Bad Request**: Returned when:
  - The required fields are missing in the request body.
  - The `priority` field contains an invalid value.
  - Invalid or unexpected keys are included in the request body.
  
- **404 Not Found**: Returned when:
  - The requested task by ID does not exist.
  - The requested priority level is invalid.

---

## Testing the API

### 1. Using Postman

- For the Postman collection of the Tasks API, you can find the `tasksApi.postman-collection.json` file in the root folder.
- Simply import this collection into Postman, and you'll have all the API endpoints ready to test.
    

### 2. Using `curl`

- Run the example `curl` commands on terminal provided for each endpoint in the **API Endpoints** section.
    

---

## Task Structure

Tasks are stored in `task.json` with the following structure -

```json
{
  "tasks": [
    {
      "id": "__UUID__", // unique id 
      "title": "Title for task",
      "description": "About task", // string
      "completed": false, // boolean
      "priority": "low", // can be among low, medium or high
      "createdAt": "2023-10-01T12:00:00.000Z" // created timestamp
    }
  ]
}
```