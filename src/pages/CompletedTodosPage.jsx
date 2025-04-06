import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import TodoList from '../components/TodoList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import useTodoActions from '../hooks/useTodoActions';
import { useTheme } from '../context/ThemeContext';

const CompletedTodosPage = () => {
  const { darkMode } = useTheme();
  const { items, status, error } = useSelector(state => state.todos);
  const { fetchTodos, toggleTodoCompletion, removeTodo, editTodoTitle } = useTodoActions();

  useEffect(() => {
    // Only fetch todos if they haven't been loaded yet
    if (items.length === 0 && status !== 'loading') {
      fetchTodos();
    }
  }, [fetchTodos, items.length, status]);

  // Filter completed todos
  const completedTodos = useMemo(() => {
    return items.filter(todo => todo.completed);
  }, [items]);

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    color: darkMode ? '#e4e4e7' : '#333'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '20px'
  };

  const statsStyle = {
    textAlign: 'center',
    margin: '20px 0',
    padding: '10px',
    backgroundColor: darkMode ? '#333' : '#f3f4f6',
    borderRadius: '4px'
  };

  if (status === 'loading' && items.length === 0) {
    return (
      <div style={containerStyle}>
        <h1 style={headerStyle}>Completed Todos</h1>
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'failed' && items.length === 0) {
    return (
      <div style={containerStyle}>
        <h1 style={headerStyle}>Completed Todos</h1>
        <ErrorMessage 
          message={error || 'Failed to load todos'} 
          onRetry={fetchTodos} 
        />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Completed Todos</h1>
      
      <div style={statsStyle}>
        <p>
          <strong>{completedTodos.length}</strong> of <strong>{items.length}</strong> todos completed
          ({items.length > 0 ? Math.round((completedTodos.length / items.length) * 100) : 0}%)
        </p>
      </div>
      
      {status === 'loading' && items.length > 0 && <LoadingSpinner size={30} />}
      
      {status === 'failed' && items.length > 0 && (
        <ErrorMessage message={error} onRetry={fetchTodos} />
      )}
      
      <TodoList 
        todos={completedTodos} 
        onToggle={toggleTodoCompletion}
        onDelete={removeTodo}
        onEdit={editTodoTitle}
      />
    </div>
  );
};

export default CompletedTodosPage;