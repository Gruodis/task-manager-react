import { Router } from "express";
const router = Router();
import { connection as db } from "../db.js";

// Get all tasks
router.get("/", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch tasks" });
    } else {
      res.json(results);
    }
  });
});

// Get task by ID
router.get("/:id", (req, res) => {
  const taskId = req.params.id;
  db.query("SELECT * FROM tasks WHERE id = ?", [taskId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch task" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json(results[0]);
    }
  });
});

// Create a new task
router.post("/", (req, res) => {
  const { title, description } = req.body;
  db.query(
    "INSERT INTO tasks (title, description) VALUES (?, ?)",
    [title, description],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create task" });
      } else {
        res.status(201).json({ id: result.insertId, title, description });
      }
    }
  );
});

// Update a task
router.put("/:id", (req, res) => {
  const taskId = req.params.id;
  const { title, description, completed } = req.body;
  db.query(
    "UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?",
    [title, description, completed, taskId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update task" });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: "Task not found" });
      } else {
        res.json({ id: taskId, title, description, completed });
      }
    }
  );
});

// Delete a task
router.delete("/:id", (req, res) => {
  const taskId = req.params.id;
  db.query("DELETE FROM tasks WHERE id = ?", [taskId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete task" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(204).send(); // No content
    }
  });
});

export default router;
