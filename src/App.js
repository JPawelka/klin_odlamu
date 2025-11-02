import './App.css';
import GroundTypeSelect from './components/grounditype';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-title-section">
          <h1 className="justify-center">Kalkulator klinu odłamu</h1>
          <h2>Aplikacja dla operatorów maszyn budowlanych</h2>
        </div>
        <p className="ground-type-label">1. Rodzaj gruntu</p>
       <div className="ground-type-select-section bg-orange-500 rounded-b-2xl shadow-2xl p-6 md:p-8 align-column">
            <GroundTypeSelect />

       </div>
       <p className="ground-type-label">2. Wysokość klinu</p>
        
        
     
      </header>
    </div>
  );
}

export default App;
