// App.tsx
import React, { useState, useEffect } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskService";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const App: React.FC = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks in useEffect:", error);
        // Consider displaying an error message to the user
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (newTask: any) => {
    try {
      const createdTask = await createTask(newTask);
      setTasks([...tasks, createdTask]);
    } catch (error) {
      // Handle error (e.g., show error message)
    }
  };

  const handleUpdateTask = async (updatedTask: any) => {
    try {
      const updated = await updateTask(updatedTask.id, updatedTask);
      setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
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
      <h1 class="text-slate-500">Task Manager</h1>
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
