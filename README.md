# SGEV - Sistema de Gestión de Eventos y Visitantes
# Centro Cultural Banreservas

## Frontend (SolidJS + Vite)

### 🚀 Características Principales

- **Interfaz de Kiosco Interactivo**: Diseño moderno y táctil para visitantes
- **Gestión de Eventos**: Visualización y registro en eventos culturales
- **Registro de Visitantes**: Sistema completo de registro con validación
- **Check-in Digital**: Proceso rápido de entrada a eventos
- **Panel Administrativo**: Gestión completa del sistema
- **Diseño Responsivo**: Optimizado para pantallas táctiles y dispositivos móviles

### 📦 Tecnologías Utilizadas

- **SolidJS** v1.8.15 - Framework reactivo moderno
- **Vite** v6.3.5 - Build tool ultrarrápido
- **@solidjs/router** v0.15.3 - Enrutamiento para SolidJS
- **Solid Icons** v1.1.0 - Iconografía moderna

### 🛠️ Scripts Disponibles

- `npm run dev` - Servidor de desarrollo (puerto 3000)
- `npm run build` - Build optimizado para producción
- `npm run preview` - Preview del build de producción
- `npm run serve` - Servidor de preview en puerto 3000

### 🌐 Variables de Entorno

Crea un archivo `.env.local` para desarrollo:

```bash
# URL del backend
VITE_API_URL=http://localhost:5000/api

# Configuraciones de la aplicación
VITE_APP_NAME=SGEV
VITE_APP_VERSION=1.0.0
```

Para producción en Vercel:

```bash
# URL del backend en Render
VITE_API_URL=https://tu-backend.onrender.com/api

# Otras configuraciones
VITE_APP_NAME=SGEV
VITE_APP_VERSION=1.0.0
```

### 🚀 Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/onick/sgev-frontend.git

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── common/          # Componentes reutilizables
│   ├── kiosk/          # Componentes del kiosco
│   ├── events/         # Componentes de eventos
│   └── admin/          # Componentes administrativos
├── layouts/            # Layouts de página
├── pages/              # Páginas principales
│   ├── EventsPage.jsx
│   ├── VisitorRegistrationPage.jsx
│   ├── CheckInPage.jsx
│   └── AdminPage.jsx
├── services/           # Servicios y API calls
├── styles/             # Estilos globales
├── utils/              # Utilidades y helpers
└── App.jsx             # Componente principal
```

### 🎨 Características de UI/UX

- **Diseño Moderno**: Gradientes y efectos visuales atractivos
- **Navegación Intuitiva**: Tarjetas interactivas con feedback visual
- **Accesibilidad**: Diseño pensado para usuarios de todas las edades
- **Animaciones Suaves**: Transiciones fluidas entre estados
- **Responsive Design**: Adaptable a diferentes tamaños de pantalla

### 🔧 Configuración de Despliegue

#### Vercel (Recomendado)

1. Conectar repositorio en Vercel
2. Configurar variables de entorno en el dashboard
3. Deploy automático en cada push a main

#### Variables de entorno en Vercel:
- `VITE_API_URL`: URL del backend
- `VITE_APP_NAME`: SGEV
- `VITE_APP_VERSION`: 1.0.0

### 📱 Funcionalidades Implementadas

#### ✅ Página Principal (Kiosco)
- Interfaz de bienvenida con logo CCB
- Navegación por tarjetas interactivas
- Diseño optimizado para pantallas táctiles

#### ✅ Gestión de Eventos
- Lista de eventos con filtros (Todos, En Curso, Próximos, Finalizados)
- Tarjetas de eventos con información detallada
- Modal de registro a eventos
- Indicadores de capacidad y estado

#### ✅ Registro de Visitantes
- Formulario completo de registro
- Validación de campos en tiempo real
- Interfaz intuitiva y accesible

#### ✅ Check-in Digital
- Proceso rápido de entrada
- Búsqueda de registros
- Confirmación visual

### 🔄 Actualizaciones Recientes

- ✅ Actualizado SolidJS Router a v0.15.3
- ✅ Actualizado Vite a v6.3.5
- ✅ Mejorado diseño de la página principal
- ✅ Optimizada lista de eventos con filtros
- ✅ Corregidas vulnerabilidades de seguridad
- ✅ Mejorada experiencia de usuario en tarjetas interactivas

### 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

**Centro Cultural Banreservas** © 2025 - Sistema de Gestión de Eventos y Visitantes
