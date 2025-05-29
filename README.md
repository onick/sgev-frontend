# SGEV - Sistema de Gestión de Eventos y Visitantes
# Centro Cultural Banreservas

## Frontend (SolidJS + Vite)

### Variables de Entorno para Producción

```bash
# URL del backend en Render
VITE_API_URL=https://tu-backend.onrender.com/api

# Otras configuraciones
VITE_APP_NAME=SGEV
VITE_APP_VERSION=1.0.0
```

### Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Preview del build

### Despliegue en Vercel

1. Conectar repositorio en Vercel
2. Configurar variables de entorno
3. Deploy automático

### Estructura del Proyecto

```
src/
├── components/
│   ├── common/
│   └── kiosk/
├── layouts/
├── pages/
├── styles/
└── App.jsx
```
