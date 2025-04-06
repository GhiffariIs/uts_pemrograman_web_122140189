import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import useTodoActions from '../hooks/useTodoActions';
import { useTheme } from '../context/ThemeContext';

const TodoDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const todoId = parseInt(id);
  const { darkMode } = useTheme();
  
  const { currentTodo, status, error } = useSelector(state => state.todos);
  const { fetchTodoById, toggleTodoCompletion, removeTodo } = useTodoActions();

  useEffect(() => {
    // Fetch the todo if it's not already loaded or is a different one
    if (!currentTodo || currentTodo.id !== todoId) {
      fetchTodoById(todoId);
    }
  }, [fetchTodoById, currentTodo, todoId]);

  const handleToggleComplete = () => {
    if (currentTodo) {
      toggleTodoCompletion(currentTodo);
    }
  };

  const handleDelete = () => {
    if (currentTodo) {
      removeTodo(currentTodo.id);
      navigate('/');
    }
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    color: darkMode ? '#e4e4e7' : '#333'
  };

  const cardStyle = {
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: darkMode ? '#333' : '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '20px'
  };

  const buttonStyle = {
    padding: '10px 16px',
    margin: '0 8px 0 0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: darkMode ? '#4b5563' : '#e5e7eb',
    color: darkMode ? '#fff' : '#333',
    transition: 'background-color 0.2s'
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: darkMode ? '#7f1d1d' : '#fee2e2',
    color: darkMode ? '#fecaca' : '#dc2626'
  };

  const statusBadgeStyle = {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    marginTop: '10px',
    backgroundColor: currentTodo?.completed 
      ? (darkMode ? '#065f46' : '#d1fae5') 
      : (darkMode ? '#78350f' : '#fef3c7'),
    color: currentTodo?.completed
      ? (darkMode ? '#a7f3d0' : '#047857')
      : (darkMode ? '#fcd34d' : '#92400e')
  };

  if (status === 'loading' && !currentTodo) {
    return (
      <div style={containerStyle}>
        <h1>Todo Details</h1>
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div style={containerStyle}>
        <h1>Todo Details</h1>
        <ErrorMessage 
          message={error || `Failed to load todo #${todoId}`} 
          onRetry={() => fetchTodoById(todoId)} 
        />
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={() => navigate('/')}
            style={buttonStyle}
          >
            Back to Todo List
          </button>
        </div>
      </div>
    );
  }

  if (!currentTodo) {
    return (
      <div style={containerStyle}>
        <h1>Todo Not Found</h1>
        <p>The todo item you're looking for doesn't exist.</p>
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={() => navigate('/')}
            style={buttonStyle}
          >
            Back to Todo List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1>Todo Details</h1>
      
      <div style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>{currentTodo.title}</h2>
        
        <div style={statusBadgeStyle}>
          {currentTodo.completed ? 'Completed' : 'Active'}
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <p><strong>Todo ID:</strong> {currentTodo.id}</p>
          <p><strong>User ID:</strong> {currentTodo.userId || 'Not assigned'}</p>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={handleToggleComplete}
            style={{
              ...buttonStyle,
              backgroundColor: currentTodo.completed 
                ? (darkMode ? '#4b5563' : '#e5e7eb') 
                : (darkMode ? '#065f46' : '#10b981'),
              color: currentTodo.completed 
                ? (darkMode ? '#fff' : '#333') 
                : '#fff'
            }}
          >
            {currentTodo.completed ? 'Mark as Active' : 'Mark as Completed'}
          </button>
          
          <button 
            onClick={handleDelete}
            style={deleteButtonStyle}
          >
            Delete
          </button>
          
          <button 
            onClick={() => navigate('/')}
            style={buttonStyle}
          >
            Back to Todo List
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoDetailsPage;