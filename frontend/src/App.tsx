// src/App.tsx
import React, { useState, useEffect } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskService";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

interface Task {
  // Define the Task interface
  id?: number;
  title: string;
  description: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // Initialize with Task[] type

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks in useEffect:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (newTask: Task) => {
    // Use Task type
    try {
      const createdTask = await createTask(newTask);
      setTasks([...tasks, createdTask]);
    } catch (error) {
      // Handle error (e.g., show error message)
    }
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      if (updatedTask.id !== undefined) {
        // Check if id exists
        const updated = await updateTask(updatedTask.id, updatedTask);
        setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
      } else {
        // Handle the case where id is undefined (e.g., show an error)
        console.error("Cannot update task without an ID.");
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h1 className="text-slate-500">Task Manager</h1> {/* Use className */}
      <TaskForm onAddTask={handleAddTask} onUpdateTask={handleUpdateTask} />
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onUpdateTask={handleUpdateTask}
      />
    </div>
  );
};

export default App;
