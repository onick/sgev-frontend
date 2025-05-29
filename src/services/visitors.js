// visitors.js
import { api, apiUtils } from './api.js';

// Servicio de visitantes
export const visitorsService = {
  // Realizar check-in con código
  checkIn: async (confirmationCode) => {
    try {
      const response = await api.post('/visitors/checkin', {
        confirmationCode: confirmationCode.toUpperCase()
      });
      
      return {
        success: true,
        visitor: response.visitor || response,
        event: response.event,
        checkInTime: response.checkInTime || new Date().toISOString()
      };
    } catch (error) {
      const handledError = apiUtils.handleError(error);
      
      if (import.meta.env.DEV) {
        // Simular check-in en desarrollo
        const mockResult = simulateCheckIn(confirmationCode);
        if (mockResult.success) {
          return mockResult;
        } else {
          throw new Error(mockResult.error);
        }
      }
      
      throw handledError;
    }
  },

  // Registrar nuevo visitante
  register: async (visitorData, eventId) => {
    try {
      const response = await api.post('/visitors/register', {
        ...visitorData,
        eventId
      });
      
      return {
        success: true,
        visitor: response.visitor || response,
        confirmationCode: response.confirmationCode || response.code,
        registration: response.registration
      };
    } catch (error) {
      const handledError = apiUtils.handleError(error);
      
      if (import.meta.env.DEV) {
        // Simular registro en desarrollo
        return {
          success: true,
          visitor: {
            id: Date.now(),
            ...visitorData,
            registeredAt: new Date().toISOString()
          },
          confirmationCode: generateConfirmationCode(),
          registration: {
            eventId,
            status: 'confirmed',
            registeredAt: new Date().toISOString()
          }
        };
      }
      
      throw handledError;
    }
  },

  // Obtener información de visitante por código
  getVisitorByCode: async (confirmationCode) => {
    try {
      const response = await api.get(`/visitors/code/${confirmationCode.toUpperCase()}`);
      return {
        success: true,
        visitor: response.visitor || response,
        registration: response.registration
      };
    } catch (error) {
      const handledError = apiUtils.handleError(error);
      
      if (import.meta.env.DEV) {
        const mockVisitor = getMockVisitorByCode(confirmationCode);
        if (mockVisitor) {
          return { success: true, visitor: mockVisitor };
        }
      }
      
      throw handledError;
    }
  },

  // Obtener estadísticas de visitantes
  getVisitorStats: async (filters = {}) => {
    try {
      const response = await api.get('/visitors/stats', filters);
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
            totalVisitors: Math.floor(Math.random() * 1000),
            todayVisitors: Math.floor(Math.random() * 50),
            checkedInToday: Math.floor(Math.random() * 40),
            averageAge: Math.floor(Math.random() * 30) + 25,
            genderDistribution: {
              male: Math.floor(Math.random() * 50),
              female: Math.floor(Math.random() * 50),
              other: Math.floor(Math.random() * 5)
            }
          }
        };
      }
      
      throw handledError;
    }
  },

  // Validar código de confirmación
  validateCode: async (confirmationCode) => {
    try {
      const response = await api.get(`/visitors/validate/${confirmationCode.toUpperCase()}`);
      return {
        success: true,
        valid: response.valid || false,
        visitor: response.visitor,
        event: response.event
      };
    } catch (error) {
      const handledError = apiUtils.handleError(error);
      
      if (import.meta.env.DEV) {
        // Validación simple en desarrollo
        const isValid = isValidMockCode(confirmationCode);
        return {
          success: true,
          valid: isValid,
          visitor: isValid ? getMockVisitorByCode(confirmationCode) : null
        };
      }
      
      throw handledError;
    }
  }
};

// Simulación de check-in para desarrollo
const simulateCheckIn = (code) => {
  const validCodes = ['ABC123XY', 'DEF456ZW', 'GHI789UV', 'TEST1234'];
  
  if (!validCodes.includes(code.toUpperCase())) {
    return {
      success: false,
      error: 'Código de confirmación no válido'
    };
  }

  return {
    success: true,
    visitor: {
      id: Date.now(),
      name: 'Juan Pérez',
      email: 'juan.perez@email.com',
      phone: '809-123-4567',
      age: 35,
      gender: 'male',
      registeredAt: new Date(Date.now() - 86400000).toISOString() // Hace 1 día
    },
    event: {
      id: 'evento-1',
      title: 'Concierto de Piano Clásico',
      date: new Date().toISOString(),
      location: 'Auditorio Principal'
    },
    checkInTime: new Date().toISOString()
  };
};

// Generar código de confirmación
const generateConfirmationCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Obtener visitante mock por código
const getMockVisitorByCode = (code) => {
  const mockVisitors = {
    'ABC123XY': {
      id: 1,
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      phone: '809-987-6543',
      age: 28,
      gender: 'female'
    },
    'DEF456ZW': {
      id: 2,
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      phone: '809-555-1234',
      age: 42,
      gender: 'male'
    },
    'TEST1234': {
      id: 3,
      name: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      phone: '809-777-8888',
      age: 31,
      gender: 'female'
    }
  };
  
  return mockVisitors[code.toUpperCase()] || null;
};

// Validar código mock
const isValidMockCode = (code) => {
  const validCodes = ['ABC123XY', 'DEF456ZW', 'GHI789UV', 'TEST1234'];
  return validCodes.includes(code.toUpperCase());
};

// Utilidades para visitantes
export const visitorUtils = {
  // Validar formato de email
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validar teléfono dominicano
  validateDominicanPhone: (phone) => {
    const phoneRegex = /^(\+1-?)?8(09|29|49)-?\d{3}-?\d{4}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  },

  // Formatear teléfono
  formatPhone: (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10 && cleaned.startsWith('8')) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  },

  // Validar edad
  validateAge: (age) => {
    const numAge = parseInt(age);
    return numAge >= 5 && numAge <= 120;
  },

  // Generar código QR para código de confirmación
  generateQRCodeUrl: (confirmationCode) => {
    const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';
    const params = new URLSearchParams({
      size: '200x200',
      data: confirmationCode,
      bgcolor: 'FFFFFF',
      color: '003366'
    });
    return `${baseUrl}?${params}`;
  },

  // Formatear nombre
  formatName: (name) => {
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },

  // Validar código de confirmación formato
  validateCodeFormat: (code) => {
    const codeRegex = /^[A-Z0-9]{4,8}$/;
    return codeRegex.test(code.toUpperCase());
  },

  // Calcular estadísticas de edad
  calculateAgeStats: (visitors) => {
    if (!visitors || visitors.length === 0) {
      return { average: 0, min: 0, max: 0 };
    }

    const ages = visitors.map(v => v.age).filter(age => age && age > 0);
    if (ages.length === 0) {
      return { average: 0, min: 0, max: 0 };
    }

    return {
      average: Math.round(ages.reduce((sum, age) => sum + age, 0) / ages.length),
      min: Math.min(...ages),
      max: Math.max(...ages)
    };
  },

  // Agrupar visitantes por género
  groupByGender: (visitors) => {
    const groups = { male: 0, female: 0, other: 0 };
    
    visitors.forEach(visitor => {
      const gender = visitor.gender || 'other';
      if (groups.hasOwnProperty(gender)) {
        groups[gender]++;
      } else {
        groups.other++;
      }
    });

    return groups;
  }
};

export default visitorsService;