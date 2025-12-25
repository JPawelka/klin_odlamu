import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import CustomAlert from './custom alert/CustomAlert';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  return null;
}

export default function InteractiveMap({ onMarkerChange }) {
  const [markers, setMarkers] = useState([]);
  const [center] = useState([52.2297, 21.0122]); // Warszawa jako domyślny środek
  const [showAlert, setShowAlert] = useState(false);

  const handleMapClick = (latlng) => {
    const newMarker = {
      id: Date.now(),
      position: [latlng.lat, latlng.lng],
      lat: latlng.lat.toFixed(6),
      lng: latlng.lng.toFixed(6),
    };
    const updatedMarkers = [...markers, newMarker];
    setMarkers(updatedMarkers);
    // Pass the latest marker to parent
    if (onMarkerChange) {
      onMarkerChange(newMarker);
    }
  };

  const removeMarker = (id) => {
    const updatedMarkers = markers.filter(marker => marker.id !== id);
    setMarkers(updatedMarkers);
    // Update parent - set to null if no markers, otherwise set to the latest
    if (onMarkerChange) {
      if (updatedMarkers.length === 0) {
        onMarkerChange(null);
      } else {
        onMarkerChange(updatedMarkers[updatedMarkers.length - 1]);
      }
    }
  };



  useEffect(() => {
    if (markers.length > 1) {
      setShowAlert(true);
      const latestMarker = markers[markers.length - 1];
      setMarkers([latestMarker]);
      // Update parent with the latest marker
      if (onMarkerChange) {
        onMarkerChange(latestMarker);
      }
    }
  }, [markers, onMarkerChange]);


  return (
    <div className="p-4">
      {showAlert && (
        <CustomAlert
          title="Za dużo pinezek"
          message="Pozostawiamy tylko najnowszą pinezkę"
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">Interaktywna Mapa</h1>
        <p className="text-gray-600 mb-3">
          Kliknij na mapę, aby postawić pinezkę i zobaczyć współrzędne
        </p>
        
      </div>

      <div className="border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg mb-4">
        <MapContainer
          center={center}
          zoom={6}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler onMapClick={handleMapClick} />
          
          {markers.map((marker) => (
            <Marker key={marker.id} position={marker.position}>
              <Popup>
                <div className="text-center">
                  <p className="font-semibold mb-1">Współrzędne:</p>
                  <p className="text-sm">Lat: {marker.lat}</p>
                  <p className="text-sm mb-2">Lng: {marker.lng}</p>
                  <button
                    onClick={() => removeMarker(marker.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                  >
                    Usuń
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {markers.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Lista współrzędnych:</h2>
          <div className="space-y-2">
            {markers.map((marker, index) => (
              <div key={marker.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
                <div>
                  <span className="font-medium">Pinezka {index + 1}:</span>
                  <span className="ml-2 text-sm">
                    {marker.lat}, {marker.lng}
                  </span>
                </div>
                <button
                  onClick={() => removeMarker(marker.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  ✕
                </button>
                <button onClick={() =>console.log(`${marker.lat}, ${marker.lng}`)} className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600">
                  Zapisz
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}