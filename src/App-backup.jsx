// Versión simplificada para debug
import { Router, Route, Routes } from '@solidjs/router';

// Componente de carga
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'var(--light-gray)',
    flexDirection: 'column',
    gap: 'var(--spacing-md)'
  }}>
    <div class="loading" style={{
      width: '60px',
      height: '60px',
      border: '4px solid var(--primary-blue)',
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <p style={{
      color: 'var(--primary-blue)',
      fontSize: 'var(--font-size-lg)',
      fontWeight: '500'
    }}>
      Cargando Centro Cultural Banreservas...
    </p>
  </div>
);

// Página 404
const NotFound = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'var(--light-gray)',
    flexDirection: 'column',
    textAlign: 'center',
    padding: 'var(--spacing-xl)'
  }}>
    <h1 style={{
      fontSize: '6rem',
      color: 'var(--primary-blue)',
      margin: 0,
      fontWeight: '300'
    }}>404</h1>
    <h2 style={{
      color: 'var(--primary-blue)',
      marginBottom: 'var(--spacing-md)',
      fontWeight: '400'
    }}>Página no encontrada</h2>
    <p style={{
      color: 'var(--medium-gray)',
      marginBottom: 'var(--spacing-lg)',
      maxWidth: '400px'
    }}>
      Lo sentimos, la página que buscas no existe o ha sido movida.
    </p>
    <a 
      href="/" 
      class="btn btn-primary"
      style={{ textDecoration: 'none' }}
    >
      Volver al inicio
    </a>
  </div>
);

// Placeholder para páginas en desarrollo
const ComingSoon = (props) => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, var(--primary-blue), var(--secondary-blue))',
    flexDirection: 'column',
    textAlign: 'center',
    padding: 'var(--spacing-xl)',
    color: 'var(--white)'
  }}>
    <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}>
      🚧
    </div>
    <h1 style={{
      fontSize: 'var(--font-size-3xl)',
      marginBottom: 'var(--spacing-sm)',
      fontWeight: '300'
    }}>
      {props.title || 'En Desarrollo'}
    </h1>
    <p style={{
      fontSize: 'var(--font-size-lg)',
      marginBottom: 'var(--spacing-lg)',
      opacity: 0.9,
      maxWidth: '500px'
    }}>
      {props.description || 'Esta funcionalidad estará disponible próximamente.'}
    </p>
    <a 
      href="/" 
      class="btn btn-secondary"
      style={{ 
        textDecoration: 'none',
        background: 'var(--white)',
        color: 'var(--primary-blue)'
      }}
    >
      Volver al Kiosco
    </a>
  </div>
);

// Componente de prueba simple
const TestComponent = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f5f5f5',
      flexDirection: 'column'
    }}>
      <h1 style={{ color: '#003366', fontSize: '2rem' }}>
        ¡Centro Cultural Banreservas!
      </h1>
      <p style={{ color: '#666', fontSize: '1.2rem' }}>
        Aplicación funcionando correctamente
      </p>
      <button 
        style={{
          padding: '12px 24px',
          background: '#003366',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          cursor: 'pointer',
          marginTop: '20px'
        }}
        onClick={() => alert('¡Botón funcionando!')}
      >
        Probar interacción
      </button>
    </div>
  );
};

function App() {
  return <TestComponent />;
        
        <Route 
          path="/registro" 
          component={VisitorRegistrationPage}
          fallback={<LoadingSpinner />}
        />

        {/* Rutas administrativas */}
        <Route 
          path="/admin/*" 
          component={() => (
            <ComingSoon 
              title="Panel Administrativo"
              description="Área restringida para la gestión del sistema."
            />
          )}
        />
        
        {/* Ruta 404 */}
        <Route path="*" component={NotFound} />
      </Routes>
    </Router>
  );
}

export default App;