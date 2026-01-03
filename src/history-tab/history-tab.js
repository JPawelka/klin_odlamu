import { useState, useEffect } from 'react';
import HistoryTabElem from './history-tab-elem.js';
import './history-tab.css';
import { useNavigate } from 'react-router-dom';

export default function HistoryTab() {
    const navigate = useNavigate();
    const [calculations, setCalculations] = useState([]);

    const loadCalculations = () => {
      // Load calculations from localStorage
      const savedCalculations = JSON.parse(localStorage.getItem('calculations') || '[]');
      // Sort by timestamp, newest first
      const sortedCalculations = savedCalculations.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      setCalculations(sortedCalculations);
    };

    useEffect(() => {
      loadCalculations();
    }, []);

    const handleDelete = (timestamp) => {
      const savedCalculations = JSON.parse(localStorage.getItem('calculations') || '[]');
      
      const updatedCalculations = savedCalculations.filter(calc => calc.timestamp !== timestamp);
      
      
      localStorage.setItem('calculations', JSON.stringify(updatedCalculations));
      
      
      loadCalculations();
    };

  return (
    <header className="App-header">
    <div className="header-title-section">
      <h1 className="justify-center">Historia twoich obliczeń</h1>
    </div>
    <div className="back-button-section">
      <button className="back-button" onClick={() => navigate('/')}>Powrót do strony głównej</button>
    </div>
    <div className="history-table-section">
        {calculations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <p>Brak zapisanych obliczeń</p>
          </div>
        ) : (
          calculations.map((calc) => (
            <HistoryTabElem 
              key={calc.timestamp}
              date={calc.timestamp}
              timestamp={calc.timestamp}
              height={calc.inputHeight}
              groundTypeName={calc.groundTypeName}
              safeDistance={calc.safeDistance}
              markerLat={calc.markerLat}
              markerLng={calc.markerLng}
              method={calc.method}
              isHeightUnknown={calc.isHeightUnknown}
              onDelete={handleDelete}
            />
          ))
        )}
    </div>

    </header>
  );
}