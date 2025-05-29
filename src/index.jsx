/* @refresh reload */
import { render } from 'solid-js/web';
import App from './App.jsx';
import './index.css';

// Configuración inicial de la aplicación
const setupApp = () => {
  // Configurar título de la aplicación
  document.title = 'Centro Cultural Banreservas - Sistema de Gestión';
  
  // Configurar meta tags
  const setMetaTag = (name, content) => {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  setMetaTag('description', 'Sistema de gestión de eventos y visitantes del Centro Cultural Banreservas');
  setMetaTag('author', 'Centro Cultural Banreservas');
  setMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
  setMetaTag('theme-color', '#003366');
  
  // Configurar favicon si no existe
  if (!document.querySelector('link[rel="icon"]')) {
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/svg+xml';
    favicon.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23003366"/><text y="70" font-size="60" fill="white" text-anchor="middle" x="50" font-family="serif" font-weight="bold">CCB</text></svg>';
    document.head.appendChild(favicon);
  }

  // Configurar PWA si es necesario
  const addPWAMeta = () => {
    const appleTouchIcon = document.createElement('link');
    appleTouchIcon.rel = 'apple-touch-icon';
    appleTouchIcon.href = '/icon-192x192.png';
    document.head.appendChild(appleTouchIcon);

    const manifest = document.createElement('link');
    manifest.rel = 'manifest';
    manifest.href = '/manifest.json';
    document.head.appendChild(manifest);
  };

  // Solo en producción
  if (import.meta.env.PROD) {
    addPWAMeta();
  }

  // Manejar errores globales
  window.addEventListener('error', (event) => {
    console.error('Error global capturado:', event.error);
    
    // En producción, podrías enviar estos errores a un servicio de logging
    if (import.meta.env.PROD) {
      // sendErrorToLoggingService(event.error);
    }
  });

  // Manejar errores de promesas no capturadas
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Promesa rechazada no manejada:', event.reason);
    
    if (import.meta.env.PROD) {
      // sendErrorToLoggingService(event.reason);
    }
  });

  // Configurar Service Worker para PWA (en producción)
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registrado correctamente:', registration);
        })
        .catch((error) => {
          console.log('SW falló al registrarse:', error);
        });
    });
  }
};

// Configurar la aplicación
setupApp();

// Encontrar el elemento root
const root = document.getElementById('root');

if (!root) {
  throw new Error('No se encontró el elemento root en el DOM');
}

// Renderizar la aplicación
try {
  render(() => <App />, root);
  console.log('✅ Aplicación SGEV inicializada correctamente');
} catch (error) {
  console.error('❌ Error al inicializar la aplicación:', error);
  
  // Mostrar error de fallback
  root.innerHTML = `
    <div style="
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      flex-direction: column;
      text-align: center;
      padding: 2rem;
      background: linear-gradient(135deg, #003366, #0066cc);
      color: white;
      font-family: system-ui, sans-serif;
    ">
      <h1 style="font-size: 2rem; margin-bottom: 1rem; font-weight: 300;">
        ⚠️ Error de Inicialización
      </h1>
      <p style="font-size: 1.1rem; margin-bottom: 2rem; opacity: 0.9; max-width: 500px;">
        No se pudo cargar el Sistema de Gestión de Eventos y Visitantes.
        Por favor, recarga la página o contacta al administrador del sistema.
      </p>
      <button 
        onclick="window.location.reload()" 
        style="
          padding: 1rem 2rem;
          background: white;
          color: #003366;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        "
        onmouseover="this.style.transform='translateY(-2px)'"
        onmouseout="this.style.transform='translateY(0)'"
      >
        🔄 Recargar Página
      </button>
      <p style="
        margin-top: 2rem;
        font-size: 0.9rem;
        opacity: 0.7;
      ">
        Centro Cultural Banreservas • Sistema SGEV
      </p>
    </div>
  `;
}