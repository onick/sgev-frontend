// helpers.js

// Utilidades de fecha y hora
export const dateUtils = {
  // Formatear fecha completa
  formatFullDate: (date, locale = 'es-DO') => {
    return new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  },

  // Formatear fecha corta
  formatShortDate: (date, locale = 'es-DO') => {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  },

  // Formatear solo la hora
  formatTime: (date, locale = 'es-DO') => {
    return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(new Date(date));
  },

  // Formatear duración en minutos a horas y minutos
  formatDuration: (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
  },

  // Verificar si una fecha es hoy
  isToday: (date) => {
    const today = new Date();
    const checkDate = new Date(date);
    return checkDate.toDateString() === today.toDateString();
  },

  // Verificar si una fecha es mañana
  isTomorrow: (date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const checkDate = new Date(date);
    return checkDate.toDateString() === tomorrow.toDateString();
  },

  // Obtener días hasta una fecha
  getDaysUntil: (date) => {
    const today = new Date();
    const targetDate = new Date(date);
    const diffTime = targetDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },

  // Verificar si una fecha ya pasó
  isPast: (date) => {
    return new Date(date) < new Date();
  },

  // Obtener el nombre del día de la semana
  getDayName: (date, locale = 'es-DO') => {
    return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(new Date(date));
  },

  // Convertir string de tiempo (HH:MM) a minutos desde medianoche
  timeToMinutes: (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  },

  // Convertir minutos a string de tiempo (HH:MM)
  minutesToTime: (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }
};

// Utilidades de formato de datos
export const formatUtils = {
  // Formatear números con separadores de miles
  formatNumber: (number, locale = 'es-DO') => {
    return new Intl.NumberFormat(locale).format(number);
  },

  // Formatear moneda
  formatCurrency: (amount, currency = 'DOP', locale = 'es-DO') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  },

  // Formatear porcentaje
  formatPercentage: (value, decimals = 1) => {
    return `${value.toFixed(decimals)}%`;
  },

  // Capitalizar primera letra
  capitalize: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  },

  // Capitalizar cada palabra
  capitalizeWords: (string) => {
    return string.split(' ')
      .map(word => formatUtils.capitalize(word))
      .join(' ');
  },

  // Truncar texto con elipsis
  truncate: (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + '...';
  },

  // Limpiar y formatear teléfono
  formatPhone: (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10 && cleaned.startsWith('8')) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  },

  // Formatear código de confirmación
  formatConfirmationCode: (code) => {
    return code.toUpperCase().replace(/(.{4})/g, '$1 ').trim();
  }
};

// Utilidades de validación
export const validationUtils = {
  // Validar email
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validar teléfono dominicano
  isValidDominicanPhone: (phone) => {
    const phoneRegex = /^(\+1-?)?8(09|29|49)-?\d{3}-?\d{4}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  },

  // Validar edad
  isValidAge: (age) => {
    const numAge = parseInt(age);
    return !isNaN(numAge) && numAge >= 5 && numAge <= 120;
  },

  // Validar código de confirmación
  isValidConfirmationCode: (code) => {
    const codeRegex = /^[A-Z0-9]{4,8}$/;
    return codeRegex.test(code.toUpperCase());
  },

  // Validar que un string no esté vacío
  isNotEmpty: (str) => {
    return str && str.trim().length > 0;
  },

  // Validar nombre (solo letras y espacios)
  isValidName: (name) => {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return nameRegex.test(name) && name.trim().length >= 2;
  },

  // Validar capacidad de evento
  isValidCapacity: (capacity) => {
    const num = parseInt(capacity);
    return !isNaN(num) && num > 0 && num <= 10000;
  },

  // Validar precio
  isValidPrice: (price) => {
    const num = parseFloat(price);
    return !isNaN(num) && num >= 0;
  }
};

// Utilidades de almacenamiento local
export const storageUtils = {
  // Guardar en localStorage con manejo de errores
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error guardando en localStorage:', error);
      return false;
    }
  },

  // Obtener de localStorage con manejo de errores
  getItem: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error leyendo de localStorage:', error);
      return defaultValue;
    }
  },

  // Eliminar de localStorage
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error eliminando de localStorage:', error);
      return false;
    }
  },

  // Limpiar todo el localStorage
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error limpiando localStorage:', error);
      return false;
    }
  }
};

