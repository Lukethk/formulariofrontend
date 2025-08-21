export const environment = {
  production: false,
  
  // URL base para desarrollo - usar proxy local para evitar CORS
  apiUrl: '/api',
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
