import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);
  const inputRef = useRef(null);
  const { darkMode } = useTheme();

  // Auto-focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim() !== '') {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.title);
      setIsEditing(false);
    }
  };

  const todoItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 15px',
    borderRadius: '8px',
    marginBottom: '8px',
    transition: 'all 0.3s ease',
    backgroundColor: darkMode ? '#333' : '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  };

  const checkboxStyle = {
    marginRight: '12px',
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  };

  const textStyle = {
    flex: 1,
    textDecoration: todo.completed ? 'line-through' : 'none',
    color: todo.completed ? (darkMode ? '#888' : '#888') : (darkMode ? '#fff' : '#333'),
    wordBreak: 'break-word'
  };

  const buttonStyle = {
    padding: '5px 10px',
    margin: '0 4px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: darkMode ? '#444' : '#f0f0f0',
    color: darkMode ? '#ccc' : '#333',
    transition: 'background-color 0.2s'
  };

  const editInputStyle = {
    flex: 1,
    padding: '5px 8px',
    border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
    borderRadius: '4px',
    backgroundColor: darkMode ? '#444' : '#fff',
    color: darkMode ? '#fff' : '#333',
  };

  const linkStyle = {
    marginLeft: '8px',
    color: darkMode ? '#4299e1' : '#3182ce',
    textDecoration: 'none',
    fontSize: '14px'
  };

  return (
    <div style={todoItemStyle}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
        style={checkboxStyle}
      />
      
      {isEditing ? (
        <>
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            style={editInputStyle}
          />
          <button onClick={handleSave} style={buttonStyle}>Save</button>
          <button onClick={() => {
            setIsEditing(false);
            setEditText(todo.title);
          }} style={buttonStyle}>Cancel</button>
        </>
      ) : (
        <>
          <div style={textStyle}>{todo.title}</div>
          <Link to={`/todo/${todo.id}`} style={linkStyle}>Details</Link>
          <button onClick={handleEdit} style={buttonStyle}>Edit</button>
          <button 
            onClick={() => onDelete(todo.id)}
            style={{
              ...buttonStyle,
              backgroundColor: darkMode ? '#553333' : '#fee2e2',
              color: darkMode ? '#ff8888' : '#dc2626',
            }}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default TodoItem;