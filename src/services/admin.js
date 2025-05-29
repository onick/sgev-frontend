import { api, apiUtils } from './api.js';

// Servicio de administración
export const adminService = {
  // Autenticación
  login: async (credentials) => {
    try {
      const response = await api.post('/admin/auth/login', credentials);
      
      if (response.token) {
        localStorage.setItem('admin_token', response.token);
        localStorage.setItem('admin_user', JSON.stringify(response.user));
      }
      
      return {
        success: true,
        token: response.token,
        user: response.user
      };
    } catch (error) {
      const handledError = apiUtils.handleError(error);
      
      if (import.meta.env.DEV) {
        // Credenciales de desarrollo
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
          const mockToken = 'mock_admin_token_' + Date.now();
          const mockUser = {
            id: 1,
            username: 'admin',
            name: 'Administrador',
            role: 'admin',
            permissions: ['events', 'visitors', 'stats', 'settings']
          };
          
          localStorage.setItem('admin_token', mockToken);
          localStorage.setItem('admin_user', JSON.stringify(mockUser));
          
          return {
            success: true,
            token: mockToken,
            user: mockUser
          };
        } else {
          throw new Error('Credenciales inválidas');
        }
      }
      
      throw handledError;
    }
  },

  // Cerrar sesión
  logout: async () => {
    try {
      await api.post('/admin/auth/logout');
    } catch (error) {
      console.warn('Error al cerrar sesión en el servidor:', error);
    } finally {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      return { success: true };
    }
  },

  // Verificar token
  verifyToken: async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await api.get('/admin/auth/verify');
      return {
        success: true,
        user: response.user
      };
    } catch (error) {
      if (import.meta.env.DEV) {
        const mockUser = localStorage.getItem('admin_user');
        if (mockUser) {
          return {
            success: true,
            user: JSON.parse(mockUser)
          };
        }
      }
      
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      throw new Error('Token inválido');
    }
  },

  // Gestión de eventos
  events: {
    // Obtener todos los eventos
    getAll: async (filters = {}) => {
      try {
        const response = await api.get('/admin/events', filters);
        return {
          success: true,
          events: response.events || response,
          total: response.total || response.length
        };
      } catch (error) {
        if (import.meta.env.DEV) {
          return {
            success: true,
            events: getMockEvents(),
            total: getMockEvents().length
          };
        }
        throw apiUtils.handleError(error);
      }
    },

    // Crear evento
    create: async (eventData) => {
      try {
        const response = await api.post('/admin/events', eventData);
        return {
          success: true,
          event: response.event || response
        };
      } catch (error) {
        if (import.meta.env.DEV) {
          return {
            success: true,
            event: {
              id: 'evento-' + Date.now(),
              ...eventData,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              status: 'active'
            }
          };
        }
        throw apiUtils.handleError(error);
      }
    },

    // Actualizar evento
    update: async (eventId, eventData) => {
      try {
        const response = await api.put(`/admin/events/${eventId}`, eventData);
        return {
          success: true,
          event: response.event || response
        };
      } catch (error) {
        if (import.meta.env.DEV) {
          return {
            success: true,
            event: {
              id: eventId,
              ...eventData,
              updatedAt: new Date().toISOString()
            }
          };
        }
        throw apiUtils.handleError(error);
      }
    },

    // Eliminar evento
    delete: async (eventId) => {
      try {
        await api.delete(`/admin/events/${eventId}`);
        return { success: true };
      } catch (error) {
        if (import.meta.env.DEV) {
          return { success: true };
        }
        throw apiUtils.handleError(error);
      }
    },

    // Obtener estadísticas de evento
    getStats: async (eventId) => {
      try {
        const response = await api.get(`/admin/events/${eventId}/stats`);
        return {
          success: true,
          stats: response.stats || response
        };
      } catch (error) {
        if (import.meta.env.DEV) {
          return {
            success: true,
            stats: {
              totalRegistered: Math.floor(Math.random() * 100),
              checkedIn: Math.floor(Math.random() * 80),
              pending: Math.floor(Math.random() * 20),
              capacity: 150,
              averageAge: 32,
              genderDistribution: {
                male: 45,
                female: 52,
                other: 3
              }
            }
          };
        }
        throw apiUtils.handleError(error);
      }
    }
  },

  // Gestión de visitantes
  visitors: {
    // Obtener todos los visitantes
    getAll: async (filters = {}) => {
      try {
        const response = await api.get('/admin/visitors', filters);
        return {
          success: true,
          visitors: response.visitors || response,
          total: response.total || response.length
        };
      } catch (error) {
        if (import.meta.env.DEV) {
          return {
            success: true,
            visitors: getMockVisitors(),
            total: getMockVisitors().length
          };
        }
        throw apiUtils.handleError(error);
      }
    },

    // Obtener visitante por ID
    getById: async (visitorId) => {
      try {
        const response = await api.get(`/admin/visitors/${visitorId}`);
        return {
          success: true,
          visitor: response.visitor || response
        };
      } catch (error) {
        if (import.meta.env.DEV) {
          const mockVisitors = getMockVisitors();
          const visitor = mockVisitors.find(v => v.id == visitorId);
          if (visitor) {
            return { success: true, visitor };
          }
        }
        throw apiUtils.handleError(error);
      }
    },

    // Actualizar visitante
    update: async (visitorId, visitorData) => {
      try {
        const response = await api.put(`/admin/visitors/${visitorId}`, visitorData);
        return {
          success: true,
          visitor: response.visitor || response
        };
      } catch (error) {
        if (import.meta.env.DEV) {
          return {
            success: true,
            visitor: {
              id: visitorId,
              ...visitorData,
              updatedAt: new Date().toISOString()
            }
          };
        }
        throw apiUtils.handleError(error);
      }
    },

    // Eliminar visitante
    delete: async (visitorId) => {
      try {
        await api.delete(`/admin/visitors/${visitorId}`);
        return { success: true };
      } catch (error) {
        if (import.meta.env.DEV) {
          return { success: true };
        }
        throw apiUtils.handleError(error);
      }
    }
  },

  // Dashboard y estadísticas
  dashboard: {
    // Obtener resumen general
    getSummary: async () => {
      try {
        const response = await api.get('/admin/dashboard/summary');
        return {
          success: true,
          summary: response.summary || response
        };
      } catch (error) {
        if (import.meta.env.DEV) {
          return {
            success: true,
            summary: {
              totalEvents: Math.floor(Math.random() * 50) + 10,
              activeEvents: Math.floor(Math.random() * 20) + 5,
              totalVisitors: Math.floor(Math.random() * 2000) + 500,
              todayRegistrations: Math.floor(Math.random() * 50),
              todayCheckIns: Math.floor(Math.random() * 40),
              upcomingEvents: Math.floor(Math.random() * 10) + 2,
              popularCategories: [
                { name: 'Música', count: Math.floor(Math.random() * 20) + 5 },
                { name: 'Teatro', count: Math.floor(Math.random() * 15) + 3 },
                { name: 'Danza', count: Math.floor(Math.random() * 10) + 2 },
                { name: 'Conferencias', count: Math.floor(Math.random() * 8) + 1 }
              ]
            }
          };
        }
        throw apiUtils.handleError(error);
      }
    },

    // Obtener estadísticas por período
    getStatsByPeriod: async (period = 'week') => {
      try {
        const response = await api.get(`/admin/dashboard/stats/${period}`);
        return {
          success: true,
          stats: response.stats || response
        };
      } catch (error) {
        if (import.meta.env.DEV) {
          return {
            success: true,
            stats: generateMockStatsByPeriod(period)
          };
        }
        throw apiUtils.handleError(error);
      }
    }
  },

  // Configuración del sistema
  settings: {
    // Obtener configuración
    get: async () => {
      try {
        const response = await api.get('/admin/settings');
        return {
          success: true,
          settings: response.settings || response
        };
      } catch (error) {
        if (import.meta.env.DEV) {
          return {
            success: true,
            settings: {
              siteName: 'Centro Cultural Banreservas',
              maxEventsPerDay: 5,
              defaultEventCapacity: 100,
              allowWalkIns: true,
              requirePhoneValidation: true,
              emailNotifications: true,
              smsNotifications: false,
              kioskTimeout: 300000, // 5 minutos
              language: 'es',
              timezone: 'America/Santo_Domingo'
            }
          };
        }
        throw apiUtils.handleError(error);
      }
    },

    // Actualizar configuración
    update: async (settings) => {
      try {
        const response = await api.put('/admin/settings', settings);
        return {
          success: true,
          settings: response.settings || response
        };
      } catch (error) {
        if (import.meta.env.DEV) {
          return {
            success: true,
            settings: {
              ...settings,
              updatedAt: new Date().toISOString()
            }
          };
        }
        throw apiUtils.handleError(error);
      }
    }
  }
};

