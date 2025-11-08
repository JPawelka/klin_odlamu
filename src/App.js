import { useState } from 'react';
import './App.css';
import GroundTypeSelect from './components/grounditype';
import Calculations from './components/calculations';

import { useNavigate } from 'react-router-dom';
import InteractiveMap from './components/localisation-map';

function App() {
  const [factorForCalculations, setFactorForCalculations] = useState([]);
  const navigate = useNavigate(); 
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-title-section">
          <h1 className="justify-center">Kalkulator klinu odłamu</h1>
          <h2>Aplikacja dla operatorów maszyn budowlanych</h2>
        </div>
        <div className="user-button-section">
        <button className="history-button" onClick={() => navigate('/history-tab')}>Historia obliczeń</button>
        <button className="user-button">Potrzebna pomoc?</button>
        </div>
        <p className="ground-type-label">1. Rodzaj gruntu</p>
       <div className="ground-type-select-section bg-orange-500 rounded-b-2xl shadow-2xl p-6 md:p-8 align-column">
            <GroundTypeSelect onFactorChange={setFactorForCalculations} />

       </div>
       <p className="ground-type-label">2. Wysokość klinu</p>
       <div className="height-input-section">
       <input className="height-input" id="height-input"/>
       <button className="calculate-button" onClick={() => Calculations(document.getElementById('height-input').value, factorForCalculations)
       }>Oblicz</button>
       </div>
       <div>
        <p className="ground-type-label">3. Lokalizacja</p>
        <InteractiveMap />
       </div>
       <div>
        <p className="ground-type-label">4. Wynik</p>
       </div>
       <div className="safe-distance-label">Bezpieczna odległość dla twojej maszyny: <span className="safe-distance-value">10 metrów</span>
       </div>
      
     
      </header>
    </div>
  );
}

export default App;
