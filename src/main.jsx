import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/index.css';
// import App from './App.jsx'; // 기본
import App from './App2.jsx'; // Ant design 반영, 구글아이콘, 검색기능 구현

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
