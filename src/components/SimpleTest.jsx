// Componente de prueba simple
import { createSignal } from 'solid-js';

const SimpleTest = () => {
  const [message] = createSignal('¡Hola Centro Cultural Banreservas!');

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #003366, #0066cc)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: '2rem',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div>
        <h1 style={{ marginBottom: '1rem' }}>{message()}</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
          Sistema de Gestión de Eventos y Visitantes
        </p>
        <div style={{
          marginTop: '2rem',
          padding: '1rem 2rem',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)'
        }}>
          ✅ SolidJS funcionando correctamente
        </div>
      </div>
    </div>
  );
};

export default SimpleTest;