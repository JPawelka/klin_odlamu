import { useNavigate } from 'react-router-dom';
import './info-tab.css';

export default function InfoTab() {
  const navigate = useNavigate();
  
  return (
    <div className="App-header">
    <div className="header-title-section">
      <h1 className="justify-center">Klin odłamu - informacje podstawowe.</h1>
    </div>
    <div className="back-button-section">
      <button className="back-button" onClick={() => navigate('/')}>Powrót do strony głównej</button>
    </div>
    <div className="info-content">
      <p>Klin odłamu gruntu to fragment skarpy, który może się osunąć z powodu własnego ciężaru lub działania siły zewnętrznej. Niezbędnym do obliczenia zagadnieniem jest Kąt stoku naturalnego [α]. Jest to kąt do którego grunt dąży samoistnie po osunięciu klinu oraz maksymalny kąt utrzymania się klinu w położeniu równowagi.</p>
      <p>W budownictwie rozróżniamy 16 rodzajów gruntu, natomiast prace osprzętem możemy wykonywać jedynie w pierwszych 4 kategoriach.</p>
      <video
        autoPlay
        loop
        muted
        playsInline
        controls
        className="info-video"
      >
        <source src="/assets/α.mp4" type="video/mp4" />
      </video>
    </div>
    </div>
  );
}