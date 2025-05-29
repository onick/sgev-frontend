const Logo = () => {
  // Estilo del contenedor del logo como en la imagen de referencia
  const logoContainerStyle = {
    width: '100px', // Ajustado para el nuevo diseño
    height: '100px',
    borderRadius: '50%',
    backgroundColor: 'var(--black, #000000)', // Negro
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)', // Sombra sutil
    margin: '0 auto var(--spacing-xl) auto' // Centrado y con margen inferior
  };

  // Estilo del SVG del logo
  const svgStyle = {
    width: '50%', // Tamaño del ícono SVG dentro del círculo
    height: '50%'
  };

  return (
    <div style={logoContainerStyle}>
      <svg 
        style={svgStyle} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simulación del logo de la imagen de referencia */} 
        <path 
          d="M50 15C36.1929 15 25 26.1929 25 40V85H35V40C35 31.7157 41.7157 25 50 25C58.2843 25 65 31.7157 65 40V85H75V40C75 26.1929 63.8071 15 50 15Z" 
          fill="var(--white, #FFFFFF)" // Icono blanco
        />
        <path 
          d="M50 35C44.4772 35 40 39.4772 40 45V85H50V45H50ZM60 45V85H50V45C50 39.4772 55.5228 35 60 35Z" 
          fill="var(--white, #FFFFFF)" 
        />
         <path 
          d="M50 10C22.3858 10 0 32.3858 0 60V90H100V60C100 32.3858 77.6142 10 50 10ZM90 80H10V60C10 37.9086 27.9086 20 50 20C72.0914 20 90 37.9086 90 60V80Z"
          fill="var(--white, #FFFFFF)"
          transform="scale(1)" 
        />
      </svg>
    </div>
  );
};

export default Logo;