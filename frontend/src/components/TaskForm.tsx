// TaskForm.tsx
import React, { useState } from "react";

interface Task {
  id?: number; // Optional for new tasks
  title: string;
  description: string;
  completed: boolean;
}

interface TaskFormProps {
  onAddTask: (task: Task) => void;
  onUpdateTask: (task: Task) => void;
  initialTask?: Task; // For editing existing tasks
}

const TaskForm: React.FC<TaskFormProps> = ({
  onAddTask,
  onUpdateTask,
  initialTask,
}) => {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(
    initialTask?.description || ""
  );
  const [completed, setCompleted] = useState(initialTask?.completed || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = { title, description, completed };

    if (initialTask) {
      // If editing an existing task
      onUpdateTask({ ...newTask, id: initialTask.id });
    } else {
      // If adding a new task
      onAddTask(newTask);
    }

    // Clear the form
    setTitle("");
    setDescription("");
    setCompleted(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <input
          type="checkbox"
          id="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <label htmlFor="completed">Completed</label>
      </div>
      <button type="submit">{initialTask ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
