// api.js

// Configuración de la API
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'https://sgev-backend.onrender.com/api',
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// Estado de la conexión
let isOnline = navigator.onLine;
window.addEventListener('online', () => { isOnline = true; });
window.addEventListener('offline', () => { isOnline = false; });

// Utilidad para hacer peticiones HTTP
const httpRequest = async (url, options = {}) => {
  const fullUrl = `${API_CONFIG.baseURL}${url}`;
  
  const requestOptions = {
    method: 'GET',
    headers: { ...API_CONFIG.headers },
    ...options
  };

  // Si hay body, convertir a JSON
  if (requestOptions.body && typeof requestOptions.body === 'object') {
    requestOptions.body = JSON.stringify(requestOptions.body);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
    
    const response = await fetch(fullUrl, {
      ...requestOptions,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    // Intentar parsear como JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }

  } catch (error) {
    // Manejar diferentes tipos de errores
    if (error.name === 'AbortError') {
      throw new Error('La petición tardó demasiado tiempo');
    }
    
    if (!isOnline) {
      throw new Error('No hay conexión a Internet');
    }

    throw error;
  }
};

// Métodos HTTP básicos
export const api = {
  // GET request
  get: (url, params = {}) => {
    const searchParams = new URLSearchParams(params);
    const urlWithParams = searchParams.toString() ? `${url}?${searchParams}` : url;
    return httpRequest(urlWithParams);
  },

  // POST request
  post: (url, data = {}) => {
    return httpRequest(url, {
      method: 'POST',
      body: data
    });
  },

  // PUT request
  put: (url, data = {}) => {
    return httpRequest(url, {
      method: 'PUT',
      body: data
    });
  },

  // DELETE request
  delete: (url) => {
    return httpRequest(url, {
      method: 'DELETE'
    });
  },

  // PATCH request
  patch: (url, data = {}) => {
    return httpRequest(url, {
      method: 'PATCH',
      body: data
    });
  }
};

// Funciones de utilidad
export const apiUtils = {
  // Verificar estado de la API
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return { status: 'online', data: response };
    } catch (error) {
      return { status: 'offline', error: error.message };
    }
  },

  // Verificar conexión
  isOnline: () => isOnline,

  // Obtener configuración
  getConfig: () => ({ ...API_CONFIG }),

  // Manejar errores de manera consistente
  handleError: (error) => {
    console.error('API Error:', error);
    
    // Categorizar errores
    if (error.message.includes('conexión') || error.message.includes('Internet')) {
      return {
        type: 'connection',
        message: 'Problema de conexión. Verifica tu Internet.',
        userMessage: 'Sin conexión a Internet'
      };
    }
    
    if (error.message.includes('tiempo')) {
      return {
        type: 'timeout',
        message: 'La petición tardó demasiado.',
        userMessage: 'El servidor está tardando en responder'
      };
    }
    
    if (error.message.includes('404')) {
      return {
        type: 'not_found',
        message: 'Recurso no encontrado.',
        userMessage: 'No se encontró la información solicitada'
      };
    }
    
    if (error.message.includes('401') || error.message.includes('403')) {
      return {
        type: 'auth',
        message: 'No autorizado.',
        userMessage: 'No tienes permisos para esta acción'
      };
    }
    
    return {
      type: 'unknown',
      message: error.message,
      userMessage: 'Ocurrió un error inesperado'
    };
  }
};

// Exportar configuración para otros servicios
export { API_CONFIG };

export default api;