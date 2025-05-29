// App.jsx - Versión con diseño profesional y logo CCB
import { createSignal, onMount } from 'solid-js';

function App() {
  const [selectedCard, setSelectedCard] = createSignal(null);

  onMount(() => {
    // Reset completo del documento
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  });

  const handleCardClick = (cardType) => {
    setSelectedCard(cardType);
    setTimeout(() => {
      console.log(`Navegando a: ${cardType}`);
      setSelectedCard(null);
    }, 300);
  };

  // Las tres tarjetas principales
  const kioskCards = [
    {
      id: 'events',
      title: 'Ver Eventos',
      description: 'Explore nuestros eventos actuales y próximos',
      icon: '🎭'
    },
    {
      id: 'register',  
      title: 'Registrarse',
      description: 'Regístrese para un evento específico',
      icon: '📝'
    },
    {
      id: 'checkin',
      title: 'Check-in', 
      description: 'Confirme su asistencia a un evento',
      icon: '✅'
    }
  ];

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #003366 0%, #0066cc 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0',
      padding: '20px',
      boxSizing: 'border-box',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      position: 'relative'
    }}>
      {/* Caja blanca profesional - CON ESQUINAS REDONDEADAS PERFECTAS */}
      <div 
        className="kiosk-container"
        style={{
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: '60px', // Radio extremo para diagnóstico - debe ser MUY visible
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)', // Sombra suave para separar del fondo
          padding: '3rem 2rem',
          maxWidth: '888px',
          width: '80%',
          textAlign: 'center',
          backdropFilter: 'blur(10px)', // DEVUELTO - no era el culpable
          border: '1px solid rgba(255, 255, 255, 0.3)',
          position: 'relative',
          margin: '0 auto',
          transform: 'translateX(0)',
          WebkitBorderRadius: '60px', // Para compatibilidad con Safari
          MozBorderRadius: '60px', // Para compatibilidad con Firefox
          overflow: 'hidden', // Asegura que el contenido no se salga de las esquinas redondeadas
          boxSizing: 'border-box'
      }}>
        {/* Logo CCB real - PERFECTAMENTE CENTRADO SIN FONDO */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '2.5rem',
          textAlign: 'center'
        }}>
          <img 
            src="/logo.png" 
            alt="Centro Cultural Banreservas"
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'contain',
              display: 'block',
              margin: '0 auto',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
            }}
          />
        </div>

        {/* Título principal profesional - PERFECTAMENTE CENTRADO */}
        <div style={{ 
          textAlign: 'center', 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'center',
          marginBottom: '1rem'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            color: '#1a1a1a',
            margin: '0',
            fontWeight: '300',
            letterSpacing: '-0.5px',
            lineHeight: '1.2',
            textShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textAlign: 'center',
            width: '100%'
          }}>
            ¡Bienvenido al Centro Cultural Banreservas!
          </h1>
        </div>

        {/* Subtítulo elegante - PERFECTAMENTE CENTRADO */}
        <div style={{ 
          textAlign: 'center', 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'center',
          marginBottom: '3rem'
        }}>
          <p style={{
            color: '#6c757d',
            margin: '0',
            fontSize: '1.2rem',
            fontWeight: '400',
            letterSpacing: '0.3px',
            textAlign: 'center',
            width: '100%'
          }}>
            Por favor seleccione una opción:
          </p>
        </div>

        {/* Grid de tarjetas profesionales - FILA HORIZONTAL PARA TABLETS */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1.5rem',
          marginBottom: '3rem',
          width: '100%'
        }}>
          {kioskCards.map((card) => (
            <div
              key={card.id}
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                border: '2px solid #e9ecef',
                borderRadius: '24px', // Más redondeado y amigable
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                minHeight: '200px',
                minWidth: '220px',
                flex: '1',
                maxWidth: '280px',
                padding: '2rem 1.5rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                // OPTIMIZADO PARA TABLETS Y TOUCH
                minTouchTarget: '44px',
                touchAction: 'manipulation',
                userSelect: 'none',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                transform: selectedCard() === card.id ? 'translateY(-8px) scale(1.05)' : 'translateY(0) scale(1)',
                boxShadow: selectedCard() === card.id 
                  ? '0 25px 50px rgba(0, 102, 204, 0.25), 0 12px 24px rgba(0, 102, 204, 0.15)'
                  : '0 8px 25px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.06)',
                borderColor: selectedCard() === card.id ? '#0066cc' : '#e9ecef'
              }}
              onClick={() => handleCardClick(card.id)}
              // EVENTOS TÁCTILES OPTIMIZADOS PARA TABLETS
              onTouchStart={(e) => {
                e.target.style.transform = 'translateY(-4px) scale(1.03)';
                e.target.style.boxShadow = '0 15px 35px rgba(0, 102, 204, 0.2)';
                e.target.style.borderColor = '#0066cc';
              }}
              onTouchEnd={(e) => {
                setTimeout(() => {
                  if (selectedCard() !== card.id) {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                    e.target.style.borderColor = '#e9ecef';
                  }
                }, 150);
              }}
              onMouseEnter={(e) => {
                if (selectedCard() !== card.id) {
                  e.target.style.transform = 'translateY(-4px) scale(1.02)';
                  e.target.style.boxShadow = '0 15px 35px rgba(0, 102, 204, 0.15)';
                  e.target.style.borderColor = '#0066cc';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCard() !== card.id) {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                  e.target.style.borderColor = '#e9ecef';
                }
              }}
            >
              {/* Efecto de brillo sutil */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                transform: selectedCard() === card.id ? 'translateX(200%)' : 'translateX(0)',
                transition: 'transform 0.8s ease',
                pointerEvents: 'none'
              }} />

              {/* Icono - MÁS GRANDE PARA TABLETS - CENTRADO */}
              <div style={{
                fontSize: '3.5rem',
                marginBottom: '1.2rem',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
                lineHeight: '1',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
              }}>
                {card.icon}
              </div>

              {/* Título de la tarjeta - MÁS PROMINENTE - CENTRADO */}
              <div style={{
                fontSize: '1.6rem',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '1rem',
                letterSpacing: '0.3px',
                lineHeight: '1.2',
                textAlign: 'center',
                width: '100%'
              }}>
                {card.title}
              </div>

              {/* Descripción - LEGIBLE EN TABLETS - CENTRADA */}
              <div style={{
                fontSize: '1rem',
                color: '#6c757d',
                lineHeight: '1.4',
                fontWeight: '400',
                marginBottom: '1.5rem',
                textAlign: 'center',
                width: '100%'
              }}>
                {card.description}
              </div>

              {/* Botón seleccionar - OPTIMIZADO PARA TÁCTIL */}
              <div style={{
                background: 'linear-gradient(135deg, #0066cc 0%, #003366 100%)',
                color: 'white',
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: 'none',
                outline: 'none',
                letterSpacing: '0.5px',
                minHeight: '44px',
                minWidth: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                ✓ Seleccionar
              </div>
            </div>
          ))}
        </div>

        {/* Línea divisoria elegante */}
        <div style={{
          width: '80px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
          margin: '0 auto 2rem auto',
          borderRadius: '2px'
        }} />

        {/* Link administrativo profesional - CENTRADO */}
        <div style={{
          textAlign: 'center',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            padding: '1rem',
            borderRadius: '12px',
            background: 'linear-gradient(145deg, rgba(0, 123, 255, 0.05), rgba(0, 102, 204, 0.08))',
            border: '1px solid rgba(0, 102, 204, 0.1)',
            display: 'inline-block'
          }}>
            <a
              href="#"
              style={{
                color: '#0066cc',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                letterSpacing: '0.3px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textAlign: 'center'
              }}
              onClick={(e) => {
                e.preventDefault();
                handleCardClick('admin');
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#003366';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#0066cc';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>🔐</span>
              Acceso Administrativo
            </a>
          </div>
        </div>

        {/* Footer elegante - CENTRADO */}
        <div style={{
          marginTop: '2.5rem',
          padding: '1rem 0',
          borderTop: '1px solid rgba(0, 0, 0, 0.05)',
          color: '#9ca3af',
          fontSize: '0.85rem',
          letterSpacing: '0.5px',
          textAlign: 'center',
          width: '100%'
        }}>
          Sistema de Gestión de Eventos y Visitantes • CCB © 2025
        </div>
      </div>
    </div>
  );
}

export default App;