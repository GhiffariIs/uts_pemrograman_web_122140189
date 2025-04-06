import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTodos, fetchTodoById, createTodo, updateTodo, deleteTodo } from '../api/todoApi';

// Fungsi untuk menyimpan state ke localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todos', serializedState);
  } catch (error) {
    console.error('Gagal menyimpan ke localStorage:', error);
  }
};

// Fungsi untuk mengambil state dari localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('todos');
    if (serializedState === null) return [];
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Gagal mengambil dari localStorage:', error);
    return [];
  }
};

// Async thunks
export const fetchTodosAsync = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTodos();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTodoByIdAsync = createAsyncThunk(
  'todos/fetchTodoById',
  async (id, { rejectWithValue }) => {
    try {
      return await fetchTodoById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTodoAsync = createAsyncThunk(
  'todos/createTodo',
  async (todo, { rejectWithValue }) => {
    try {
      return await createTodo(todo);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTodoAsync = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      return await updateTodo(id, updates);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodo',
  async (id, { rejectWithValue }) => {
    try {
      await deleteTodo(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: loadFromLocalStorage(), // Ambil data dari localStorage
    currentTodo: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearCurrentTodo: (state) => {
      state.currentTodo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all todos
      .addCase(fetchTodosAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        saveToLocalStorage(state.items); // Simpan ke localStorage
      })
      .addCase(fetchTodosAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Fetch todo by id
      .addCase(fetchTodoByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodoByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentTodo = action.payload;
      })
      .addCase(fetchTodoByIdAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Create todo
      .addCase(createTodoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTodoAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
        saveToLocalStorage(state.items); // Simpan ke localStorage
      })
      .addCase(createTodoAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Update todo
      .addCase(updateTodoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentTodo && state.currentTodo.id === action.payload.id) {
          state.currentTodo = action.payload;
        }
        saveToLocalStorage(state.items); // Simpan ke localStorage
      })
      .addCase(updateTodoAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Delete todo
      .addCase(deleteTodoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(todo => todo.id !== action.payload);
        if (state.currentTodo && state.currentTodo.id === action.payload) {
          state.currentTodo = null;
        }
        saveToLocalStorage(state.items); // Simpan ke localStorage
      })
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearCurrentTodo } = todoSlice.actions;

export default todoSlice.reducer;