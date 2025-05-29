const AdminPage = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #003366, #0066cc)',
      flexDirection: 'column',
      textAlign: 'center',
      padding: '2rem',
      color: 'white'
    }}>
      <h1>Panel Administrativo</h1>
      <p>Acceso restringido - Página en desarrollo...</p>
      <a href="/" style={{ color: '#d4af37', marginTop: '1rem' }}>
        Volver al inicio
      </a>
    </div>
  );
};

export default AdminPage;