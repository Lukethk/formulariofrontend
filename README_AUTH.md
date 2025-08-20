# Sistema de Autenticación - Sistema de Bomberos

## Descripción

Se ha implementado un sistema completo de autenticación para la aplicación de bomberos que incluye:

- **Login de usuarios** con validación de credenciales
- **Registro de nuevos usuarios** con validaciones completas
- **Dashboard protegido** con información del usuario
- **Guards de autenticación** para proteger rutas
- **Interceptor HTTP** para manejo automático de tokens
- **Servicio de autenticación** centralizado

## Características Implementadas

### 🔐 Autenticación
- Login con email y contraseña
- Registro de usuarios con validaciones
- Manejo de tokens JWT
- Logout automático
- Persistencia de sesión en localStorage

### 🛡️ Seguridad
- Guards para proteger rutas
- Interceptor HTTP para tokens automáticos
- Validación de formularios reactivos
- Manejo de errores de autenticación
- Redirección automática según estado de autenticación

### 🎨 Interfaz de Usuario
- Diseño moderno con Tailwind CSS
- Formularios responsivos
- Mensajes de error y éxito
- Estados de carga
- Iconos y animaciones

### 📱 Responsividad
- Diseño adaptativo para móviles
- Grid responsivo
- Componentes flexibles

## Estructura de Archivos

```
src/app/
├── components/
│   ├── login/
│   │   ├── login.component.ts
│   │   ├── login.component.html
│   │   └── login.component.css
│   ├── register/
│   │   ├── register.component.ts
│   │   ├── register.component.html
│   │   └── register.component.css
│   └── dashboard/
│       ├── dashboard.component.ts
│       ├── dashboard.component.html
│       └── dashboard.component.css
├── services/
│   └── auth.service.ts
├── guards/
│   ├── auth.guard.ts
│   └── no-auth.guard.ts
├── interceptors/
│   └── auth.interceptor.ts
└── app.routes.ts
```

## Rutas Implementadas

### Rutas Públicas
- `/login` - Formulario de inicio de sesión
- `/register` - Formulario de registro

### Rutas Protegidas
- `/dashboard` - Panel principal del usuario
- `/necesidades` - Formulario de necesidades
- `/ver-formularios` - Lista de formularios

## Credenciales de Prueba

Para probar el sistema, puedes usar estas credenciales:

**Email:** admin@bomberos.com  
**Contraseña:** admin123

## API Endpoints Utilizados

### Autenticación
- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/register` - Registro de usuario
- `GET /api/auth/verify` - Verificación de token
- `POST /api/auth/change-password` - Cambio de contraseña

### Brigadas
- `GET /api/brigadas` - Obtener todas las brigadas

## Instalación y Uso

### 1. Dependencias
Asegúrate de tener Angular 17+ instalado y las dependencias del proyecto.

### 2. Configuración del Backend
El sistema espera un backend corriendo en `http://localhost:3000` con los endpoints de autenticación implementados.

### 3. Ejecutar la Aplicación
```bash
cd frontbombero
ng serve
```

### 4. Acceder a la Aplicación
- Abre `http://localhost:4200` en tu navegador
- Serás redirigido automáticamente a `/login`
- Usa las credenciales de prueba o regístrate

## Flujo de Autenticación

1. **Usuario no autenticado** → Redirigido a `/login`
2. **Login exitoso** → Redirigido a `/dashboard`
3. **Acceso a rutas protegidas** → Verificación automática de token
4. **Token expirado** → Logout automático y redirección a `/login`

## Validaciones Implementadas

### Login
- Email requerido y válido
- Contraseña requerida (mínimo 6 caracteres)

### Registro
- Nombre completo (mínimo 2 caracteres)
- Email válido y único
- Contraseña (mínimo 6 caracteres)
- Confirmación de contraseña
- Rol seleccionado
- Brigada (excepto para administradores)
- Número de legajo (formato: BP001)
- Teléfono válido

## Personalización

### Colores
El sistema usa una paleta de colores basada en rojo (#dc2626) para mantener la temática de bomberos.

### Estilos
Los estilos están implementados con Tailwind CSS y pueden ser personalizados modificando las clases en los templates HTML.

### Validaciones
Las validaciones de formularios pueden ser ajustadas en los componentes TypeScript modificando los validadores de FormBuilder.

## Troubleshooting

### Error de CORS
Si encuentras errores de CORS, asegúrate de que tu backend permita peticiones desde `http://localhost:4200`.

### Token no válido
Si el token no se está enviando correctamente, verifica que el interceptor esté configurado en `app.config.ts`.

### Redirección infinita
Si hay redirecciones infinitas, verifica que los guards estén implementados correctamente y que no haya conflictos en las rutas.

## Próximos Pasos

1. **Implementar refresh tokens** para sesiones largas
2. **Agregar recuperación de contraseña** por email
3. **Implementar verificación de email** en el registro
4. **Agregar autenticación de dos factores**
5. **Implementar roles y permisos** más granulares

## Soporte

Para cualquier pregunta o problema con la implementación, revisa:
- Los logs de la consola del navegador
- Los logs del backend
- La documentación de Angular
- Los endpoints de la API

---

**Nota:** Este sistema está diseñado para funcionar con el backend de bomberos especificado en la documentación de endpoints.
