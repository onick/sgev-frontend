const KioskLayout = (props) => {
  return (
    <div 
      class="kiosk-layout"
      style={{
        'min-height': '100vh',
        'background-color': '#f5f5f5',
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
        'align-items': 'center',
        padding: '2rem',
        'font-family': 'var(--font-family)'
      }}
    >
      <div 
        class="kiosk-container"
        style={{
          'background-color': 'white',
          'border-radius': '24px',
          padding: '3rem',
          'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.1)',
          'max-width': '900px',
          width: '100%',
          'text-align': 'center'
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default KioskLayout;