import Button from './Button.jsx';

const Card = (props) => {
  return (
    <div 
      class={`card ${props.class || ''}`}
      style={{
        'background-color': 'white',
        'border-radius': '16px',
        padding: '2rem',
        'box-shadow': '0 4px 12px rgba(0, 51, 102, 0.1)',
        'text-align': 'center',
        transition: 'all 0.3s ease',
        cursor: props.onClick || props.action ? 'pointer' : 'default',
        border: '1px solid #f0f0f0',
        'min-height': '200px',
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
        'align-items': 'center',
        width: '100%',
        'max-width': '280px',
        ...props.style
      }}
      onClick={props.onClick || props.action}
      onMouseEnter={(e) => {
        if (props.onClick || props.action) {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 51, 102, 0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (props.onClick || props.action) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 51, 102, 0.1)';
        }
      }}
    >
      {/* Renderizar icon si existe */}
      {props.icon && (
        <div style={{
          fontSize: '3rem',
          marginBottom: '1rem'
        }}>
          {props.icon}
        </div>
      )}
      
      {/* Renderizar title si existe */}
      {props.title && (
        <h3 style={{
          color: 'var(--primary-blue)',
          marginBottom: '0.5rem',
          fontSize: 'var(--font-size-xl)',
          fontWeight: '600'
        }}>
          {props.title}
        </h3>
      )}
      
      {/* Renderizar description si existe */}
      {props.description && (
        <p style={{
          color: 'var(--medium-gray)',
          marginBottom: '1.5rem',
          fontSize: 'var(--font-size-base)',
          lineHeight: '1.5'
        }}>
          {props.description}
        </p>
      )}
      
      {/* Renderizar botón si existe buttonText */}
      {props.buttonText && (
        <Button 
          variant="primary" 
          onClick={props.action || props.onClick}
          style={{ marginTop: 'auto' }}
        >
          {props.buttonText}
        </Button>
      )}
      
      {/* Renderizar children si no hay props específicas */}
      {!props.title && !props.description && !props.icon && !props.buttonText && props.children}
    </div>
  );
};

export default Card;