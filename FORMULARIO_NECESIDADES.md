# Formulario de Necesidades - Brigada de Bomberos Forestales

## 📋 Descripción
Este formulario ha sido diseñado específicamente para que las brigadas de bomberos forestales puedan registrar sus necesidades de equipamiento, suministros y recursos. Está basado en la estructura del archivo Excel "PLANILLA_Formulario_Necesidades_Bomberos 2025.xlsx".

## 🚒 Secciones del Formulario

### 1. **Información General**
- Nombre de la Brigada (obligatorio)
- Cantidad de Bomberos Activos (obligatorio)
- Contacto Celular Comandante (obligatorio)
- Encargado de Logística (obligatorio)
- Contacto Celular Logística (obligatorio)
- Número de Emergencia Público (opcional)

### 2. **EPP - Equipamiento de Protección Personal**

#### 👔 **Ropa**
- **Camisa Forestal**: Cantidades por talla (XS, S, M, L, XL) + observaciones
- **Pantalón Forestal**: Cantidades por talla (XS, S, M, L, XL) + observaciones
- **Overol FR**: Cantidades por talla (XS, S, M, L, XL) + observaciones

#### 👢 **Botas**
- Cantidades por talla (37, 38, 39, 40, 41, 42, 43)
- Campo para otras tallas

#### 🛡️ **EPP General**
- Esclavina (cantidad + observaciones)
- Linterna (cantidad + observaciones)
- Antiparra (cantidad + observaciones)
- Casco Forestal Ala Ancha (cantidad + observaciones)
- Máscara para Polvo y Partículas (cantidad + observaciones)
- Máscara Media Cara (cantidad + observaciones)

#### 🧤 **Guantes de Cuero**
- Cantidades por talla (XS, S, M, L, XL, XXL)
- Campo para otras tallas

## 🔧 **Características Técnicas**

### **Formulario Reactivo**
- Utiliza Angular Reactive Forms para manejo de estado
- Validaciones en tiempo real
- Estructura de datos anidada para organizar la información

### **Validaciones**
- Campos obligatorios marcados con asterisco rojo
- Validación de números mínimos (≥ 0)
- Mensajes de error personalizados

### **Responsive Design**
- Diseño adaptativo para móviles y escritorio
- Grid system flexible
- Campos organizados en columnas según el tamaño de pantalla

## 📱 **Estructura de Datos**

El formulario genera un objeto JSON con la siguiente estructura:

```typescript
{
  // Información General
  nombreBrigada: string,
  cantidadBomberosActivos: number,
  contactoComandante: string,
  encargadoLogistica: string,
  contactoLogistica: string,
  numeroEmergenciaPublico?: string,
  
  // EPP - Ropa
  camisaForestal: {
    xs: number, s: number, m: number, l: number, xl: number,
    observaciones: string
  },
  pantalonForestal: { /* misma estructura */ },
  overolFR: { /* misma estructura */ },
  
  // Botas
  botasForestales: {
    '37': number, '38': number, '39': number, '40': number,
    '41': number, '42': number, '43': number,
    otraTalla: string
  },
  
  // EPP General
  esclavina: { cantidad: number, observaciones: string },
  linterna: { cantidad: number, observaciones: string },
  // ... otros elementos
  
  // Guantes
  guantesCuero: {
    xs: number, s: number, m: number, l: number, xl: number, xxl: number,
    otraTalla: string
  }
}
```

## 🎯 **Próximas Funcionalidades**

### **Secciones Pendientes por Implementar:**
1. **Herramientas** (azadón, pala, rastrillo, etc.)
2. **Logística Vehículos** (combustible, repuestos, mantenimiento)
3. **Alimentación** (agua, alimentos no perecederos, etc.)
4. **Equipo de Campo** (colchonetas, sleeping bags, camping)
5. **Limpieza Personal** (shampoo, jabón, etc.)
6. **Limpieza General** (detergentes, desinfectantes)
7. **Medicamentos** (botiquín completo)
8. **Rescate Animal** (alimentos para animales)

### **Funcionalidades Adicionales:**
- Guardado automático en localStorage
- Exportación a Excel/PDF
- Historial de formularios enviados
- Cálculo automático de totales por categoría
- Validación de inventario existente

## 🚀 **Cómo Usar**

1. **Navegar** a `/necesidades` (ruta por defecto)
2. **Completar** la información general de la brigada
3. **Especificar** cantidades por talla para ropa y calzado
4. **Agregar** observaciones específicas para cada elemento
5. **Enviar** el formulario cuando esté completo

## 📊 **Beneficios**

- **Estandarización**: Formato uniforme para todas las brigadas
- **Trazabilidad**: Registro histórico de necesidades
- **Planificación**: Base para presupuestos y compras
- **Eficiencia**: Reducción de tiempo en la gestión de inventarios
- **Transparencia**: Visibilidad clara de las necesidades de cada brigada

## 🔄 **Mantenimiento**

Para agregar nuevas secciones o modificar existentes:

1. **Actualizar** la interfaz `FormularioNecesidadesBomberos`
2. **Modificar** el método `inicializarFormulario()`
3. **Agregar** los getters correspondientes
4. **Actualizar** el HTML con los nuevos campos
5. **Probar** la funcionalidad completa

---

**Nota**: Este formulario está diseñado para ser extensible y fácil de mantener, permitiendo agregar nuevas categorías y elementos según las necesidades futuras de las brigadas de bomberos forestales.
