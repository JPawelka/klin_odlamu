import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import HistoryTab from './history-tab/history-tab';
import InfoTab from './info-tab/info-tab';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/history-tab" element={<HistoryTab />} />
        <Route path="/info-tab" element={<InfoTab />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

