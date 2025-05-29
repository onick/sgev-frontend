// events.js
import { api, apiUtils } from './api.js';

// Servicio de eventos
export const eventsService = {
  // Obtener todos los eventos
  getEvents: async (filters = {}) => {
    try {
      const params = {
        status: filters.status || 'active',
        category: filters.category || '',
        date_from: filters.dateFrom || '',
        date_to: filters.dateTo || '',
        limit: filters.limit || 50,
        offset: filters.offset || 0
      };
      
      const response = await api.get('/events', params);
      return {
        success: true,
        events: response.events || response || [],
        pagination: response.pagination || null
      };
    } catch (error) {
      const handledError = apiUtils.handleError(error);
      
      // En caso de error, devolver eventos de ejemplo para desarrollo
      if (import.meta.env.DEV) {
        console.warn('API no disponible, usando datos de ejemplo');
        return {
          success: false,
          error: handledError,
          events: getExampleEvents()
        };
      }
      
      throw handledError;
    }
  },

  // Obtener un evento específico
  getEvent: async (eventId) => {
    try {
      const response = await api.get(`/events/${eventId}`);
      return {
        success: true,
        event: response.event || response
      };
    } catch (error) {
      const handledError = apiUtils.handleError(error);
      
      if (import.meta.env.DEV) {
        // Buscar en eventos de ejemplo
        const exampleEvent = getExampleEvents().find(e => e.id === eventId);
        if (exampleEvent) {
          return { success: true, event: exampleEvent };
        }
      }
      
      throw handledError;
    }
  },

  // Registrar visitante en evento
  registerVisitor: async (eventId, visitorData) => {
    try {
      const response = await api.post(`/events/${eventId}/register`, visitorData);
      return {
        success: true,
        registration: response.registration || response,
        confirmationCode: response.confirmationCode || response.code
      };
    } catch (error) {
      const handledError = apiUtils.handleError(error);
      
      if (import.meta.env.DEV) {
        // Simular registro exitoso en desarrollo
        return {
          success: true,
          registration: {
            id: Date.now(),
            eventId,
            visitor: visitorData,
            registeredAt: new Date().toISOString(),
            status: 'confirmed'
          },
          confirmationCode: generateMockCode()
        };
      }
      
      throw handledError;
    }
  },

  // Obtener estadísticas de evento
  getEventStats: async (eventId) => {
    try {
      const response = await api.get(`/events/${eventId}/stats`);
      return {
        success: true,
        stats: response.stats || response
      };
    } catch (error) {
      const handledError = apiUtils.handleError(error);
      
      if (import.meta.env.DEV) {
        return {
          success: true,
          stats: {
            totalRegistrations: Math.floor(Math.random() * 100),
            confirmedAttendance: Math.floor(Math.random() * 80),
            availableSpots: Math.floor(Math.random() * 50),
            checkInRate: Math.random() * 100
          }
        };
      }
      
      throw handledError;
    }
  },

  // Verificar disponibilidad
  checkAvailability: async (eventId) => {
    try {
      const response = await api.get(`/events/${eventId}/availability`);
      return {
        success: true,
        available: response.available || false,
        spotsLeft: response.spotsLeft || 0
      };
    } catch (error) {
      const handledError = apiUtils.handleError(error);
      
      if (import.meta.env.DEV) {
        return {
          success: true,
          available: true,
          spotsLeft: Math.floor(Math.random() * 50)
        };
      }
      
      throw handledError;
    }
  }
};

// Datos de ejemplo para desarrollo
const getExampleEvents = () => [
  {
    id: 'evento-1',
    title: 'Concierto de Piano Clásico',
    description: 'Una velada musical especial con obras de los grandes maestros del piano clásico.',
    type: 'musica',
    category: 'Música',
    date: new Date(Date.now() + 86400000 * 7).toISOString(), // +1 semana
    location: 'Auditorio Principal',
    capacity: 200,
    availableSpots: 45,
    price: 0,
    status: 'active',
    image: '/images/piano-concert.jpg',
    duration: 120, // minutos
    organizer: 'Centro Cultural Banreservas'
  },
  {
    id: 'evento-2',
    title: 'Exposición de Arte Contemporáneo',
    description: 'Muestra colectiva de artistas dominicanos contemporáneos con obras inéditas.',
    type: 'arte',
    category: 'Arte',
    date: new Date(Date.now() + 86400000 * 3).toISOString(), // +3 días
    location: 'Galería Principal',
    capacity: 100,
    availableSpots: 20,
    price: 0,
    status: 'active',
    image: '/images/art-exhibition.jpg',
    duration: 180,
    organizer: 'Centro Cultural Banreservas'
  },
  {
    id: 'evento-3',
    title: 'Taller de Escritura Creativa',
    description: 'Aprende técnicas de escritura creativa con autores reconocidos.',
    type: 'taller',
    category: 'Literatura',
    date: new Date(Date.now() + 86400000 * 10).toISOString(), // +10 días
    location: 'Aula 1',
    capacity: 25,
    availableSpots: 8,
    price: 500,
    status: 'active',
    image: '/images/writing-workshop.jpg',
    duration: 240,
    organizer: 'Centro Cultural Banreservas'
  },
  {
    id: 'evento-4',
    title: 'Festival de Danza Folclórica',
    description: 'Celebración de nuestras tradiciones dancísticas con grupos locales.',
    type: 'danza',
    category: 'Danza',
    date: new Date(Date.now() + 86400000 * 14).toISOString(), // +2 semanas
    location: 'Teatro al Aire Libre',
    capacity: 300,
    availableSpots: 150,
    price: 0,
    status: 'active',
    image: '/images/folk-dance.jpg',
    duration: 90,
    organizer: 'Centro Cultural Banreservas'
  },
  {
    id: 'evento-5',
    title: 'Conferencia: Historia del Arte Dominicano',
    description: 'Un recorrido por la evolución del arte en República Dominicana.',
    type: 'conferencia',
    category: 'Educación',
    date: new Date(Date.now() + 86400000 * 21).toISOString(), // +3 semanas
    location: 'Auditorio Secundario',
    capacity: 150,
    availableSpots: 75,
    price: 0,
    status: 'active',
    image: '/images/art-conference.jpg',
    duration: 90,
    organizer: 'Centro Cultural Banreservas'
  }
];

// Generar código de confirmación de ejemplo
const generateMockCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Utilidades específicas de eventos
export const eventUtils = {
  // Formatear fecha de evento
  formatEventDate: (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('es-DO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('es-DO', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      dayOfWeek: date.toLocaleDateString('es-DO', {
        weekday: 'long'
      }),
      full: date.toLocaleDateString('es-DO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  },

  // Verificar si un evento está próximo a comenzar
  isEventSoon: (dateString, minutesBefore = 30) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffMinutes = (eventDate - now) / (1000 * 60);
    return diffMinutes > 0 && diffMinutes <= minutesBefore;
  },

  // Verificar si un evento ya pasó
  isEventPast: (dateString) => {
    return new Date(dateString) < new Date();
  },

  // Calcular duración en formato legible
  formatDuration: (minutes) => {
    if (minutes < 60) {
      return `${minutes} minutos`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    }
    return `${hours}h ${remainingMinutes}m`;
  },

  // Obtener color por categoría
  getCategoryColor: (category) => {
    const colors = {
      'Música': '#9c27b0',
      'Arte': '#ff9800',
      'Literatura': '#4caf50',
      'Danza': '#e91e63',
      'Educación': '#2196f3',
      'Teatro': '#795548',
      'Cine': '#607d8b'
    };
    return colors[category] || '#666666';
  }
};

export default eventsService;