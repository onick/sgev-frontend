import { createSignal, onMount } from 'solid-js';
import KioskLayout from '../layouts/KioskLayout.jsx';
import CheckInCard from '../components/kiosk/CheckInCard.jsx';
import Button from '../components/common/Button.jsx';
import { visitorsService } from '../services/visitors.js';

const CheckInPage = () => {
  const [checkInStatus, setCheckInStatus] = createSignal('idle'); // idle, success, error
  const [visitorInfo, setVisitorInfo] = createSignal(null);
  const [eventInfo, setEventInfo] = createSignal(null);

  onMount(() => {
    document.title = 'CCB - Check-in de Visitantes';
  });

  // Manejar check-in
  const handleCheckIn = async (confirmationCode) => {
    try {
      const response = await visitorsService.checkIn(confirmationCode);
      
      if (response.success) {
        setVisitorInfo(response.visitor);
        setEventInfo(response.event);
        setCheckInStatus('success');
      } else {
        throw new Error('Código no válido');
      }
    } catch (error) {
      setCheckInStatus('error');
      throw error; // Propagar el error para que CheckInCard lo maneje
    }
  };

  // Reiniciar check-in
  const resetCheckIn = () => {
    setCheckInStatus('idle');
    setVisitorInfo(null);
    setEventInfo(null);
  };

  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: 'var(--spacing-lg)',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
  };

  const containerStyle = {
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center'
  };

  const headerStyle = {
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

  const successCardStyle = {
    background: 'white',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-xl)',
    boxShadow: '0 8px 32px rgba(0, 51, 102, 0.1)',
    border: '2px solid var(--success)',
    textAlign: 'center',
    marginBottom: 'var(--spacing-lg)'
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

        <div style={containerStyle}>
          {/* Header */}
          <div style={headerStyle}>
            <h1 style={titleStyle}>Check-in de Visitantes</h1>
            <p style={subtitleStyle}>
              Confirma tu asistencia usando tu código de confirmación
            </p>
          </div>

          {/* Estado de check-in exitoso */}
          {checkInStatus() === 'success' && visitorInfo() && (
            <div style={successCardStyle}>
              <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-lg)' }}>
                🎉
              </div>
              
              <h2 style={{
                color: 'var(--success)',
                marginBottom: 'var(--spacing-md)',
                fontSize: 'var(--font-size-2xl)'
              }}>
                ¡Check-in Exitoso!
              </h2>
              
              <div style={{
                background: 'var(--light-gray)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--spacing-lg)',
                marginBottom: 'var(--spacing-lg)',
                textAlign: 'left'
              }}>
                <h3 style={{
                  color: 'var(--primary-blue)',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  Información del Visitante:
                </h3>
                <p><strong>Nombre:</strong> {visitorInfo().name}</p>
                <p><strong>Email:</strong> {visitorInfo().email}</p>
                {visitorInfo().phone && (
                  <p><strong>Teléfono:</strong> {visitorInfo().phone}</p>
                )}
                
                {eventInfo() && (
                  <>
                    <hr style={{ margin: 'var(--spacing-md) 0' }} />
                    <h3 style={{
                      color: 'var(--primary-blue)',
                      marginBottom: 'var(--spacing-sm)'
                    }}>
                      Evento:
                    </h3>
                    <p><strong>Título:</strong> {eventInfo().title}</p>
                    <p><strong>Ubicación:</strong> {eventInfo().location}</p>
                    <p><strong>Fecha:</strong> {new Date(eventInfo().date).toLocaleDateString('es-DO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</p>
                  </>
                )}
              </div>
              
              <div style={{
                display: 'flex',
                gap: 'var(--spacing-md)',
                justifyContent: 'center'
              }}>
                <Button
                  variant="primary"
                  onClick={() => window.location.href = '/'}
                >
                  Ir al Menú Principal
                </Button>
                <Button
                  variant="secondary"
                  onClick={resetCheckIn}
                >
                  Nuevo Check-in
                </Button>
              </div>
            </div>
          )}

          {/* Tarjeta de check-in (cuando no hay check-in exitoso) */}
          {checkInStatus() !== 'success' && (
            <CheckInCard
              onCheckIn={handleCheckIn}
              style={{
                boxShadow: '0 8px 32px rgba(0, 51, 102, 0.1)',
                border: '2px solid var(--primary-blue)',
                marginBottom: 'var(--spacing-lg)'
              }}
            />
          )}

          {/* Información adicional */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-lg)',
            marginTop: 'var(--spacing-lg)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{
              color: 'var(--primary-blue)',
              marginBottom: 'var(--spacing-sm)'
            }}>
              Instrucciones:
            </h3>
            <ul style={{
              textAlign: 'left',
              color: 'var(--dark-gray)',
              lineHeight: '1.6'
            }}>
              <li>Ingresa tu código de confirmación de 4-8 caracteres</li>
              <li>El código se encuentra en tu correo de confirmación</li>
              <li>Si no encuentras tu código, consulta con recepción</li>
              <li>El check-in debe realizarse antes del inicio del evento</li>
            </ul>
          </div>
        </div>
      </div>
    </KioskLayout>
  );
};

export default CheckInPage;