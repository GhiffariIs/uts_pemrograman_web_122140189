import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    textAlign: 'center',
    padding: '20px',
    color: darkMode ? '#e4e4e7' : '#333'
  };

  const headingStyle = {
    fontSize: '6rem',
    marginBottom: '0',
    color: darkMode ? '#4b5563' : '#d1d5db'
  };

  const buttonStyle = {
    padding: '10px 16px',
    margin: '20px 0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: darkMode ? '#3b82f6' : '#2563eb',
    color: '#fff',
    fontWeight: 'bold',
    transition: 'background-color 0.2s'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <button onClick={() => navigate('/')} style={buttonStyle}>
        Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;