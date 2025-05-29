// EventCard.jsx - Tarjeta individual de evento
function EventCard(props) {
  const { event, onClick } = props;

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'activo': return '#28a745';
      case 'proximo': return '#007bff';
      case 'finalizado': return '#6c757d';
      default: return '#007bff';
    }
  };

  const getStatusText = (estado) => {
    switch (estado) {
      case 'activo': return 'En Curso';
      case 'proximo': return 'Próximo';
      case 'finalizado': return 'Finalizado';
      default: return 'Evento';
    }
  };

  const formatDate = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-DO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div
      onClick={() => onClick && onClick(event)}
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-4px)';
        e.target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
      }}
    >
      {/* Badge de estado */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        background: getStatusColor(event.estado),
        color: 'white',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '0.8rem',
        fontWeight: '600'
      }}>
        {getStatusText(event.estado)}
      </div>

      {/* Categoría */}
      <div style={{
        color: '#0066cc',
        fontSize: '0.9rem',
        fontWeight: '600',
        marginBottom: '0.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {event.categoria}
      </div>

      {/* Título */}
      <h3 style={{
        fontSize: '1.4rem',
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: '0.8rem',
        lineHeight: '1.3',
        paddingRight: '80px' // Espacio para el badge
      }}>
        {event.titulo}
      </h3>

      {/* Descripción */}
      <p style={{
        color: '#6c757d',
        fontSize: '1rem',
        lineHeight: '1.5',
        marginBottom: '1.2rem',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {event.descripcion}
      </p>

      {/* Info del evento */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginBottom: '1.2rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.9rem',
          color: '#495057'
        }}>
          <span>📅</span>
          <strong>{formatDate(event.fecha)}</strong>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.9rem',
          color: '#495057'
        }}>
          <span>⏰</span>
          {event.hora}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.9rem',
          color: '#495057'
        }}>
          <span>📍</span>
          {event.lugar}
        </div>
      </div>

      {/* Estadísticas de capacidad */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        padding: '0.8rem',
        background: 'rgba(0, 102, 204, 0.1)',
        borderRadius: '8px'
      }}>
        <div style={{
          fontSize: '0.85rem',
          color: '#495057'
        }}>
          <strong>{event.registrados}</strong> de <strong>{event.capacidad}</strong> registrados
        </div>
        
        <div style={{
          width: '60px',
          height: '6px',
          background: '#e9ecef',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${(event.registrados / event.capacidad) * 100}%`,
            height: '100%',
            background: event.registrados / event.capacidad > 0.8 ? '#dc3545' : '#0066cc',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Botón de acción */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          fontSize: '0.9rem',
          fontWeight: '600',
          color: '#28a745'
        }}>
          {event.precio}
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #0066cc 0%, #003366 100%)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '0.9rem',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {event.estado === 'finalizado' ? '👁️ Ver Detalles' : '📝 Registrarse'}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
