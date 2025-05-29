import { For } from 'solid-js';
import Logo from '../common/Logo.jsx';
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';

const KioskHome = () => {
  const cardData = [
    {
      title: 'Ver Eventos',
      description: 'Explore nuestros eventos actuales y próximos',
      icon: '📅', // Ícono de calendario
      action: () => window.location.href = '/eventos',
      buttonText: 'Explorar Eventos'
    },
    {
      title: 'Registrarse',
      description: 'Regístrese para un evento específico',
      icon: '📝', // Ícono de formulario
      action: () => window.location.href = '/registro',
      buttonText: 'Registrar Visita'
    },
    {
      title: 'Check-in',
      description: 'Confirme su asistencia a un evento',
      icon: '✅', // Ícono de check
      action: () => window.location.href = '/checkin',
      buttonText: 'Realizar Check-in'
    }
  ];

  const titleStyle = {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: '600',
    color: 'var(--dark-gray)',
    textAlign: 'center',
    marginBottom: 'var(--spacing-sm)'
  };

  const subtitleStyle = {
    fontSize: 'var(--font-size-md)',
    color: 'var(--medium-gray)',
    textAlign: 'center',
    marginBottom: 'var(--spacing-xl)'
  };
  
  const adminLinkStyle = {
    display: 'block',
    textAlign: 'center',
    marginTop: 'var(--spacing-lg)',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--primary-blue)',
    textDecoration: 'underline',
    cursor: 'pointer'
  };

  return (
    <div style={{
      padding: 'var(--spacing-xl)',
      maxWidth: '1000px',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center' 
    }}>
      <Logo />
      <h1 style={titleStyle}>¡Bienvenido al Centro Cultural Banreservas!</h1>
      <p style={subtitleStyle}>Por favor seleccione una opción:</p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--spacing-lg)',
        width: '100%'
      }}>
        <For each={cardData}>
          {(card) => (
            <Card 
              title={card.title}
              description={card.description}
              icon={card.icon}
              action={card.action}
              buttonText={card.buttonText}
            />
          )}
        </For>
      </div>
      <a onClick={() => window.location.href = '/admin'} style={adminLinkStyle}>
        Acceso Administrativo
      </a>
    </div>
  );
};

export default KioskHome;