import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { 
  createTodoAsync, 
  updateTodoAsync, 
  deleteTodoAsync, 
  fetchTodosAsync,
  fetchTodoByIdAsync
} from '../store/todoSlice';

const useTodoActions = () => {
  const dispatch = useDispatch();

  // Create a memoized version of the create action
  const createTodo = useCallback((todo) => {
    return dispatch(createTodoAsync({ 
      title: todo.title, 
      completed: false 
    }));
  }, [dispatch]);

  // Toggle todo completion status
  const toggleTodoCompletion = useCallback((todo) => {
    return dispatch(updateTodoAsync({ 
      id: todo.id, 
      updates: { completed: !todo.completed } 
    }));
  }, [dispatch]);

  // Edit todo title
  const editTodoTitle = useCallback((id, title) => {
    return dispatch(updateTodoAsync({ 
      id, 
      updates: { title } 
    }));
  }, [dispatch]);

  // Delete todo
  const removeTodo = useCallback((id) => {
    return dispatch(deleteTodoAsync(id));
  }, [dispatch]);

  // Fetch all todos
  const fetchTodos = useCallback(() => {
    return dispatch(fetchTodosAsync());
  }, [dispatch]);

  // Fetch single todo
  const fetchTodoById = useCallback((id) => {
    return dispatch(fetchTodoByIdAsync(id));
  }, [dispatch]);

  // Return memoized actions
  const actions = useMemo(() => ({
    createTodo,
    toggleTodoCompletion,
    editTodoTitle,
    removeTodo,
    fetchTodos,
    fetchTodoById
  }), [
    createTodo, 
    toggleTodoCompletion, 
    editTodoTitle, 
    removeTodo,
    fetchTodos,
    fetchTodoById
  ]);

  return actions;
};

export default useTodoActions;