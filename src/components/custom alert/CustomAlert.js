import { useState } from 'react';
import './custom-alert.css';

export default function CustomAlert({ title, message, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="custom-alert" onClick={handleClose}>
      <div className="custom-alert-content" onClick={(e) => e.stopPropagation()}>
        <h1 className="custom-alert-title">{title}</h1>
        <p className="custom-alert-message">{message}</p>
        <button className="custom-alert-button" onClick={handleClose}>
          Zamknij
        </button>
      </div>
    </div>
  );
}

