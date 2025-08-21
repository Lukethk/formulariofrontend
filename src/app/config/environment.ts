export const environment = {
  production: false,
  
  // Detectar automáticamente la URL base según el entorno
  apiUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'https://formulario-backend-u7ku.onrender.com'  // Desarrollo local apuntando a Render
    : 'https://formulario-backend-u7ku.onrender.com', // Producción en Vercel apuntando a Render
};

export const API_ENDPOINTS = {
  AUTH: '/auth',
  BRIGADAS: '/brigadas',
  CATEGORIAS: '/categorias',
  EQUIPOS: '/equipos',
  TALLAS: '/tallas',
  EQUIPOS_BRIGADA: '/equipos-brigada',
  FORMULARIOS: '/formularios-necesidades',
  CREAR_FORMULARIO: '/formularios-necesidades/crear-completo',
  ESTADOS_FORMULARIO: '/estados-formulario',
  REPORTES: '/reportes'
};
