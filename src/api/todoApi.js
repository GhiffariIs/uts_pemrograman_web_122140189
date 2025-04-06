import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Perbaikan: Hapus {id} dari baseURL
});

// Fetch all todos
export const fetchTodos = async () => {
  try {
    const response = await api.get('/todos?_limit=10'); // Perbaikan: Pastikan endpoint benar
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch todos: ${error.message}`);
  }
};

// Fetch todo by ID
export const fetchTodoById = async (id) => {
  try {
    if (!id || id < 1 || id > 200) { // Validasi ID
      throw new Error('Invalid ID: ID must be between 1 and 200');
    }
    const response = await api.get(`/todos/${id}`); // Perbaikan: Pastikan endpoint benar
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch todo: ${error.message}`);
  }
};

// Create a new todo
export const createTodo = async (todo) => {
  try {
    const response = await api.post('/todos', todo);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create todo: ${error.message}`);
  }
};

// Update an existing todo
export const updateTodo = async (id, updates) => {
  try {
    const response = await api.patch(`/todos/${id}`, updates);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update todo: ${error.message}`);
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    await api.delete(`/todos/${id}`);
    return id;
  } catch (error) {
    throw new Error(`Failed to delete todo: ${error.message}`);
  }
};