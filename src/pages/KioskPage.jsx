import { onMount } from 'solid-js';
import KioskLayout from '../layouts/KioskLayout.jsx';
import KioskHome from '../components/kiosk/KioskHome.jsx';

const KioskPage = () => {
  onMount(() => {
    // Configuración específica para modo kiosco
    document.title = 'CCB - Kiosco de Visitantes';
    
    // Deshabilitar menú contextual
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    
    // Deshabilitar selección de texto
    document.addEventListener('selectstart', (e) => e.preventDefault());
    
    // Deshabilitar zoom con teclado
    document.addEventListener('keydown', (e) => {
      // Deshabilitar F11, Ctrl+Plus, Ctrl+Minus, etc.
      if (e.key === 'F11' || 
          (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0'))) {
        e.preventDefault();
      }
    });

    // Configurar viewport para dispositivos táctiles
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      );
    }

    // Ocultar cursor después de inactividad (opcional)
    let cursorTimer;
    const hideCursor = () => {
      document.body.style.cursor = 'none';
    };
    
    const showCursor = () => {
      document.body.style.cursor = 'default';
      clearTimeout(cursorTimer);
      cursorTimer = setTimeout(hideCursor, 5000); // 5 segundos
    };

    document.addEventListener('mousemove', showCursor);
    document.addEventListener('touchstart', showCursor);
    
    // Inicializar
    showCursor();

    // Cleanup al desmontar
    return () => {
      clearTimeout(cursorTimer);
      document.body.style.cursor = 'default';
    };
  });

  return (
    <KioskLayout>
      <KioskHome />
    </KioskLayout>
  );
};

export default KioskPage;