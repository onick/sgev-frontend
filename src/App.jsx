// App.jsx - Versión con navegación REACTIVA correcta en SolidJS
import { createSignal, onMount, Show, Switch, Match } from 'solid-js';
import EventsPage from './pages/EventsPage';

function App() {
  const [selectedCard, setSelectedCard] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('home'); // home | events | register | checkin

  onMount(() => {
    // Reset completo del documento
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  });

  const handleCardClick = (cardType) => {
    console.log('🔍 Card clicked:', cardType);
    setSelectedCard(cardType);
    
    // Navegación inmediata
    console.log(`📱 Navegando a: ${cardType}`);
    console.log('📊 Current page before:', currentPage());
    
    if (cardType === 'events') {
      console.log('✅ Setting page to events');
      setCurrentPage('events');
    } else if (cardType === 'register') {
      console.log('✅ Setting page to register');
      setCurrentPage('register');
    } else if (cardType === 'checkin') {
      console.log('✅ Setting page to checkin');
      setCurrentPage('checkin');
    } else if (cardType === 'admin') {
      console.log('🔐 Acceso administrativo - Por implementar');
    }
    
    console.log('📊 Current page after:', currentPage());
    
    // Reset del estado visual después de la navegación
    setTimeout(() => {
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

  // Función para volver al inicio
  const goHome = () => {
    console.log('🏠 Volviendo al inicio');
    setCurrentPage('home');
  };

  // IMPORTANTE: En SolidJS, usamos Switch/Match o Show para renderizado condicional reactivo
  return (
    <Switch>
      <Match when={currentPage() === 'events'}>
        {console.log('📱 Rendering EventsPage')}
        <EventsPage onBack={goHome} />
      </Match>
      
      <Match when={currentPage() === 'register'}>
        <div style={{
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(135deg, #003366 0%, #0066cc 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '2rem',
          textAlign: 'center',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
          <div>
            <h1>📝 Módulo de Registro</h1>
            <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>Por implementar</p>
            <button
              onClick={goHome}
              style={{
                background: 'white',
                color: '#003366',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '2rem'
              }}
            >
              ← Volver al Inicio
            </button>
          </div>
        </div>
      </Match>
      
      <Match when={currentPage() === 'checkin'}>
        <div style={{
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(135deg, #003366 0%, #0066cc 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '2rem',
          textAlign: 'center',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
          <div>
            <h1>✅ Módulo de Check-in</h1>
            <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>Por implementar</p>
            <button
              onClick={goHome}
              style={{
                background: 'white',
                color: '#003366',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '2rem'
              }}
            >
              ← Volver al Inicio
            </button>
          </div>
        </div>
      </Match>
      
      <Match when={currentPage() === 'home'}>
        {/* Página de inicio */}
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
          {/* Caja blanca profesional */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            borderRadius: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)',
            padding: '3rem 2rem',
            maxWidth: '1100px',
            width: '90%',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            position: 'relative',
            margin: '0 auto'
          }}>
            {/* Logo CCB */}
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '2.5rem'
            }}>
              <img 
                src="/logo.png" 
                alt="Centro Cultural Banreservas"
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                }}
              />
            </div>

            {/* Título principal */}
            <h1 style={{
              fontSize: '2.5rem',
              color: '#1a1a1a',
              margin: '0 0 1rem 0',
              fontWeight: '300',
              letterSpacing: '-0.5px',
              lineHeight: '1.2',
              textAlign: 'center'
            }}>
              ¡Bienvenido al Centro Cultural Banreservas!
            </h1>

            {/* Subtítulo */}
            <p style={{
              color: '#6c757d',
              margin: '0 0 3rem 0',
              fontSize: '1.2rem',
              fontWeight: '400',
              textAlign: 'center'
            }}>
              Por favor seleccione una opción:
            </p>

            {/* Grid de tarjetas */}
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
                    background: card.id === 'events' 
                      ? 'linear-gradient(135deg, #9333ea 0%, #c026d3 100%)'
                      : card.id === 'register'
                      ? 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)'
                      : 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    minHeight: '220px',
                    flex: '1',
                    padding: '2rem 1.5rem',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    color: 'white',
                    touchAction: 'manipulation',
                    userSelect: 'none',
                    transform: selectedCard() === card.id ? 'translateY(-8px) scale(1.05)' : 'translateY(0) scale(1)',
                    boxShadow: selectedCard() === card.id 
                      ? '0 25px 50px rgba(0, 0, 0, 0.25)'
                      : '0 8px 25px rgba(0, 0, 0, 0.15)'
                  }}
                  onClick={() => handleCardClick(card.id)}
                  onMouseEnter={(e) => {
                    if (selectedCard() !== card.id) {
                      e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCard() !== card.id) {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                >
                  {/* Efecto de brillo */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transform: selectedCard() === card.id ? 'translateX(200%)' : 'translateX(0)',
                    transition: 'transform 0.8s ease',
                    pointerEvents: 'none'
                  }} />

                  {/* Icono */}
                  <div style={{
                    fontSize: '3.5rem',
                    marginBottom: '1.2rem',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                    textAlign: 'center'
                  }}>
                    {card.icon}
                  </div>

                  {/* Título */}
                  <div style={{
                    fontSize: '1.6rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}>
                    {card.title}
                  </div>

                  {/* Descripción */}
                  <div style={{
                    fontSize: '1rem',
                    lineHeight: '1.4',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                    opacity: 0.9
                  }}>
                    {card.description}
                  </div>

                  {/* Indicador de acción */}
                  <div style={{
                    fontSize: '0.9rem',
                    opacity: 0.8,
                    textAlign: 'center',
                    fontWeight: '500'
                  }}>
                    Toca para continuar →
                  </div>
                </div>
              ))}
            </div>

            {/* Línea divisoria */}
            <div style={{
              width: '80px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
              margin: '0 auto 2rem auto'
            }} />

            {/* Link administrativo */}
            <div style={{ textAlign: 'center' }}>
              <button
                style={{
                  background: 'transparent',
                  border: '2px solid #0066cc',
                  color: '#0066cc',
                  padding: '0.8rem 2rem',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onClick={() => handleCardClick('admin')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0066cc';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#0066cc';
                }}
              >
                <span>🔐</span>
                Acceso Administrativo
              </button>
            </div>

            {/* Footer */}
            <div style={{
              marginTop: '2.5rem',
              padding: '1rem 0',
              borderTop: '1px solid rgba(0, 0, 0, 0.05)',
              color: '#9ca3af',
              fontSize: '0.85rem',
              textAlign: 'center'
            }}>
              Sistema de Gestión de Eventos y Visitantes • CCB © 2025
            </div>
          </div>
        </div>
      </Match>
    </Switch>
  );
}

export default App;