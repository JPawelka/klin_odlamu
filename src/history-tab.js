import HistoryTabElem from './components/history-tab-elem';
import './history-tab.css';
import { useNavigate } from 'react-router-dom';

export default function HistoryTab() {
    const navigate = useNavigate();
  return (
    <header className="App-header">
    <div className="header-title-section">
      <h1 className="justify-center">Historia twoich obliczeń</h1>
    </div>
    <div className="back-button-section">
      <button className="back-button" onClick={() => navigate('/')}>Powrót do strony głównej</button>
    </div>
    <div className="history-table-section">
        <HistoryTabElem date="2025-01-01" height={10} factor={1.5} safeDistance={10} location={`51°04'04.0"N 17°00'30.6"E`} />
        <HistoryTabElem date="2025-01-01" height={10} factor={1.5} safeDistance={10} />
        <HistoryTabElem date="2025-01-01" height={10} factor={1.5} safeDistance={10} />
    </div>

    </header>
  );
}