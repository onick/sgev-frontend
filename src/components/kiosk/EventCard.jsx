// EventCard.jsx
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';

const EventCard = (props) => {
  const event = props.event || {};
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha por confirmar';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-DO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventIcon = (type) => {
    const icons = {
      'teatro': '🎭',
      'musica': '🎵',
      'arte': '🎨',
      'danza': '💃',
      'literatura': '📚',
      'cine': '🎬',
      'conferencia': '🎤',
      'taller': '🔧',
      'exposicion': '🖼️'
    };
    return icons[type?.toLowerCase()] || '🎪';
  };

  return (
    <Card
      style={{
        'max-width': '320px',
        'min-height': '280px',
        position: 'relative',
        ...props.style
      }}
    >
      {/* Badge de categoría */}
      {event.category && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'var(--accent-gold)',
          color: 'white',
          padding: '0.25rem 0.75rem',
          'border-radius': '12px',
          fontSize: 'var(--font-size-xs)',
          fontWeight: '600',
          textTransform: 'uppercase'
        }}>
          {event.category}
        </div>
      )}

      {/* Icono del evento */}
      <div style={{
        fontSize: '3rem',
        marginBottom: '1rem'
      }}>
        {getEventIcon(event.type)}
      </div>

      {/* Título */}
      <h3 style={{
        color: 'var(--primary-blue)',
        marginBottom: '0.5rem',
        fontSize: 'var(--font-size-lg)',
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: '1.3'
      }}>
        {event.title || 'Evento Cultural'}
      </h3>

      {/* Fecha y hora */}
      <p style={{
        color: 'var(--medium-gray)',
        marginBottom: '0.5rem',
        fontSize: 'var(--font-size-sm)',
        fontWeight: '500'
      }}>
        📅 {formatDate(event.date)}
      </p>

      {/* Ubicación */}
      {event.location && (
        <p style={{
          color: 'var(--medium-gray)',
          marginBottom: '1rem',
          fontSize: 'var(--font-size-sm)'
        }}>
          📍 {event.location}
        </p>
      )}

      {/* Descripción */}
      <p style={{
        color: 'var(--dark-gray)',
        marginBottom: '1.5rem',
        fontSize: 'var(--font-size-sm)',
        lineHeight: '1.4',
        textAlign: 'center',
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-line-clamp': '3',
        '-webkit-box-orient': 'vertical'
      }}>
        {event.description || 'Únete a nosotros en esta experiencia cultural única en el Centro Cultural Banreservas.'}
      </p>

      {/* Estado de disponibilidad */}
      <div style={{
        display: 'flex',
        'justify-content': 'space-between',
        'align-items': 'center',
        marginBottom: '1rem',
        fontSize: 'var(--font-size-xs)'
      }}>
        <span style={{
          color: event.availableSpots > 0 ? 'var(--success)' : 'var(--danger)',
          fontWeight: '600'
        }}>
          {event.availableSpots > 0 
            ? `${event.availableSpots} cupos disponibles`
            : 'Evento lleno'
          }
        </span>
        
        {event.price && (
          <span style={{
            color: 'var(--accent-gold)',
            fontWeight: '600'
          }}>
            {event.price === 0 ? 'Gratis' : `$${event.price}`}
          </span>
        )}
      </div>

      {/* Botón de acción */}
      <Button 
        variant="primary" 
        onClick={() => props.onRegister?.(event)}
        disabled={event.availableSpots === 0}
        style={{ 
          width: '100%',
          marginTop: 'auto'
        }}
      >
        {event.availableSpots === 0 ? 'Evento Lleno' : 'Registrarse'}
      </Button>
    </Card>
  );
};

export default EventCard;