import PropTypes from 'prop-types';
import { useTheme } from '../context/ThemeContext';

const ErrorMessage = ({ message, onRetry }) => {
  const { darkMode } = useTheme();
  
  return (
    <div 
      style={{
        padding: '15px 20px',
        margin: '20px 0',
        backgroundColor: darkMode ? '#422' : '#ffeeee',
        color: darkMode ? '#ff8888' : '#d32f2f',
        borderRadius: '4px',
        borderLeft: '5px solid #d32f2f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div style={{ marginBottom: '10px' }}>
        <span role="img" aria-label="Error" style={{ marginRight: '10px', fontSize: '20px' }}>
          ⚠️
        </span>
        {message || 'An error occurred'}
      </div>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          style={{
            padding: '6px 12px',
            backgroundColor: darkMode ? '#c62828' : '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func
};

export default ErrorMessage;