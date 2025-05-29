// EventsList.jsx - Lista de eventos con filtros
import { createSignal, createEffect, For } from 'solid-js';
import EventCard from './EventCard';
import EventModal from './EventModal';

function EventsList(props) {
  const { onBack } = props;
  const [events, setEvents] = createSignal([]);
  const [filteredEvents, setFilteredEvents] = createSignal([]);
  const [selectedFilter, setSelectedFilter] = createSignal('todos');
  const [selectedEvent, setSelectedEvent] = createSignal(null);
  const [showModal, setShowModal] = createSignal(false);
  const [loading, setLoading] = createSignal(true);

  // Datos de eventos de ejemplo (más tarde vendrán del backend)
  const mockEvents = [
    {
      id: 1,
      titulo: 'Concierto de Jazz Dominicano',
      descripcion: 'Una noche mágica con los mejores músicos de jazz del país',
      fecha: '2025-06-15',
      hora: '20:00',
      lugar: 'Auditorio Principal CCB',
      categoria: 'Música',
      estado: 'proximo',
      capacidad: 200,
      registrados: 45,
      imagen: '/logo.png',
      precio: 'Entrada libre'
    },
    {
      id: 2,
      titulo: 'Exposición: Arte Contemporáneo Dominicano',
      descripcion: 'Muestra de los más destacados artistas visuales contemporáneos',
      fecha: '2025-06-20',
      hora: '18:00',
      lugar: 'Galería Principal CCB',
      categoria: 'Arte',
      estado: 'activo',
      capacidad: 100,
      registrados: 23,
      imagen: '/logo.png',
      precio: 'Entrada libre'
    },
    {
      id: 3,
      titulo: 'Taller de Literatura Creativa',
      descripcion: 'Aprende técnicas de escritura creativa con autores reconocidos',
      fecha: '2025-06-25',
      hora: '15:00',
      lugar: 'Aula Magna CCB',
      categoria: 'Literatura',
      estado: 'proximo',
      capacidad: 50,
      registrados: 12,
      imagen: '/logo.png',
      precio: 'Entrada libre'
    },
    {
      id: 4,
      titulo: 'Festival de Danza Folklórica',
      descripcion: 'Celebración de las tradiciones dancísticas dominicanas',
      fecha: '2025-05-10',
      hora: '19:00',
      lugar: 'Teatro CCB',
      categoria: 'Danza',
      estado: 'finalizado',
      capacidad: 300,
      registrados: 280,
      imagen: '/logo.png',
      precio: 'Entrada libre'
    }
  ];

  // Filtros disponibles
  const filters = [
    { id: 'todos', label: 'Todos', icon: '🎭' },
    { id: 'proximo', label: 'Próximos', icon: '📅' },
    { id: 'activo', label: 'En Curso', icon: '▶️' },
    { id: 'finalizado', label: 'Finalizados', icon: '✅' }
  ];

  // Simular carga de datos
  createEffect(() => {
    setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 1000);
  });

  // Filtrar eventos cuando cambia el filtro o los eventos
  createEffect(() => {
    const currentFilter = selectedFilter();
    const allEvents = events();
    
    if (currentFilter === 'todos') {
      setFilteredEvents(allEvents);
    } else {
      setFilteredEvents(allEvents.filter(event => event.estado === currentFilter));
    }
  });

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleBackToHome = () => {
    // Llamar la función onBack del componente padre
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #003366 0%, #0066cc 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Header con logo y botón volver */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <button
          onClick={handleBackToHome}
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 20px',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#003366',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'white';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.9)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          ← Volver al Inicio
        </button>

        <img 
          src="/logo.png" 
          alt="Centro Cultural Banreservas"
          style={{
            width: '60px',
            height: '60px',
            objectFit: 'contain'
          }}
        />
      </div>

      {/* Título principal */}
      <h1 style={{
        fontSize: '2.5rem',
        color: 'white',
        textAlign: 'center',
        marginBottom: '1rem',
        fontWeight: '300',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
      }}>
        🎭 Eventos Culturales
      </h1>

      <p style={{
        fontSize: '1.1rem',
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        Descubre y regístrate en nuestros eventos
      </p>

      {/* Filtros */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <For each={filters}>
          {(filter) => (
            <button
              onClick={() => setSelectedFilter(filter.id)}
              style={{
                background: selectedFilter() === filter.id 
                  ? 'white' 
                  : 'rgba(255, 255, 255, 0.2)',
                color: selectedFilter() === filter.id 
                  ? '#003366' 
                  : 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                minWidth: '120px',
                justifyContent: 'center'
              }}
            >
              <span>{filter.icon}</span>
              {filter.label}
            </button>
          )}
        </For>
      </div>

      {/* Lista de eventos */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        flex: 1,
        overflowY: 'auto'
      }}>
        {loading() ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
            color: 'white',
            fontSize: '1.2rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                border: '3px solid rgba(255,255,255,0.3)',
                borderTop: '3px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Cargando eventos...
            </div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.5rem',
            padding: '0 1rem'
          }}>
            <For each={filteredEvents()}>
              {(event) => (
                <EventCard 
                  event={event} 
                  onClick={() => handleEventClick(event)}
                />
              )}
            </For>
          </div>
        )}

        {!loading() && filteredEvents().length === 0 && (
          <div style={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.1rem',
            marginTop: '2rem'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎭</div>
            No hay eventos en esta categoría
          </div>
        )}
      </div>

      {/* Modal de evento */}
      {showModal() && (
        <EventModal 
          event={selectedEvent()} 
          onClose={() => setShowModal(false)}
          onRegister={(eventData) => {
            console.log('Registrar en evento:', eventData);
            // Aquí implementaremos la lógica de registro
            setShowModal(false);
          }}
        />
      )}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default EventsList;
