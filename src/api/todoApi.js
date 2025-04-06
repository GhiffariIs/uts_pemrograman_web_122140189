import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export const fetchTodos = async () => {
  try {
    const response = await api.get('/todos?_limit=10');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch todos: ${error.message}`);
  }
};

export const fetchTodoById = async (id) => {
  try {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch todo: ${error.message}`);
  }
};

export const createTodo = async (todo) => {
  try {
    const response = await api.post('/todos', todo);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create todo: ${error.message}`);
  }
};

export const updateTodo = async (id, updates) => {
  try {
    const response = await api.patch(`/todos/${id}`, updates);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update todo: ${error.message}`);
  }
};

export const deleteTodo = async (id) => {
  try {
    await api.delete(`/todos/${id}`);
    return id;
  } catch (error) {
    throw new Error(`Failed to delete todo: ${error.message}`);
  }
};