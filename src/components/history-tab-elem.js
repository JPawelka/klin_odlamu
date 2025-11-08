export default function HistoryTabElem({ date, height, safeDistance, location}) {
  return (
    <div className="history-table-element">
        <div className="history-table-element-header">Raport obliczeniowy</div>
      <div className="history-table-element-date">Data wykonania obliczenia: {date}</div>
      <div className="history-table-element-height">Wysokość klinu: {height} metrów</div>
      <div className="history-table-element-safeDistance">Bezpieczna odległość: {safeDistance} metrów</div>
      <div className="history-table-element-location">Lokalizacja: {location}</div>
    </div>
  );
}