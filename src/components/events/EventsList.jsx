// EventsList.jsx - Lista de eventos con filtros según el PDF
import { createSignal, For, Show, onMount } from 'solid-js';

function EventsList(props) {
  const { onBack } = props;
  
  // Estado para los filtros
  const [selectedFilter, setSelectedFilter] = createSignal('todos');
  const [events, setEvents] = createSignal([]);
  const [filteredEvents, setFilteredEvents] = createSignal([]);
  const [selectedEvent, setSelectedEvent] = createSignal(null);
  
  // Datos de ejemplo de eventos
  const mockEvents = [
    {
      id: 1,
      title: 'Exposición de Arte Contemporáneo',
      description: 'Muestra de artistas emergentes dominicanos',
      date: '2025-06-15',
      time: '6:00 PM',
      location: 'Sala Principal',
      status: 'proximo',
      image: '🎨',
      category: 'Arte',
      capacity: 100,
      registered: 45
    },
    {
      id: 2,
      title: 'Concierto de Jazz',
      description: 'Noche de jazz con músicos internacionales',
      date: '2025-05-30',
      time: '8:00 PM',
      location: 'Auditorio',
      status: 'activo',
      image: '🎷',
      category: 'Música',
      capacity: 200,
      registered: 178
    },
    {
      id: 3,
      title: 'Taller de Escritura Creativa',
      description: 'Aprende técnicas de narrativa y poesía',
      date: '2025-06-05',
      time: '10:00 AM',
      location: 'Sala de Talleres',
      status: 'proximo',
      image: '✍️',
      category: 'Literatura',
      capacity: 30,
      registered: 25
    },
    {
      id: 4,
      title: 'Festival de Cine Dominicano',
      description: 'Proyección de cortometrajes nacionales',
      date: '2025-05-20',
      time: '7:00 PM',
      location: 'Cine del Centro',
      status: 'finalizado',
      image: '🎬',
      category: 'Cine',
      capacity: 150,
      registered: 150
    },
    {
      id: 5,
      title: 'Conferencia: Historia del Merengue',
      description: 'Un recorrido por nuestro ritmo nacional',
      date: '2025-06-10',
      time: '5:00 PM',
      location: 'Sala de Conferencias',
      status: 'proximo',
      image: '🎵',
      category: 'Música',
      capacity: 80,
      registered: 60
    }
  ];
  
  onMount(() => {
    setEvents(mockEvents);
    filterEvents('todos');
  });
  
  // Función para filtrar eventos
  const filterEvents = (filter) => {
    setSelectedFilter(filter);
    
    if (filter === 'todos') {
      setFilteredEvents(events());
    } else {
      setFilteredEvents(events().filter(event => event.status === filter));
    }
  };
  
  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    switch(status) {
      case 'activo': return '#10b981';
      case 'proximo': return '#3b82f6';
      case 'finalizado': return '#6b7280';
      default: return '#6b7280';
    }
  };
  
  // Función para formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-DO', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #003366 0%, #0066cc 100%)',
      overflow: 'hidden',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBack}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            ← Volver
          </button>
          <h1 style={{
            color: 'white',
            fontSize: '2rem',
            fontWeight: '300',
            margin: 0
          }}>
            🎭 Eventos Culturales
          </h1>
        </div>
        
        {/* Logo CCB */}
        <img 
          src="/logo.png" 
          alt="CCB"
          style={{
            height: '50px',
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)'
          }}
        />
      </div>

      {/* Filtros */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '1.5rem 2rem',
        display: 'flex',
        gap: '1rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <For each={[
          { id: 'todos', label: 'Todos', icon: '📋' },
          { id: 'activo', label: 'En Curso', icon: '🟢' },
          { id: 'proximo', label: 'Próximos', icon: '📅' },
          { id: 'finalizado', label: 'Finalizados', icon: '✓' }
        ]}>
          {(filter) => (
            <button
              onClick={() => filterEvents(filter.id)}
              style={{
                background: selectedFilter() === filter.id 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: selectedFilter() === filter.id ? '600' : '400',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (selectedFilter() !== filter.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedFilter() !== filter.id) {
                  e.currentTarget.style.background = 'transparent';
                }
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
        padding: '2rem',
        height: 'calc(100vh - 180px)',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <For each={filteredEvents()}>
            {(event) => (
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={() => setSelectedEvent(event)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Estado del evento */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: getStatusColor(event.status),
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  textTransform: 'capitalize'
                }}>
                  {event.status}
                </div>

                {/* Contenido del evento */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {/* Icono */}
                  <div style={{
                    fontSize: '3rem',
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #003366 0%, #0066cc 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {event.image}
                  </div>

                  {/* Información */}
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      color: '#1a1a1a',
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      margin: '0 0 0.5rem 0'
                    }}>
                      {event.title}
                    </h3>
                    
                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.95rem',
                      margin: '0 0 1rem 0',
                      lineHeight: '1.4'
                    }}>
                      {event.description}
                    </p>

                    {/* Detalles */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      fontSize: '0.9rem',
                      color: '#4b5563'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>📅</span>
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>🕒</span>
                        <span>{event.time}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>📍</span>
                        <span>{event.location}</span>
                      </div>
                    </div>

                    {/* Barra de capacidad */}
                    <div style={{ marginTop: '1rem' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.85rem',
                        color: '#6b7280',
                        marginBottom: '0.25rem'
                      }}>
                        <span>Registrados</span>
                        <span>{event.registered}/{event.capacity}</span>
                      </div>
                      <div style={{
                        background: '#e5e7eb',
                        height: '8px',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          background: 'linear-gradient(90deg, #003366, #0066cc)',
                          height: '100%',
                          width: `${(event.registered / event.capacity) * 100}%`,
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>

      {/* Modal de evento seleccionado */}
      <Show when={selectedEvent()}>
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          zIndex: 1000
        }}
        onClick={() => setSelectedEvent(null)}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}>
            <h2 style={{
              color: '#1a1a1a',
              fontSize: '1.75rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              {selectedEvent().title}
            </h2>
            
            <p style={{
              color: '#6b7280',
              fontSize: '1rem',
              lineHeight: '1.6',
              marginBottom: '1.5rem'
            }}>
              {selectedEvent().description}
            </p>

            <button
              style={{
                background: 'linear-gradient(135deg, #003366 0%, #0066cc 100%)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%',
                transition: 'all 0.3s ease'
              }}
              onClick={() => {
                console.log('Registrando al evento:', selectedEvent().id);
                setSelectedEvent(null);
              }}
            >
              Registrarse al Evento
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default EventsList;