const tap = require("tap");
const supertest = require("supertest");
const app = require("../app");
const server = supertest(app);

tap.test("POST /tasks", async (t) => {
  const newTask = {
    title: "New Task",
    description: "New Task Description",
    completed: false,
    priority: 'low',
  };
  const response = await server.post("/v1/tasks").send(newTask);
  t.equal(response.status, 201);
  t.end();
});

tap.test("POST /tasks with invalid data", async (t) => {
  const newTask = {
    title: "New Task",
  };
  const response = await server.post("/v1/tasks").send(newTask);
  t.equal(response.status, 400);
  t.end();
});

tap.test("GET /tasks", async (t) => {
  const response = await server.get("/v1/tasks");
  t.equal(response.status, 200);
  const taskToCheck = response.body.data[0];
  t.hasOwnProp(taskToCheck, "id");
  t.hasOwnProp(taskToCheck, "title");
  t.hasOwnProp(taskToCheck, "description");
  t.hasOwnProp(taskToCheck, "completed");
  t.hasOwnProp(taskToCheck, "priority");
  t.type(taskToCheck.id, "number");
  t.type(taskToCheck.title, "string");
  t.type(taskToCheck.description, "string");
  t.type(taskToCheck.completed, "boolean");
  t.type(taskToCheck.priority, "string");
  t.ok(["low", "medium", "high"].includes(taskToCheck.priority))
  t.end();
});

tap.test("GET /tasks/:id", async (t) => {
  const response = await server.get("/v1/tasks/2");
  t.equal(response.status, 200);
  const expectedTask = {
    id: 2,
    title: "Create a new project",
    description: "Create a new project using the Express application generator",
    completed: true,
    createdAt: "2025-03-01T14:22:14Z",
    priority: "high",
  };
  t.match(response.body.data, expectedTask);
  t.end();
});

tap.test("GET /tasks/:id with invalid id", async (t) => {
  const response = await server.get("/v1/tasks/999");
  t.equal(response.status, 404);
  t.end();
});

tap.test("PUT /tasks/:id", async (t) => {
  const updatedTask = {
    title: "Updated Task",
    description: "Updated Task Description",
    completed: true,
  };
  const response = await server.put("/v1/tasks/3").send(updatedTask);
  t.equal(response.status, 200);
  t.end();
});

tap.test("PUT /tasks/:id with invalid id", async (t) => {
  const updatedTask = {
    title: "Updated Task",
    description: "Updated Task Description",
    completed: true,
  };
  const response = await server.put("/v1/tasks/999").send(updatedTask);
  t.equal(response.status, 404);
  t.end();
});

tap.test("PUT /tasks/:id with invalid data", async (t) => {
  const updatedTask = {
    title: "Updated Task",
    description: "Updated Task Description",
    completed: "true",
  };
  const response = await server.put("/v1/tasks/3").send(updatedTask);
  t.equal(response.status, 400);
  t.end();
});

tap.test("DELETE /tasks/:id", async (t) => {
  const response = await server.delete("/v1/tasks/1");
  t.equal(response.status, 200);
  t.end();
});

tap.test("DELETE /tasks/:id with invalid id", async (t) => {
  const response = await server.delete("/v1/tasks/999");
  t.equal(response.status, 404);
  t.end();
});

tap.teardown(() => {
  process.exit(0);
});
