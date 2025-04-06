import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import useTodoActions from '../hooks/useTodoActions';
import { useTheme } from '../context/ThemeContext';

const HomePage = () => {
  const { darkMode } = useTheme();
  const { items, status, error } = useSelector(state => state.todos);
  const { fetchTodos, createTodo, toggleTodoCompletion, removeTodo, editTodoTitle } = useTodoActions();
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  useEffect(() => {
    // Only fetch todos if they haven't been loaded yet
    if (items.length === 0 && status !== 'loading') {
      fetchTodos();
    }
  }, [fetchTodos, items.length, status]);

  // Filter todos based on active filter
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return items.filter(todo => !todo.completed);
      case 'completed':
        return items.filter(todo => todo.completed);
      default:
        return items;
    }
  }, [items, filter]);

  // Stats for the filter buttons
  const todoStats = useMemo(() => ({
    all: items.length,
    active: items.filter(todo => !todo.completed).length,
    completed: items.filter(todo => todo.completed).length
  }), [items]);

  const handleAddTodo = (todoData) => {
    createTodo(todoData);
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    color: darkMode ? '#e4e4e7' : '#333'
  };

  const headerStyle = {
    marginBottom: '20px',
    textAlign: 'center'
  };

  const filterContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px'
  };

  const filterButtonStyle = (active) => ({
    padding: '8px 12px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: active 
      ? (darkMode ? '#3b82f6' : '#2563eb') 
      : (darkMode ? '#333' : '#e5e7eb'),
    color: active 
      ? '#fff' 
      : (darkMode ? '#e4e4e7' : '#4b5563'),
    transition: 'background-color 0.2s',
    fontWeight: active ? 'bold' : 'normal'
  });

  if (status === 'loading' && items.length === 0) {
    return (
      <div style={containerStyle}>
        <h1 style={headerStyle}>Todo List</h1>
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'failed' && items.length === 0) {
    return (
      <div style={containerStyle}>
        <h1 style={headerStyle}>Todo List</h1>
        <ErrorMessage 
          message={error || 'Failed to load todos'} 
          onRetry={fetchTodos} 
        />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Todo List</h1>
      
      <TodoForm onAddTodo={handleAddTodo} />
      
      <div style={filterContainerStyle}>
        <button 
          onClick={() => setFilter('all')} 
          style={filterButtonStyle(filter === 'all')}
        >
          All ({todoStats.all})
        </button>
        <button 
          onClick={() => setFilter('active')} 
          style={filterButtonStyle(filter === 'active')}
        >
          Active ({todoStats.active})
        </button>
        <button 
          onClick={() => setFilter('completed')} 
          style={filterButtonStyle(filter === 'completed')}
        >
          Completed ({todoStats.completed})
        </button>
      </div>
      
      {status === 'loading' && items.length > 0 && <LoadingSpinner size={30} />}
      
      {status === 'failed' && items.length > 0 && (
        <ErrorMessage message={error} onRetry={fetchTodos} />
      )}
      
      <TodoList 
        todos={filteredTodos} 
        onToggle={toggleTodoCompletion}
        onDelete={removeTodo}
        onEdit={editTodoTitle}
      />
    </div>
  );
};

export default HomePage;