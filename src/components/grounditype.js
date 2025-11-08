import { useState, useEffect } from 'react';
import './grounditype.css';



export default function GroundTypeSelect({ onFactorChange }) {
  const [selectedGroundType, setSelectedGroundType] = useState('');

  const groundTypes = [
    { id: '1', name: 'Pasek suchy', value: 'piasek' , description: ' Luźny, sypki materiał. Ziarna widoczne gołym okiem (0,05-2 mm). Przesypuje się między palcami, nie da się uformować kulki. Brak wilgoci. Wykop trzyma się pionowo tylko na niewielką głębokość.', factor:'1.5'},
    { id: '2', name: 'Grunty malospoiste', value: 'malospoiste', description:'Piaski wilgotne, piaski gliniaste, pyły. Ziarna słabo widoczne. Dają się uformować w kulkę, ale łatwo się rozpada. Niewielka przyczepność między ziarnami. Wykop wymaga lekkich podpór od ~1,5m głębokości.', factor:'1.25'},
    { id: '3', name: 'Spękane skały', value: 'spękane skały', description:'Twarda skała z wyraźnymi szczelinami, pęknięciami lub warstwowaniem. Można odłamać kawałki dłutem lub łomem. Widoczne płaszczyzny podziału. Wykop stabilny, ale możliwe lokalne osunięcia wzdłuż szczelin.', factor:'1.0'},
    { id: '4', name: 'Grunty spoiste, Gliny', value: 'spoiste gliny' , description:'Lepki, plastyczny materiał. Przywiera do narzędzi. Daje się uformować w walec. Wilgotny jest błyszczący, suchy twardy. Wykop dobrze trzyma ściany pionowe, nie wymaga podpór do znacznych głębokości.', factor:'0.5'},
    { id: '5', name: 'Skały lite', value: 'lite skały', description:'Jednolita, zwarta skała bez wyraźnych pęknięć. Trudna do rozbicia nawet młotem pneumatycznym. Wymaga użycia materiałów wybuchowych lub ciężkiego sprzętu. Wykop całkowicie stabilny bez podpór.', factor:'0'},
  ];

  useEffect(() => {
    if (selectedGroundType) {
      const selectedType = groundTypes.find(type => type.value === selectedGroundType);
      if (selectedType && onFactorChange) {
        if(selectedType.factor) {
          console.log(`${selectedType.factor} to jest wspólczynnik do obliczenia wysokości klinu`);
          onFactorChange([selectedType.factor]);
        } else {
          console.log('Ściany pionowe');
          onFactorChange(['0']);
        }
      }
    }
  }, [selectedGroundType, onFactorChange]);

  return (

    <div className="ground-type-cards-container">
      {groundTypes.map((type) => (
        <label
          key={type.id}
          className={`ground-type-card ${selectedGroundType === type.value ? 'selected' : ''}`}
        >
          <input
            type="radio"
            name="groundType"
            value={type.value}
            checked={selectedGroundType === type.value}
            onChange={(e) => setSelectedGroundType(e.target.value)}
          />
          <div className="ground-type-content">
            <span className="ground-type-name">{type.name}</span>
            <span className="ground-type-description">{type.description}</span>
          </div>
        </label>
      ))}
    </div>
  );
}