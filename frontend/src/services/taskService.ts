// src/services/taskService.ts
import axios from "axios";

const apiUrl = "http://localhost:3001/api/tasks";

export interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
}

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (task: Task): Promise<Task> => {
  try {
    const response = await axios.post(apiUrl, task);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (id: number, task: Task): Promise<Task> => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, task);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