// Funciones auxiliares para desarrollo
const getMockEvents = () => [
  {
    id: 'evento-1',
    title: 'Concierto de Piano Clásico',
    description: 'Una velada musical con obras maestras del piano clásico',
    category: 'música',
    date: new Date(Date.now() + 86400000).toISOString(),
    startTime: '19:00',
    endTime: '21:00',
    location: 'Auditorio Principal',
    capacity: 150,
    registered: 85,
    checkedIn: 0,
    status: 'active',
    price: 500,
    createdAt: new Date(Date.now() - 604800000).toISOString()
  },
  {
    id: 'evento-2',
    title: 'Obra de Teatro: Don Juan Tenorio',
    description: 'Clásica obra teatral española',
    category: 'teatro',
    date: new Date(Date.now() + 172800000).toISOString(),
    startTime: '20:00',
    endTime: '22:30',
    location: 'Teatro Principal',
    capacity: 200,
    registered: 156,
    checkedIn: 0,
    status: 'active',
    price: 800,
    createdAt: new Date(Date.now() - 518400000).toISOString()
  }
];

const getMockVisitors = () => [
  {
    id: 1,
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '809-987-6543',
    age: 28,
    gender: 'female',
    registeredEvents: ['evento-1'],
    registrationDate: new Date(Date.now() - 86400000).toISOString(),
    lastCheckIn: null,
    confirmationCode: 'ABC123XY'
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@email.com',
    phone: '809-555-1234',
    age: 42,
    gender: 'male',
    registeredEvents: ['evento-1', 'evento-2'],
    registrationDate: new Date(Date.now() - 172800000).toISOString(),
    lastCheckIn: new Date(Date.now() - 3600000).toISOString(),
    confirmationCode: 'DEF456ZW'
  }
];

