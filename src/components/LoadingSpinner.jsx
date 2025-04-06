import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ size = 40, color = '#3498db' }) => {
  const spinnerRef = useRef(null);

  useEffect(() => {
    const spinner = spinnerRef.current;
    let rotation = 0;
    let animationFrameId;

    const animate = () => {
      rotation += 6;  // 6 degrees per frame for smoother animation
      if (spinner) {
        spinner.style.transform = `rotate(${rotation}deg)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
      <div
        ref={spinnerRef}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          border: `4px solid rgba(0, 0, 0, 0.1)`,
          borderTop: `4px solid ${color}`,
          boxSizing: 'border-box'
        }}
      />
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

export default LoadingSpinner;