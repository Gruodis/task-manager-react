// taskService.ts
import axios from "axios";

const apiUrl = "http://localhost:3001/api/tasks";

export const getTasks = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (task: any) => {
  // You might want to define a Task type
  try {
    const response = await axios.post(apiUrl, task);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (id: number, task: any) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, task);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (id: number) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
