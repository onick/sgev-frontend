import { createSignal, createEffect, onMount } from 'solid-js';
import KioskLayout from '../layouts/KioskLayout.jsx';
import EventCard from '../components/kiosk/EventCard.jsx';
import Button from '../components/common/Button.jsx';
import { eventsService } from '../services/events.js';

const EventsPage = () => {
  const [events, setEvents] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal('');
  const [selectedCategory, setSelectedCategory] = createSignal('all');

  // Cargar eventos al montar el componente
  onMount(async () => {
    try {
      setLoading(true);
      const response = await eventsService.getEvents({
        status: 'active',
        limit: 20
      });
      
      if (response.success) {
        setEvents(response.events || []);
      } else {
        setEvents(response.events || []); // Datos de ejemplo en desarrollo
      }
    } catch (err) {
      setError('Error cargando eventos');
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  });

  // Obtener categorías únicas
  const categories = () => {
    const cats = ['all', ...new Set(events().map(event => event.category))];
    return cats.filter(Boolean);
  };

  // Filtrar eventos por categoría
  const filteredEvents = () => {
    if (selectedCategory() === 'all') {
      return events();
    }
    return events().filter(event => event.category === selectedCategory());
  };

  // Manejar registro en evento
  const handleEventRegistration = (event) => {
    // Navegar a página de registro con el evento seleccionado
    window.location.href = `/registro?event=${event.id}`;
  };

  const pageStyle = {
    padding: 'var(--spacing-lg)',
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '100vh'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: 'var(--spacing-xl)'
  };

  const titleStyle = {
    fontSize: 'var(--font-size-3xl)',
    fontWeight: '600',
    color: 'var(--primary-blue)',
    marginBottom: 'var(--spacing-sm)'
  };

  const subtitleStyle = {
    fontSize: 'var(--font-size-lg)',
    color: 'var(--medium-gray)',
    marginBottom: 'var(--spacing-lg)'
  };

  const filtersStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: 'var(--spacing-sm)',
    marginBottom: 'var(--spacing-xl)',
    flexWrap: 'wrap'
  };

  const eventsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'var(--spacing-lg)',
    marginBottom: 'var(--spacing-xl)'
  };

  const backButtonStyle = {
    position: 'fixed',
    top: 'var(--spacing-lg)',
    left: 'var(--spacing-lg)',
    zIndex: 1000,
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: 'var(--radius-full)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    border: '2px solid var(--primary-blue)',
    boxShadow: '0 4px 12px rgba(0, 51, 102, 0.2)'
  };

  return (
    <KioskLayout>
      <div style={pageStyle}>
        {/* Botón de regreso */}
        <Button
          variant="secondary"
          onClick={() => window.location.href = '/'}
          style={backButtonStyle}
        >
          ← Volver al Inicio
        </Button>

        {/* Header */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>Eventos Culturales</h1>
          <p style={subtitleStyle}>
            Descubre y regístrate en nuestros próximos eventos
          </p>
        </div>

        {/* Filtros por categoría */}
        <div style={filtersStyle}>
          {categories().map(category => (
            <Button
              variant={selectedCategory() === category ? 'primary' : 'secondary'}
              onClick={() => setSelectedCategory(category)}
              style={{ textTransform: 'capitalize' }}
            >
              {category === 'all' ? 'Todos' : category}
            </Button>
          ))}
        </div>

        {/* Estado de carga */}
        {loading() && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px',
            flexDirection: 'column',
            gap: 'var(--spacing-md)'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid var(--primary-blue)',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <p style={{ color: 'var(--primary-blue)', fontSize: 'var(--font-size-lg)' }}>
              Cargando eventos...
            </p>
          </div>
        )}

        {/* Error */}
        {error() && (
          <div style={{
            background: 'rgba(220, 53, 69, 0.1)',
            border: '1px solid var(--danger)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--spacing-lg)',
            textAlign: 'center',
            marginBottom: 'var(--spacing-xl)'
          }}>
            <p style={{ color: 'var(--danger)', fontSize: 'var(--font-size-lg)' }}>
              ⚠️ {error()}
            </p>
            <Button
              variant="primary"
              onClick={() => window.location.reload()}
              style={{ marginTop: 'var(--spacing-md)' }}
            >
              Reintentar
            </Button>
          </div>
        )}

        {/* Lista de eventos */}
        {!loading() && !error() && (
          <>
            {filteredEvents().length > 0 ? (
              <div style={eventsGridStyle}>
                {filteredEvents().map(event => (
                  <EventCard
                    event={event}
                    onRegister={handleEventRegistration}
                  />
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: 'var(--spacing-xl)',
                background: 'var(--light-gray)',
                borderRadius: 'var(--radius-lg)',
                marginBottom: 'var(--spacing-xl)'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}>
                  📅
                </div>
                <h3 style={{
                  color: 'var(--primary-blue)',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  No hay eventos disponibles
                </h3>
                <p style={{ color: 'var(--medium-gray)' }}>
                  {selectedCategory() === 'all' 
                    ? 'No hay eventos programados en este momento'
                    : `No hay eventos en la categoría "${selectedCategory()}"`
                  }
                </p>
              </div>
            )}
          </>
        )}

        {/* Información adicional */}
        <div style={{
          background: 'var(--light-blue)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--spacing-lg)',
          textAlign: 'center',
          marginTop: 'var(--spacing-xl)'
        }}>
          <h3 style={{
            color: 'var(--primary-blue)',
            marginBottom: 'var(--spacing-sm)'
          }}>
            ¿Necesitas ayuda?
          </h3>
          <p style={{
            color: 'var(--primary-blue)',
            marginBottom: 'var(--spacing-md)'
          }}>
            Si tienes preguntas sobre nuestros eventos, acércate a nuestro personal de recepción
          </p>
          <Button
            variant="primary"
            onClick={() => window.location.href = '/'}
            style={{ marginTop: 'var(--spacing-sm)' }}
          >
            Volver al Menú Principal
          </Button>
        </div>
      </div>
    </KioskLayout>
  );
};

export default EventsPage;