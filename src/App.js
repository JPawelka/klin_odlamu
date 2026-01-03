import { useState, useEffect, useRef } from 'react';
import './App.css';
import GroundTypeSelect from './components/grounditype';
import Calculations from './components/calculations';

import { useNavigate } from 'react-router-dom';
import InteractiveMap from './components/localisation-map';
import CustomAlert from './components/custom alert/CustomAlert';

function App() {
  const [factorForCalculations, setFactorForCalculations] = useState([]);
  const navigate = useNavigate(); 
  const [safeDistanceValue, setSafeDistanceValue] = useState(0);
  const [selectedGroundTypeName, setSelectedGroundTypeName] = useState('');
  const [currentMarker, setCurrentMarker] = useState(null);
  const [currentInputHeight, setCurrentInputHeight] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [showCalculationAlert, setShowCalculationAlert] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const saveCalculation = () => {
    if (!currentInputHeight || safeDistanceValue === 0) {
      setShowCalculationAlert(true);
      return;
    }

    const calculationData = {
      inputHeight: parseFloat(currentInputHeight) || 0,
      groundTypeName: selectedGroundTypeName || '',
      safeDistance: safeDistanceValue || 0,
      markerLat: currentMarker ? parseFloat(currentMarker.lat) : null,
      markerLng: currentMarker ? parseFloat(currentMarker.lng) : null,
      timestamp: new Date().toISOString()
    };

  
    const existingCalculations = JSON.parse(localStorage.getItem('calculations') || '[]');
    
    
    existingCalculations.push(calculationData);
    
    
    localStorage.setItem('calculations', JSON.stringify(existingCalculations));
    
    console.log('Calculation saved:', calculationData);
    setShowSaveAlert(true);
  };
  return (
    <div className="App">
      {showCalculationAlert && (
        <CustomAlert
          title="Błąd"
          message="Proszę najpierw wykonać obliczenie"
          onClose={() => setShowCalculationAlert(false)}
        />
      )}
      {showSaveAlert && (
        <CustomAlert
          title="Sukces"
          message="Obliczenie zostało zapisane!"
          onClose={() => setShowSaveAlert(false)}
        />
      )}
      <header className="App-header">
        <div className="header-title-section">
          <h1 className="justify-center">Kalkulator klinu odłamu</h1>
          <h2>Aplikacja dla operatorów maszyn budowlanych</h2>
        </div>
        <div className="hamburger-menu-container" ref={menuRef}>
          <button 
            className={`hamburger-button ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          {isMenuOpen && (
            <div className="hamburger-menu">
              <button 
                className="menu-item" 
                onClick={() => {
                  navigate('/history-tab');
                  setIsMenuOpen(false);
                }}
              >
                Historia obliczeń
              </button>
              <button 
                className="menu-item" 
                onClick={() => {
                  navigate('/info-tab');
                  setIsMenuOpen(false);
                }}
              >
                Klin odłamu - informacje podstawowe
              </button>
              <button 
                className="menu-item" 
                onClick={() => {
                  navigate('/analitics-method');
                  setIsMenuOpen(false);
                }}
              >
                Metoda analityczna liczenia klinu odłamu
              </button>
            </div>
          )}
        </div>
        <p className="ground-type-label">1. Kategoria  gruntu</p>
       <div className="ground-type-select-section bg-orange-500 rounded-b-2xl shadow-2xl p-6 md:p-8 align-column">
            <GroundTypeSelect 
              onFactorChange={setFactorForCalculations} 
              onGroundTypeNameChange={setSelectedGroundTypeName}
            />

       </div>
       <p className="ground-type-label">2. Wysokość wykopu</p>
       <div className="height-input-section">
       <input className="height-input" id="height-input"/>
       <button className="calculate-button" onClick={() => {
         const inputHeight = document.getElementById('height-input').value;
         setCurrentInputHeight(inputHeight);
         const calculatedSafeDistance = Calculations(inputHeight, factorForCalculations);
         setSafeDistanceValue(calculatedSafeDistance);
       }}>Oblicz</button>
       </div>
       <div>
        <p className="ground-type-label">3. Lokalizacja</p>
        <InteractiveMap onMarkerChange={setCurrentMarker} />
       </div>
       <div>
        <p className="ground-type-label">4. Wynik</p>
       </div>
       <div className="safe-distance-label">Bezpieczna odległość dla twojej maszyny: <span className="safe-distance-value">{safeDistanceValue} metrów</span>
       </div>
       <div className="save-button-section" style={{ marginTop: '20px', textAlign: 'center' }}>
         <button 
           className="save-button" 
           onClick={saveCalculation}
           style={{
             padding: '12px 24px',
             fontSize: '16px',
             backgroundColor: '#4CAF50',
             color: 'white',
             border: 'none',
             borderRadius: '8px',
             cursor: 'pointer',
             fontWeight: 'bold'
           }}
         >
           Zapisz obliczenie
         </button>
       </div>
      
     
      </header>
    </div>
  );
}

export default App;
