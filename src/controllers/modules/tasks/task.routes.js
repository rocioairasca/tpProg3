const express = require('express');
const taskService = require("./task.service");

const router = express.Router();

// GET /task
router.get('/task', async (req, res) => {
    // #swagger.tags = ['Tareas']
    try {
        const params = JSON.parse(req.headers['params']);
        const paginated = await taskService.paginated(params);
        return res.status(200).send(paginated);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

// GET /task/:id
router.get("/task/:id", async (req, res) => {
    // #swagger.tags = ['Tareas']
    try {
        const taskId = req.params.id;
        const task = await taskService.findOneById(taskId);
        return res.status(200).send(task);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

// POST /task
router.post("/task", async (req, res) => {
    // #swagger.tags = ['Tareas']
    try {
        const newTask = req.body;
        console.log(newTask);
        const task = await taskService.save(newTask);
        return res.status(201).send(task);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

// PUT /task/:id
router.put("/task/:id", async (req, res) => {
    // #swagger.tags = ['Tareas']
    try {
        const taskId = req.params.id;
        const updatedTask = req.body;
        const task = await taskService.update(taskId, updatedTask);
        return res.status(200).send(task);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

// DELETE /task/:id
router.delete("/task/:id", async (req, res) => {
    // #swagger.tags = ['Tareas']
    try {
        const taskId = req.params.id;
        await taskService.remove(taskId);
        return res.status(200).send("Task deleted successfully.");

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

module.exports = router;
