// EventModal.jsx - Modal para detalles y registro de eventos
import { createSignal } from 'solid-js';

function EventModal(props) {
  const { event, onClose, onRegister } = props;
  const [registrationData, setRegistrationData] = createSignal({
    nombre: '',
    email: '',
    telefono: '',
    comentarios: ''
  });
  const [step, setStep] = createSignal('details'); // details | register | success

  const formatDate = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-DO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    const data = registrationData();
    
    if (!data.nombre || !data.email) {
      alert('Por favor complete los campos requeridos');
      return;
    }

    // Generar código único  
    const codigo = `CCB-${Date.now().toString().slice(-6)}`;
    
    const registrationInfo = {
      ...data,
      evento: event,
      codigo,
      fechaRegistro: new Date().toISOString()
    };

    onRegister(registrationInfo);
    setStep('success');
  };

  const handleInputChange = (field, value) => {
    setRegistrationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClose = () => {
    setStep('details');
    setRegistrationData({ nombre: '', email: '', telefono: '', comentarios: '' });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001
          }}
        >
          ✕
        </button>

        {step() === 'details' && (
          <div style={{ padding: '2rem' }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '1.5rem',
              textAlign: 'center',
              paddingRight: '40px'
            }}>
              {event.titulo}
            </h2>
            
            <div style={{
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              <button
                onClick={() => setStep('register')}
                style={{
                  background: 'linear-gradient(135deg, #0066cc 0%, #003366 100%)',
                  border: 'none',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                📝 Registrarse
              </button>
            </div>
          </div>
        )}

        {step() === 'register' && (
          <div style={{ padding: '2rem' }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '1.5rem',
              textAlign: 'center',
              paddingRight: '40px'
            }}>
              📝 Registro para el Evento
            </h2>

            <form onSubmit={handleRegistration}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
                marginBottom: '2rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#1a1a1a'
                  }}>
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={registrationData().nombre}
                    onInput={(e) => handleInputChange('nombre', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e9ecef',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Ingrese su nombre completo"
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#1a1a1a'
                  }}>
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={registrationData().email}
                    onInput={(e) => handleInputChange('email', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e9ecef',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                    placeholder="su.email@ejemplo.com"
                  />
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center'
              }}>
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  style={{
                    background: 'transparent',
                    border: '2px solid #6c757d',
                    color: '#6c757d',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  ← Atrás
                </button>
                
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                    border: 'none',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  ✅ Confirmar Registro
                </button>
              </div>
            </form>
          </div>
        )}

        {step() === 'success' && (
          <div style={{
            padding: '3rem 2rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#28a745',
              marginBottom: '1rem'
            }}>
              ¡Registro Exitoso!
            </h2>
            
            <div style={{
              background: '#f8f9fa',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                color: '#0066cc',
                fontFamily: 'monospace'
              }}>
                CCB-{Date.now().toString().slice(-6)}
              </div>
            </div>

            <button
              onClick={handleClose}
              style={{
                background: 'linear-gradient(135deg, #0066cc 0%, #003366 100%)',
                border: 'none',
                color: 'white',
                padding: '12px 32px',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Finalizar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventModal;
