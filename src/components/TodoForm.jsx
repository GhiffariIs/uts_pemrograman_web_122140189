import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../context/ThemeContext';

const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const { darkMode } = useTheme();

  // Focus the input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate input
    if (title.trim() === '') {
      setError('Task cannot be empty');
      return;
    }
    
    // Clear any previous errors
    setError('');
    
    // Call the parent handler
    onAddTodo({ title });
    
    // Reset the form
    setTitle('');
    
    // Focus the input again for easy addition of multiple todos
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const formStyle = {
    marginBottom: '20px'
  };

  const inputContainerStyle = {
    display: 'flex'
  };

  const inputStyle = {
    flex: 1,
    padding: '10px 12px',
    fontSize: '16px',
    border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
    borderRadius: '4px 0 0 4px',
    backgroundColor: darkMode ? '#333' : '#fff',
    color: darkMode ? '#fff' : '#333',
  };

  const buttonStyle = {
    padding: '10px 16px',
    fontSize: '16px',
    backgroundColor: darkMode ? '#2563eb' : '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  const errorStyle = {
    color: '#dc2626',
    fontSize: '14px',
    marginTop: '5px'
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={inputContainerStyle}>
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Add</button>
      </div>
      {error && <div style={errorStyle}>{error}</div>}
    </form>
  );
};

TodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired
};

export default TodoForm;