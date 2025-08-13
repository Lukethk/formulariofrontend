# Sistema de Necesidades - Brigada de Bomberos Forestales

## Descripción
Sistema web para gestionar las necesidades de equipamiento de las brigadas de bomberos forestales.

## Instalación y Ejecución

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Backend
Asegúrate de que tu backend esté ejecutándose en `http://localhost:3000`

### 3. Ejecutar Frontend
```bash
npm start
```
Esto iniciará la aplicación Angular en `http://localhost:4200`.

## Estructura del Proyecto

- **Frontend**: Angular 20 con Tailwind CSS
- **Backend**: API en puerto 3000
- **Proxy**: Configurado para redirigir `/api` a `localhost:3000`

## Endpoints de la API

- `GET /api/formularios-necesidades` - Obtener todos los formularios de necesidades
- `POST /api/formularios-necesidades/crear-completo` - Crear nuevo formulario de necesidades completo
- `GET /api/brigadas` - Obtener brigadas
- `GET /api/equipos` - Obtener equipos
- `GET /api/categorias` - Obtener categorías
- `GET /api/tallas` - Obtener tallas
- `GET /api/equipos-brigada` - Obtener equipos por brigada
- `GET /api/estados-formulario` - Obtener estados de formulario
- `GET /api/reportes` - Obtener reportes

## Notas de Desarrollo

- El proxy está configurado en `proxy.conf.json`
- Las URLs de la API están configuradas como relativas en `environment.ts`
- El proxy redirige `/api/*` a `http://localhost:3000/*`
- **API Backend**: Funcionando en `http://localhost:3000` con endpoints completos
- **Endpoint Principal**: `/api/formularios-necesidades` para formularios de bomberos

## Próximos Pasos

1. Implementar backend real con Node.js/Express
2. Implementar base de datos PostgreSQL
3. Agregar autenticación y autorización
4. Implementar validaciones del lado del servidor
