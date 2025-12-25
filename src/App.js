import { useState } from 'react';
import './App.css';
import GroundTypeSelect from './components/grounditype';
import Calculations from './components/calculations';

import { useNavigate } from 'react-router-dom';
import InteractiveMap from './components/localisation-map';

function App() {
  const [factorForCalculations, setFactorForCalculations] = useState([]);
  const navigate = useNavigate(); 
  const [safeDistanceValue, setSafeDistanceValue] = useState(0);
  const [selectedGroundTypeName, setSelectedGroundTypeName] = useState('');
  const [currentMarker, setCurrentMarker] = useState(null);
  const [currentInputHeight, setCurrentInputHeight] = useState('');


  const saveCalculation = () => {
    if (!currentInputHeight || safeDistanceValue === 0) {
      alert('Proszę najpierw wykonać obliczenie');
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
    alert('Obliczenie zostało zapisane!');
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-title-section">
          <h1 className="justify-center">Kalkulator klinu odłamu</h1>
          <h2>Aplikacja dla operatorów maszyn budowlanych</h2>
        </div>
        <div className="user-button-section">
        <button className="history-button" onClick={() => navigate('/history-tab')}>Historia obliczeń</button>
        </div>
        <div>
          <button className="info-button" onClick={() => navigate('/info-tab')}>Klin odłamu - informacje podstawowe.</button>
          <button className="analitic-method-button" onClick={()=>{}}>Metoda analityczna liczenia klinu odłamu</button>
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
