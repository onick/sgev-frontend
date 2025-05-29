const Button = (props) => {
  const baseStyle = {
    display: 'inline-flex',
    'align-items': 'center',
    'justify-content': 'center',
    padding: '1rem 2rem',
    border: 'none',
    'border-radius': '12px',
    'font-family': 'inherit',
    'font-size': '1rem',
    'font-weight': '500',
    'text-decoration': 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    'user-select': 'none',
    'white-space': 'nowrap',
    'min-height': '48px',
    ...props.style
  };

  const getVariantStyle = () => {
    switch (props.variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #003366, #0066cc)',
          color: 'white',
          'box-shadow': '0 4px 12px rgba(0, 51, 102, 0.3)'
        };
      case 'secondary':
        return {
          background: 'white',
          color: '#003366',
          border: '2px solid #003366'
        };
      case 'accent':
        return {
          background: 'linear-gradient(135deg, #d4af37, #b8941f)',
          color: 'white'
        };
      default:
        return {
          background: '#f8f9fa',
          color: '#333333',
          border: '1px solid #e9ecef'
        };
    }
  };

  return (
    <button 
      class={`btn ${props.class || ''}`}
      style={{ ...baseStyle, ...getVariantStyle() }}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type || 'button'}
      onMouseEnter={(e) => {
        if (!props.disabled) {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 8px 24px rgba(0, 51, 102, 0.4)';
        }
      }}
      onMouseLeave={(e) => {
        if (!props.disabled) {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = getVariantStyle().boxShadow || '0 4px 12px rgba(0, 51, 102, 0.3)';
        }
      }}
    >
      {props.children}
    </button>
  );
};

export default Button;