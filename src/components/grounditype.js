import { useState, useEffect } from 'react';
import './grounditype.css';
import { groundTypes as groundTypesData } from '../utils/groundTypes';

export default function GroundTypeSelect({ onFactorChange, onGroundTypeNameChange }) {
  const [selectedGroundType, setSelectedGroundType] = useState('');

  const groundTypes = [
    { ...groundTypesData[0], factor: '1.5' },
    { ...groundTypesData[1], factor: '1.25' },
    { ...groundTypesData[2], factor: '1.0' },
    { ...groundTypesData[3], factor: '0.5' },
    { ...groundTypesData[4], factor: '0' },
  ];

  useEffect(() => {
    if (selectedGroundType) {
      const selectedType = groundTypes.find(type => type.value === selectedGroundType);
      if (selectedType && onFactorChange) {
        if(selectedType.factor) {
          console.log(`${selectedType.factor} to jest wspólczynnik do obliczenia wysokości klinu`);
          onFactorChange([selectedType.factor]);
        } 
    
        if (onGroundTypeNameChange) {
          onGroundTypeNameChange(selectedType.name);
        }
      }
    }
  }, [selectedGroundType, onFactorChange, onGroundTypeNameChange]);

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