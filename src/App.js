import { useState, useEffect, useRef } from 'react';
import './App.css';
import GroundTypeSelect from './components/grounditype';
import Calculations from './components/calculations';
import AnaliticsCalculations from './analitics-method/analitics-calculations';
import CriticalHeightCalculations from './critical-height/critical-height-calculations';
import './analitics-method/analitics-method.css';

import { useNavigate } from 'react-router-dom';
import InteractiveMap from './components/localisation-map';
import CustomAlert from './components/custom alert/CustomAlert';

function App() {
  const [factorForCalculations, setFactorForCalculations] = useState([]);
  const navigate = useNavigate(); 
  const [safeDistanceValue, setSafeDistanceValue] = useState(0);
  const [criticalHeightValue, setCriticalHeightValue] = useState(0);
  const [selectedGroundTypeName, setSelectedGroundTypeName] = useState('');
  const [currentMarker, setCurrentMarker] = useState(null);
  const [currentInputHeight, setCurrentInputHeight] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [showCalculationAlert, setShowCalculationAlert] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showLocationAlert, setShowLocationAlert] = useState(false);
  const [showCZeroAlert, setShowCZeroAlert] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('współczynnikowo');
  const isHeightUnknown = false;
  const [calculationMode, setCalculationMode] = useState('normal');

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
    const heightRequired = selectedMethod === 'współczynnikowo' || !isHeightUnknown;
    
    if (heightRequired && !currentInputHeight) {
      setShowCalculationAlert(true);
      return;
    }

    if (safeDistanceValue === 0) {
      setShowCalculationAlert(true);
      return;
    }

    if (!currentMarker) {
      setShowLocationAlert(true);
      return;
    }

    const calculationData = {
      inputHeight: parseFloat(currentInputHeight) || 0,
      groundTypeName: selectedGroundTypeName || '',
      safeDistance: safeDistanceValue || 0,
      markerLat: currentMarker ? parseFloat(currentMarker.lat) : null,
      markerLng: currentMarker ? parseFloat(currentMarker.lng) : null,
      method: selectedMethod,
      isHeightUnknown: selectedMethod === 'analiticznie' ? isHeightUnknown : false,
      calculationMode: selectedMethod === 'analiticznie' ? calculationMode : null,
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
      {showLocationAlert && (
        <CustomAlert
          title="Błąd"
          message="Proszę wybrać lokalizację na mapie przed zapisaniem obliczenia"
          onClose={() => setShowLocationAlert(false)}
        />
      )}
      {showCZeroAlert && (
        <CustomAlert
          title="Błąd"
          message="Kohazja gruntu (c) nie może być równa 0 dla obliczenia wysokości krytycznej"
          onClose={() => setShowCZeroAlert(false)}
        />
      )}
      <header className="App-header">
        <div className="header-title-section">
          <h1 className="justify-center">Kalkulator poziomego zasięgu klinu odłamu</h1>
          <h2>Aplikacja dla operatorów maszyn budowlanych, autor: Juliusz Pawelka</h2>
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
            </div>
          )}
        </div>
        <p>Metoda:</p>
        <button 
          className='easier-way-button' 
          onClick={() => setSelectedMethod('współczynnikowo')}
        >
          Metoda współczynnikowa - współczynniki
        </button>
        <button 
          className='harder-way-button' 
          onClick={() => {
            setSelectedMethod('analiticznie');
            if (calculationMode === 'normal') {
              setCalculationMode('analytics');
            }
          }}
        >
          Metody analityczne
        </button>
        
        {selectedMethod === 'współczynnikowo' ? (
          <>
            <p className="ground-type-label">1. Kategoria  gruntu</p>
            <div className="ground-type-select-section bg-orange-500 rounded-b-2xl shadow-2xl p-6 md:p-8 align-column">
              <GroundTypeSelect 
                onFactorChange={setFactorForCalculations} 
                onGroundTypeNameChange={setSelectedGroundTypeName}
              />
            </div>
            <p className="ground-type-label">2. Wysokość wykopu</p>
            <div className="height-input-section">
              <div className="height-input-wrapper">
                <p className="height-input-label">H = </p>
                <input className="height-input" id="height-input"/>
                <button className="calculate-button" onClick={() => {
                  const inputHeight = document.getElementById('height-input').value;
                  setCurrentInputHeight(inputHeight);
                  const calculatedSafeDistance = Calculations(inputHeight, factorForCalculations);
                  setSafeDistanceValue(calculatedSafeDistance);
                  setCriticalHeightValue(0);
                }}>Oblicz</button>
              </div>
              <img src="/assets/koparka-obraz.png" alt="Klin odłamu" className="klin-odlamu-image" />
            </div>
          </>
        ) : (
          <>
            <div className="analitics-method-wrapper">
              <div className="analitics-method-content">
                <h1 className='data-input-title'>Dane wejściowe</h1>
                <div className="d-we-know-height">
                  <input 
                    type="radio" 
                    id="critical-height-radio" 
                    name="calculation-mode"
                    value="critical-height" 
                    checked={calculationMode === 'critical-height'}
                    onChange={() => setCalculationMode('critical-height')}
                  />
                  <label htmlFor="critical-height-radio">Oblicz wysokość krytyczną</label>
                </div>
                <div className="d-we-know-height">
                  <input 
                    type="radio" 
                    id="analytics-radio" 
                    name="calculation-mode"
                    value="analytics" 
                    checked={calculationMode === 'analytics'}
                    onChange={() => setCalculationMode('analytics')}
                  />
                  <label htmlFor="analytics-radio">Obliczenia analityczne</label>
                </div>
                {calculationMode === 'critical-height' && (
                  <div className="critical-height-banner">
                    Wysokosc krytyczna obliczana jedynie dla gruntów spoistych
                    <br /> ! C ≠ 0 !
                  </div>
                )}
                <p>Wysokość wykopu - H [m]</p>
                <input 
                  className='data-input-field' 
                  id="height-input-analitics" 
                  disabled={calculationMode === 'critical-height'}
                />
                <p>Cieżar objętościowy gruntu - γ [kN/m³]</p>
                <input 
                  className='data-input-field' 
                  id="density-input-analitics"
                  disabled={calculationMode === 'analytics'}
                />
                <p>Kąt tarcia wewnętrznego - φ [°]</p>
                <input className='data-input-field' id="phi-input-analitics"/>
                <p>Kochezja gruntu - c [kN/m²]</p>
                <input 
                  className='data-input-field' 
                  id="c-input-analitics"
                  disabled={calculationMode === 'analytics'}
                />
                <button className='calculate-button-analitics' onClick={() => {
                  if (calculationMode === 'critical-height') {
                    const density = parseFloat(document.getElementById('density-input-analitics').value);
                    const phi = parseFloat(document.getElementById('phi-input-analitics').value);
                    const c = parseFloat(document.getElementById('c-input-analitics').value);
                    
                    if (!c || c === 0) {
                      setShowCZeroAlert(true);
                      return;
                    }
                    
                    const result = CriticalHeightCalculations(density, phi, c);
                    setSafeDistanceValue(result.l);
                    setCriticalHeightValue(result.hkr);
                    setCurrentInputHeight(result.hkr || '');
                    console.log('Critical height (Hkr):', result.hkr, 'Safe distance (L):', result.l);
                  } else {
                    const height = parseFloat(document.getElementById('height-input-analitics').value);
                    const phi = parseFloat(document.getElementById('phi-input-analitics').value);
                    
                    if (!height || !phi) {
                      setShowCalculationAlert(true);
                      return;
                    }
                    
                    const result = AnaliticsCalculations(height, phi);
                    setSafeDistanceValue(result);
                    setCriticalHeightValue(0);
                    setCurrentInputHeight(height.toString() || '');
                    console.log('Analytics result:', result);
                  }
                }}>Oblicz</button>
              </div>
              <img src="/assets/koparka-obraz.png" alt="Klin odłamu" className="klin-odlamu-image-analitics" />
            </div>
          </>
        )}
       <div>
        <p className="ground-type-label">3. Lokalizacja</p>
        <InteractiveMap onMarkerChange={setCurrentMarker} />
       </div>
       <div>
        <p className="ground-type-label">4. Wynik</p>
       </div>
       {calculationMode === 'critical-height' ? (
         <>
           <div className="safe-distance-label">Wysokość krytyczna (Hkr): <span className="safe-distance-value">{criticalHeightValue} metrów</span></div>
           <div className="safe-distance-label">Bezpieczna odległość (L): <span className="safe-distance-value">{safeDistanceValue} metrów</span></div>
         </>
       ) : (
         <div className="safe-distance-label">Bezpieczna odległość dla twojej maszyny od krawędzi wykopu: <span className="safe-distance-value">{safeDistanceValue} metrów</span></div>
       )}
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
