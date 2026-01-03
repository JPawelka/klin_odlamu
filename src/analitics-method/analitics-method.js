import './analitics-method.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AnaliticsCalculations from './analitics-calculations';

export default function AnaliticsMethod() {
    const navigate = useNavigate();
    const [isHeightUnknown, setIsHeightUnknown] = useState(false);
    const result = 12
    return (
        <div className="App-header">
            <div className="header-title-section">
                <h1 className="justify-center">Metoda analityczna liczenia klinu odłamu</h1>
            </div>
            <div className="back-button-section">
                <button className="back-button" onClick={() => navigate('/')}>Powrót do strony głównej</button>
            </div>

            <div className="analitics-method-container">
                <div className='analitics-method-content'>
                    <h1 className='data-input-title'>Dane wejściowe</h1>
                    <div className="d-we-know-height">
                        <p>Czy znana jest wysokość wykopu?</p>
                        <input 
                            type="radio" 
                            id="safe-distance-input-analitics" 
                            value="false" 
                            checked={!isHeightUnknown}
                            onClick={() => setIsHeightUnknown(!isHeightUnknown)}
                            onChange={() => {}}
                        />
                    </div>
                    <p>Wysokość wykopu</p>
                    <input 
                        className='data-input-field' 
                        id="height-input-analitics" 
                        disabled={isHeightUnknown}
                    />
                    <p>Gęstość objętościowa gruntu - ρ [kN/m³]</p>
                    <input className='data-input-field' id="density-input-analitics"/>
                    <p>Kąt tarcia wewnętrznego - φ</p>
                    <input className='data-input-field' id="phi-input-analitics"/>
                    <p>Kochezja gruntu - c</p>
                    <input className='data-input-field' id="c-input-analitics"/>
                    <button className='calculate-button-analitics' onClick={() => {
                        const height = document.getElementById('height-input-analitics').value;
                        const density = document.getElementById('density-input-analitics').value;
                        const phi = document.getElementById('phi-input-analitics').value;
                        const c = document.getElementById('c-input-analitics').value;
                      const result = AnaliticsCalculations(height, density, phi, c);
                      console.log(result);
                    }}>Oblicz</button>
                </div>
                <div className="analitics-method-image">
                    <p className='data-input-title'>Wyniki obliczeń</p>
                    <p className='result-text'>Bezpieczna odległość L: {result} metrów</p>
                    <img src="/assets/klin-odlamu.png" alt="Metoda analityczna liczenia klinu odłamu" />
                </div>
            </div>
            <button>asd</button>
        </div>
    );
}