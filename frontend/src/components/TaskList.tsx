// src/components/TaskList.tsx
import React from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: number) => void;
  onUpdateTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDeleteTask,
  onUpdateTask,
}) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Completed: {task.completed ? "Yes" : "No"}</p>
          <button type="button" onClick={() => onDeleteTask(task.id)}>
            Delete
          </button>
          <button type="button" onClick={() => onUpdateTask(task)}>
            Edit
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
