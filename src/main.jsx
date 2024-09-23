import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js';  // <-- Import service worker

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Register the service worker to enable PWA functionality
serviceWorkerRegistration.register();  // <-- Register service worker here
