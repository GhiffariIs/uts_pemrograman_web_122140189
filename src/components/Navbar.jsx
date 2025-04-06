import { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ title }) => {
  const { darkMode, toggleTheme } = useTheme();
  const navRef = useRef(null);
  
  // Add shadow effect when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 0) {
          navRef.current.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        } else {
          navRef.current.style.boxShadow = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: darkMode ? '#292929' : '#ffffff',
    color: darkMode ? '#ffffff' : '#333333',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    transition: 'all 0.3s ease'
  };
  
  const linkStyle = {
    margin: '0 10px',
    textDecoration: 'none',
    color: darkMode ? '#aaaaaa' : '#666666',
    fontWeight: '500',
    transition: 'color 0.3s ease'
  };
  
  const activeLinkStyle = {
    color: darkMode ? '#ffffff' : '#333333',
    fontWeight: '700'
  };
  
  const buttonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.5rem',
    color: darkMode ? '#ffffff' : '#333333',
    transition: 'transform 0.3s ease'
  };

  return (
    <nav ref={navRef} style={navStyle}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        {title}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <NavLink 
            to="/" 
            style={({ isActive }) => isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle} 
            end
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/completed" 
            style={({ isActive }) => isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle}
          >
            Completed
          </NavLink>
        </div>
        
        <button 
          onClick={toggleTheme} 
          style={buttonStyle}
          aria-label="Toggle theme"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired
};

export default Navbar;