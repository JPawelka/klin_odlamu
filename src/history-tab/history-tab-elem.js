import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export default function HistoryTabElem({ date, height, groundTypeName, safeDistance, markerLat, markerLng, onDelete, timestamp, method, isHeightUnknown, calculationMode}) {
  // Format location from lat/lng
  const formatLocation = (lat, lng) => {
    if (!lat || !lng) return 'Brak lokalizacji';
    
    // Convert to degrees, minutes, seconds format
    const formatCoordinate = (coord, isLat) => {
      const abs = Math.abs(coord);
      const degrees = Math.floor(abs);
      const minutes = Math.floor((abs - degrees) * 60);
      const seconds = ((abs - degrees) * 60 - minutes) * 60;
      const direction = isLat ? (coord >= 0 ? 'N' : 'S') : (coord >= 0 ? 'E' : 'W');
      return `${degrees}°${minutes}'${seconds.toFixed(1)}"${direction}`;
    };
    
    return `${formatCoordinate(parseFloat(lat), true)} ${formatCoordinate(parseFloat(lng), false)}`;
  };

  // Format date from ISO string
  const formatDate = (isoString) => {
    if (!isoString) return 'Brak daty';
    const date = new Date(isoString);
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = () => {
    if (window.confirm('Czy na pewno chcesz usunąć to obliczenie?')) {
      onDelete(timestamp);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const hasLocation = markerLat && markerLng;
  const mapCenter = hasLocation ? [parseFloat(markerLat), parseFloat(markerLng)] : [52.2297, 21.0122];

  const isAnalyticalMethod = method === 'analiticznie';
  const isCriticalHeightMethod = method === 'analiticznie' && calculationMode === 'critical-height';
  const shouldShowHeight = !isHeightUnknown;

  return (
    <div className="history-table-element">
        <div className="history-table-element-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span>Raport obliczeniowy</span>
              {isCriticalHeightMethod && (
                <span className="history-table-element-method-critical">
                  Metoda: Wysokość krytyczna
                </span>
              )}
              {isAnalyticalMethod && !isCriticalHeightMethod && (
                <span className="history-table-element-method">
                  Metoda: Analityczna
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={handlePrint}
                style={{
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#1976D2'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#2196F3'}
              >
                Drukuj
              </button>
              <button 
                onClick={handleDelete}
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#d32f2f'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'}
              >
                Usuń
              </button>
            </div>
          </div>
        </div>
      <div className="history-table-element-date">Data wykonania obliczenia: {formatDate(date)}</div>
      {shouldShowHeight && (
        <div className="history-table-element-height">Wysokość wykopu: {height} metrów</div>
      )}
      {!isAnalyticalMethod && (
        <div className="history-table-element-groundType">Rodzaj gruntu: {groundTypeName || 'Nie wybrano'}</div>
      )}
      <div className="history-table-element-safeDistance">Bezpieczna odległość: {safeDistance} metrów</div>
      <div className="history-table-element-location">Lokalizacja: {formatLocation(markerLat, markerLng)}</div>
      {hasLocation && (
        <div style={{ marginTop: '12px', marginBottom: '8px' }}>
          <div style={{ 
            height: '200px', 
            width: '100%', 
            borderRadius: '8px', 
            overflow: 'hidden',
            border: '2px solid #ddd',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={mapCenter} />
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
}