const generateMockStatsByPeriod = (period) => {
  const baseData = {
    registrations: [],
    checkIns: [],
    events: []
  };

  const days = period === 'week' ? 7 : period === 'month' ? 30 : 365;
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(Date.now() - (i * 86400000)).toISOString().split('T')[0];
    baseData.registrations.push({
      date,
      count: Math.floor(Math.random() * 20) + 5
    });
    baseData.checkIns.push({
      date,
      count: Math.floor(Math.random() * 15) + 2
    });
    baseData.events.push({
      date,
      count: Math.floor(Math.random() * 3)
    });
  }

  return baseData;
};

// Utilidades de administración
export const adminUtils = {
  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('admin_token');
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const userStr = localStorage.getItem('admin_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Verificar permisos
  hasPermission: (permission) => {
    const user = adminUtils.getCurrentUser();
    return user && user.permissions && user.permissions.includes(permission);
  },

  // Formatear fecha para admin
  formatAdminDate: (date) => {
    return new Intl.DateTimeFormat('es-DO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  },

  // Generar reporte en CSV
  generateCSV: (data, filename) => {
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => row[header] || '').join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Calcular ocupación
  calculateOccupancy: (registered, capacity) => {
    if (!capacity || capacity === 0) return 0;
    return Math.round((registered / capacity) * 100);
  },

  // Determinar estado del evento
  getEventStatus: (event) => {
    const now = new Date();
    const eventDate = new Date(event.date);
    
    if (eventDate < now) {
      return 'pasado';
    } else if (eventDate.toDateString() === now.toDateString()) {
      return 'hoy';
    } else {
      return 'próximo';
    }
  }
};

export default adminService; 