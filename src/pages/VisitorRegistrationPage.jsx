import { createSignal, createEffect, onMount } from 'solid-js';
import KioskLayout from '../layouts/KioskLayout.jsx';
import Button from '../components/common/Button.jsx';
import { visitorsService } from '../services/visitors.js';
import { eventsService } from '../services/events.js';
import { validationUtils } from '../utils/helpers.js';

const VisitorRegistrationPage = () => {
  const [selectedEvent, setSelectedEvent] = createSignal(null);
  const [events, setEvents] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [step, setStep] = createSignal(1); // 1: select event, 2: form, 3: success
  
  // Datos del formulario
  const [formData, setFormData] = createSignal({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: ''
  });
  
  const [formErrors, setFormErrors] = createSignal({});
  const [confirmationCode, setConfirmationCode] = createSignal('');

  onMount(async () => {
    document.title = 'CCB - Registro de Visitantes';
    
    // Verificar si hay un evento preseleccionado en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event');
    
    // Cargar eventos
    try {
      const response = await eventsService.getEvents({ status: 'active' });
      const eventsList = response.events || [];
      setEvents(eventsList);
      
      if (eventId) {
        const preselectedEvent = eventsList.find(e => e.id === eventId);
        if (preselectedEvent) {
          setSelectedEvent(preselectedEvent);
          setStep(2);
        }
      }
    } catch (error) {
      console.error('Error loading events:', error);
    }
  });

  // Validar formulario
  const validateForm = () => {
    const errors = {};
    const data = formData();
    
    if (!validationUtils.isNotEmpty(data.name)) {
      errors.name = 'El nombre es requerido';
    } else if (!validationUtils.isValidName(data.name)) {
      errors.name = 'El nombre solo puede contener letras y espacios';
    }
    
    if (!validationUtils.isValidEmail(data.email)) {
      errors.email = 'Ingrese un email válido';
    }
    
    if (!validationUtils.isValidDominicanPhone(data.phone)) {
      errors.phone = 'Ingrese un teléfono dominicano válido (ej: 809-123-4567)';
    }
    
    if (!validationUtils.isValidAge(data.age)) {
      errors.age = 'La edad debe estar entre 5 y 120 años';
    }
    
    if (!data.gender) {
      errors.gender = 'Seleccione su género';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await visitorsService.register(formData(), selectedEvent().id);
      
      if (response.success) {
        setConfirmationCode(response.confirmationCode);
        setStep(3);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Error al registrar. Por favor intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Actualizar campo del formulario
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (formErrors()[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const pageStyle = {
    padding: 'var(--spacing-lg)',
    maxWidth: '600px',
    margin: '0 auto',
    minHeight: '100vh'
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

  const cardStyle = {
    background: 'white',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-xl)',
    boxShadow: '0 8px 32px rgba(0, 51, 102, 0.1)',
    marginBottom: 'var(--spacing-lg)'
  };

  const inputStyle = {
    width: '100%',
    padding: 'var(--spacing-md)',
    border: '2px solid var(--light-gray)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-base)',
    marginBottom: 'var(--spacing-sm)'
  };

  const errorStyle = {
    color: 'var(--danger)',
    fontSize: 'var(--font-size-sm)',
    marginTop: '0.25rem',
    marginBottom: 'var(--spacing-sm)'
  };

  return (
    <KioskLayout>
      <div style={pageStyle}>
        {/* Botón de regreso */}
        <Button
          variant="secondary"
          onClick={() => step() === 1 ? window.location.href = '/' : setStep(step() - 1)}
          style={backButtonStyle}
        >
          ← {step() === 1 ? 'Volver al Inicio' : 'Atrás'}
        </Button>

        {/* Paso 1: Seleccionar Evento */}
        {step() === 1 && (
          <div style={cardStyle}>
            <h1 style={{
              fontSize: 'var(--font-size-3xl)',
              color: 'var(--primary-blue)',
              textAlign: 'center',
              marginBottom: 'var(--spacing-lg)'
            }}>
              Seleccionar Evento
            </h1>
            
            <p style={{
              textAlign: 'center',
              color: 'var(--medium-gray)',
              marginBottom: 'var(--spacing-xl)'
            }}>
              Elige el evento al que deseas asistir
            </p>

            {events().length === 0 ? (
              <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>📅</div>
                <p style={{ color: 'var(--medium-gray)' }}>
                  No hay eventos disponibles en este momento
                </p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gap: 'var(--spacing-md)'
              }}>
                {events().map(event => (
                  <div
                    style={{
                      border: '2px solid var(--light-gray)',
                      borderRadius: 'var(--radius-md)',
                      padding: 'var(--spacing-lg)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-normal)'
                    }}
                    onClick={() => {
                      setSelectedEvent(event);
                      setStep(2);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.border = '2px solid var(--primary-blue)';
                      e.currentTarget.style.background = 'var(--light-blue)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.border = '2px solid var(--light-gray)';
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    <h3 style={{
                      color: 'var(--primary-blue)',
                      marginBottom: 'var(--spacing-sm)'
                    }}>
                      {event.title}
                    </h3>
                    <p style={{
                      color: 'var(--medium-gray)',
                      fontSize: 'var(--font-size-sm)',
                      marginBottom: 'var(--spacing-sm)'
                    }}>
                      📅 {new Date(event.date).toLocaleDateString('es-DO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    <p style={{
                      color: 'var(--medium-gray)',
                      fontSize: 'var(--font-size-sm)'
                    }}>
                      📍 {event.location}
                    </p>
                    
                    {event.availableSpots !== undefined && (
                      <p style={{
                        color: event.availableSpots > 0 ? 'var(--success)' : 'var(--danger)',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: '600',
                        marginTop: 'var(--spacing-sm)'
                      }}>
                        {event.availableSpots > 0 
                          ? `${event.availableSpots} cupos disponibles`
                          : 'Evento lleno'
                        }
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Paso 2: Formulario de Registro */}
        {step() === 2 && selectedEvent() && (
          <div style={cardStyle}>
            <h1 style={{
              fontSize: 'var(--font-size-3xl)',
              color: 'var(--primary-blue)',
              textAlign: 'center',
              marginBottom: 'var(--spacing-lg)'
            }}>
              Registro de Visitante
            </h1>

            {/* Información del evento seleccionado */}
            <div style={{
              background: 'var(--light-blue)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--spacing-lg)',
              marginBottom: 'var(--spacing-xl)'
            }}>
              <h3 style={{
                color: 'var(--primary-blue)',
                marginBottom: 'var(--spacing-sm)'
              }}>
                Evento Seleccionado:
              </h3>
              <p><strong>{selectedEvent().title}</strong></p>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--medium-gray)' }}>
                📅 {new Date(selectedEvent().date).toLocaleDateString('es-DO', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--medium-gray)' }}>
                📍 {selectedEvent().location}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Nombre */}
              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label style={{
                  display: 'block',
                  marginBottom: 'var(--spacing-sm)',
                  fontWeight: '600',
                  color: 'var(--dark-gray)'
                }}>
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  value={formData().name}
                  onInput={(e) => updateField('name', e.target.value)}
                  style={{
                    ...inputStyle,
                    borderColor: formErrors().name ? 'var(--danger)' : 'var(--light-gray)'
                  }}
                  placeholder="Ingrese su nombre completo"
                />
                {formErrors().name && <div style={errorStyle}>{formErrors().name}</div>}
              </div>

              {/* Email */}
              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label style={{
                  display: 'block',
                  marginBottom: 'var(--spacing-sm)',
                  fontWeight: '600',
                  color: 'var(--dark-gray)'
                }}>
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  value={formData().email}
                  onInput={(e) => updateField('email', e.target.value)}
                  style={{
                    ...inputStyle,
                    borderColor: formErrors().email ? 'var(--danger)' : 'var(--light-gray)'
                  }}
                  placeholder="ejemplo@correo.com"
                />
                {formErrors().email && <div style={errorStyle}>{formErrors().email}</div>}
              </div>

              {/* Teléfono */}
              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label style={{
                  display: 'block',
                  marginBottom: 'var(--spacing-sm)',
                  fontWeight: '600',
                  color: 'var(--dark-gray)'
                }}>
                  Teléfono *
                </label>
                <input
                  type="tel"
                  value={formData().phone}
                  onInput={(e) => updateField('phone', e.target.value)}
                  style={{
                    ...inputStyle,
                    borderColor: formErrors().phone ? 'var(--danger)' : 'var(--light-gray)'
                  }}
                  placeholder="809-123-4567"
                />
                {formErrors().phone && <div style={errorStyle}>{formErrors().phone}</div>}
              </div>

              {/* Edad y Género */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--spacing-md)',
                marginBottom: 'var(--spacing-lg)'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: 'var(--spacing-sm)',
                    fontWeight: '600',
                    color: 'var(--dark-gray)'
                  }}>
                    Edad *
                  </label>
                  <input
                    type="number"
                    value={formData().age}
                    onInput={(e) => updateField('age', e.target.value)}
                    style={{
                      ...inputStyle,
                      borderColor: formErrors().age ? 'var(--danger)' : 'var(--light-gray)'
                    }}
                    placeholder="25"
                    min="5"
                    max="120"
                  />
                  {formErrors().age && <div style={errorStyle}>{formErrors().age}</div>}
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: 'var(--spacing-sm)',
                    fontWeight: '600',
                    color: 'var(--dark-gray)'
                  }}>
                    Género *
                  </label>
                  <select
                    value={formData().gender}
                    onChange={(e) => updateField('gender', e.target.value)}
                    style={{
                      ...inputStyle,
                      borderColor: formErrors().gender ? 'var(--danger)' : 'var(--light-gray)'
                    }}
                  >
                    <option value="">Seleccionar</option>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                    <option value="other">Otro</option>
                  </select>
                  {formErrors().gender && <div style={errorStyle}>{formErrors().gender}</div>}
                </div>
              </div>

              {/* Botones */}
              <div style={{
                display: 'flex',
                gap: 'var(--spacing-md)',
                justifyContent: 'center',
                marginTop: 'var(--spacing-xl)'
              }}>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setStep(1)}
                  disabled={loading()}
                >
                  Cambiar Evento
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading()}
                  style={{ minWidth: '150px' }}
                >
                  {loading() ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      Registrando...
                    </span>
                  ) : (
                    'Completar Registro'
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Paso 3: Registro Exitoso */}
        {step() === 3 && (
          <div style={cardStyle}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-lg)' }}>🎉</div>
              
              <h1 style={{
                fontSize: 'var(--font-size-3xl)',
                color: 'var(--success)',
                marginBottom: 'var(--spacing-lg)'
              }}>
                ¡Registro Exitoso!
              </h1>

              <div style={{
                background: 'var(--light-blue)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--spacing-xl)',
                marginBottom: 'var(--spacing-lg)'
              }}>
                <h2 style={{
                  color: 'var(--primary-blue)',
                  marginBottom: 'var(--spacing-md)'
                }}>
                  Tu código de confirmación:
                </h2>
                <div style={{
                  fontSize: 'var(--font-size-2xl)',
                  fontWeight: '700',
                  color: 'var(--primary-blue)',
                  background: 'white',
                  padding: 'var(--spacing-lg)',
                  borderRadius: 'var(--radius-md)',
                  letterSpacing: '4px',
                  fontFamily: 'monospace',
                  border: '2px solid var(--primary-blue)'
                }}>
                  {confirmationCode()}
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 193, 7, 0.1)',
                border: '1px solid var(--warning)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--spacing-lg)',
                marginBottom: 'var(--spacing-lg)',
                textAlign: 'left'
              }}>
                <h3 style={{
                  color: 'var(--warning)',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  ⚠️ Información Importante:
                </h3>
                <ul style={{ color: 'var(--dark-gray)', lineHeight: '1.6' }}>
                  <li>Guarda este código de confirmación</li>
                  <li>Lo necesitarás para hacer check-in el día del evento</li>
                  <li>También recibirás un correo con esta información</li>
                  <li>Llega 15 minutos antes del inicio del evento</li>
                </ul>
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
                  Volver al Inicio
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setStep(1);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      age: '',
                      gender: ''
                    });
                    setFormErrors({});
                    setConfirmationCode('');
                    setSelectedEvent(null);
                  }}
                >
                  Nuevo Registro
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </KioskLayout>
  );
};

export default VisitorRegistrationPage;