// CheckInCard.jsx
import { createSignal } from 'solid-js';
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';

const CheckInCard = (props) => {
  const [code, setCode] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [message, setMessage] = createSignal('');
  const [messageType, setMessageType] = createSignal(''); // 'success', 'error', 'info'

  const handleCodeInput = (e) => {
    // Solo permitir números y letras, máximo 8 caracteres
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
    setCode(value);
    
    // Limpiar mensaje cuando el usuario empiece a escribir
    if (message()) {
      setMessage('');
      setMessageType('');
    }
  };

  const handleCheckIn = async () => {
    if (!code() || code().length < 4) {
      setMessage('Por favor ingresa un código válido');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('Verificando código...');
    setMessageType('info');

    try {
      // Aquí iría la llamada a la API
      await props.onCheckIn?.(code());
      
      setMessage('¡Check-in exitoso! Bienvenido al evento');
      setMessageType('success');
      setCode('');
      
      // Auto-limpiar después de 3 segundos
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
      
    } catch (error) {
      setMessage(error.message || 'Código no válido. Por favor verifica e intenta nuevamente.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && code()) {
      handleCheckIn();
    }
  };

  const clearCode = () => {
    setCode('');
    setMessage('');
    setMessageType('');
  };

  const getMessageColor = () => {
    switch (messageType()) {
      case 'success': return 'var(--success)';
      case 'error': return 'var(--danger)';
      case 'info': return 'var(--primary-blue)';
      default: return 'var(--medium-gray)';
    }
  };

  return (
    <Card
      style={{
        'max-width': '400px',
        'min-height': '320px',
        position: 'relative',
        ...props.style
      }}
    >
      {/* Icono principal */}
      <div style={{
        fontSize: '3rem',
        marginBottom: '1rem',
        color: 'var(--primary-blue)'
      }}>
        ✅
      </div>

      {/* Título */}
      <h3 style={{
        color: 'var(--primary-blue)',
        marginBottom: '0.5rem',
        fontSize: 'var(--font-size-xl)',
        fontWeight: '600',
        textAlign: 'center'
      }}>
        Check-in de Evento
      </h3>

      {/* Descripción */}
      <p style={{
        color: 'var(--medium-gray)',
        marginBottom: '1.5rem',
        fontSize: 'var(--font-size-sm)',
        textAlign: 'center',
        lineHeight: '1.4'
      }}>
        Ingresa tu código de confirmación para realizar el check-in
      </p>

      {/* Input del código */}
      <div style={{ marginBottom: '1rem', width: '100%' }}>
        <input
          type="text"
          placeholder="Ej: ABC123XY"
          value={code()}
          onInput={handleCodeInput}
          onKeyPress={handleKeyPress}
          disabled={loading()}
          style={{
            width: '100%',
            padding: '1rem',
            border: `2px solid ${message() && messageType() === 'error' ? 'var(--danger)' : 'var(--primary-blue)'}`,
            'border-radius': 'var(--radius-md)',
            fontSize: 'var(--font-size-lg)',
            textAlign: 'center',
            fontWeight: '600',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontFamily: 'monospace',
            background: loading() ? 'var(--light-gray)' : 'white',
            transition: 'all var(--transition-normal)'
          }}
          maxLength="8"
        />
      </div>

      {/* Mensaje de estado */}
      {message() && (
        <div style={{
          padding: '0.75rem',
          'border-radius': 'var(--radius-sm)',
          background: messageType() === 'success' 
            ? 'rgba(40, 167, 69, 0.1)' 
            : messageType() === 'error' 
            ? 'rgba(220, 53, 69, 0.1)'
            : 'rgba(0, 51, 102, 0.1)',
          border: `1px solid ${getMessageColor()}`,
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          <p style={{
            color: getMessageColor(),
            fontSize: 'var(--font-size-sm)',
            fontWeight: '500',
            margin: 0
          }}>
            {messageType() === 'success' && '✅ '}
            {messageType() === 'error' && '❌ '}
            {messageType() === 'info' && '⏳ '}
            {message()}
          </p>
        </div>
      )}

      {/* Botones de acción */}
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        width: '100%',
        marginTop: 'auto'
      }}>
        <Button
          variant="secondary"
          onClick={clearCode}
          disabled={loading() || !code()}
          style={{ flex: '1' }}
        >
          Limpiar
        </Button>
        
        <Button
          variant="primary"
          onClick={handleCheckIn}
          disabled={loading() || !code() || code().length < 4}
          style={{ flex: '2' }}
        >
          {loading() ? (
            <span style={{ display: 'flex', 'align-items': 'center', gap: '0.5rem' }}>
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(255,255,255,0.3)',
                'border-top': '2px solid white',
                'border-radius': '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Verificando...
            </span>
          ) : (
            'Confirmar Check-in'
          )}
        </Button>
      </div>

      {/* Instrucciones adicionales */}
      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        background: 'var(--light-blue)',
        'border-radius': 'var(--radius-sm)',
        textAlign: 'center'
      }}>
        <p style={{
          color: 'var(--primary-blue)',
          fontSize: 'var(--font-size-xs)',
          margin: 0,
          lineHeight: '1.3'
        }}>
          💡 Tu código de confirmación se encuentra en el correo de registro o mensaje de confirmación
        </p>
      </div>
    </Card>
  );
};

export default CheckInCard;