// Utilidades de UI
export const uiUtils = {
  // Scroll suave a un elemento
  scrollToElement: (elementId, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  },

  // Copiar texto al portapapeles
  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // Fallback para navegadores sin soporte
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
      } catch (fallbackError) {
        console.error('Error copiando al portapapeles:', fallbackError);
        return false;
      }
    }
  },

  // Generar ID único simple
  generateId: () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  // Debounce para funciones
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle para funciones
  throttle: (func, limit) => {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  },

  // Detectar si es dispositivo móvil
  isMobileDevice: () => {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  // Detectar si es modo tactil
  isTouchDevice: () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  }
};

// Utilidades de arrays y objetos
export const dataUtils = {
  // Agrupar array por propiedad
  groupBy: (array, key) => {
    return array.reduce((result, item) => {
      const group = item[key];
      if (!result[group]) {
        result[group] = [];
      }
      result[group].push(item);
      return result;
    }, {});
  },

  // Ordenar array por propiedad
  sortBy: (array, key, direction = 'asc') => {
    return [...array].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      
      if (direction === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });
  },

  // Filtrar array por múltiples criterios
  filterBy: (array, filters) => {
    return array.filter(item => {
      return Object.keys(filters).every(key => {
        const filterValue = filters[key];
        const itemValue = item[key];
        
        if (filterValue === null || filterValue === undefined || filterValue === '') {
          return true;
        }
        
        if (typeof filterValue === 'string') {
          return itemValue && itemValue.toString().toLowerCase().includes(filterValue.toLowerCase());
        }
        
        return itemValue === filterValue;
      });
    });
  },

  // Buscar en array por texto
  searchInArray: (array, searchTerm, searchKeys) => {
    if (!searchTerm) return array;
    
    const term = searchTerm.toLowerCase();
    
    return array.filter(item => {
      return searchKeys.some(key => {
        const value = item[key];
        return value && value.toString().toLowerCase().includes(term);
      });
    });
  },

  // Obtener valores únicos de una propiedad
  getUniqueValues: (array, key) => {
    return [...new Set(array.map(item => item[key]))].filter(Boolean);
  },

  // Clonar objeto profundamente
  deepClone: (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => dataUtils.deepClone(item));
    if (typeof obj === 'object') {
      const cloned = {};
      Object.keys(obj).forEach(key => {
        cloned[key] = dataUtils.deepClone(obj[key]);
      });
      return cloned;
    }
  }
};

// Utilidades de colores para categorías
export const colorUtils = {
  // Colores predefinidos para categorías
  categoryColors: {
    'música': '#e74c3c',
    'teatro': '#9b59b6',
    'danza': '#3498db',
    'conferencia': '#f39c12',
    'exposición': '#27ae60',
    'taller': '#e67e22',
    'infantil': '#ff6b9d',
    'default': '#95a5a6'
  },

  // Obtener color para categoría
  getCategoryColor: (category) => {
    return colorUtils.categoryColors[category?.toLowerCase()] || colorUtils.categoryColors.default;
  },

  // Generar color aleatorio en formato hexadecimal
  randomColor: () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  },

  // Convertir hex a rgba
  hexToRgba: (hex, alpha = 1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },

  // Determinar si un color es claro u oscuro
  isLightColor: (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  }
};

// Utilidades de errores
export const errorUtils = {
  // Manejar errores de API
  handleApiError: (error) => {
    if (error.response) {
      // Error del servidor
      const status = error.response.status;
      const message = error.response.data?.message || error.message;
      
      switch (status) {
        case 400:
          return 'Datos inválidos enviados al servidor';
        case 401:
          return 'No autorizado. Verifique sus credenciales';
        case 403:
          return 'No tiene permisos para realizar esta acción';
        case 404:
          return 'Recurso no encontrado';
        case 500:
          return 'Error interno del servidor';
        default:
          return message || 'Error desconocido';
      }
    } else if (error.request) {
      // Error de red
      return 'Error de conexión. Verifique su conexión a internet';
    } else {
      // Error general
      return error.message || 'Error desconocido';
    }
  },

  // Crear mensaje de error amigable
  createFriendlyError: (error, context = '') => {
    const friendlyMessage = errorUtils.handleApiError(error);
    return {
      message: friendlyMessage,
      context,
      originalError: error,
      timestamp: new Date().toISOString()
    };
  },

  // Log de errores en desarrollo
  logError: (error, context = '') => {
    if (import.meta.env.DEV) {
      console.group(`🔴 Error ${context ? `en ${context}` : ''}`);
      console.error('Error:', error);
      console.error('Stack:', error.stack);
      console.groupEnd();
    }
  }
};

// Función para exportar todas las utilidades
export const helpers = {
  date: dateUtils,
  format: formatUtils,
  validation: validationUtils,
  storage: storageUtils,
  ui: uiUtils,
  data: dataUtils,
  color: colorUtils,
  error: errorUtils
};

export default helpers;