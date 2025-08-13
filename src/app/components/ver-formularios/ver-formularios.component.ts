import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormulariosNecesidadesService, FormularioListado } from '../../services/formularios-necesidades.service';

export interface FormularioNecesidades {
  id?: string;
  fechaCreacion: Date;
  nombreBrigada: string;
  cantidadBomberosActivos: number;
  contactoComandante: string;
  encargadoLogistica: string;
  contactoLogistica: string;
  numeroEmergenciaPublico?: string;
  
  camisaForestal: {
    xs: number; s: number; m: number; l: number; xl: number; observaciones: string;
  };
  pantalonForestal: {
    xs: number; s: number; m: number; l: number; xl: number; observaciones: string;
  };
  overolFR: {
    xs: number; s: number; m: number; l: number; xl: number; observaciones: string;
  };
  
  botasForestales: {
    '37': number; '38': number; '39': number; '40': number; '41': number; '42': number; '43': number; otraTalla: string;
  };
  
  esclavina: { cantidad: number; observaciones: string; };
  linterna: { cantidad: number; observaciones: string; };
  antiparra: { cantidad: number; observaciones: string; };
  cascoForestal: { cantidad: number; observaciones: string; };
  mascaraPolvo: { cantidad: number; observaciones: string; };
  mascaraMediaCara: { cantidad: number; observaciones: string; };
  
  guantesCuero: {
    xs: number; s: number; m: number; l: number; xl: number; xxl: number; otraTalla: string;
  };
  
  herramientas: {
    linternasCabeza: { cantidad: number; observaciones: string; };
    pilasAA: { cantidad: number; observaciones: string; };
    pilasAAA: { cantidad: number; observaciones: string; };
    azadon: { cantidad: number; observaciones: string; };
    palaFibra: { cantidad: number; observaciones: string; };
    rastrilloFibra: { cantidad: number; observaciones: string; };
    mcleodFibra: { cantidad: number; observaciones: string; };
    batefuego: { cantidad: number; observaciones: string; };
    gorgui: { cantidad: number; observaciones: string; };
    pulaskyFibra: { cantidad: number; observaciones: string; };
    quemadorGoteo: { cantidad: number; observaciones: string; };
    mochilaForestal: { cantidad: number; observaciones: string; };
    escobetaAlambre: { cantidad: number; observaciones: string; };
  };
  
  logisticaVehiculos: {
    gasolina: { monto: number; observaciones: string; };
    diesel: { monto: number; observaciones: string; };
    amortiguadores: { monto: number; observaciones: string; };
    prensaDisco: { monto: number; observaciones: string; };
    rectificacionFrenos: { monto: number; observaciones: string; };
    llantas: { monto: number; observaciones: string; };
    aceiteMotor: { monto: number; observaciones: string; };
    grasa: { monto: number; observaciones: string; };
    cambioAceite: { monto: number; observaciones: string; };
    otroArreglo: { monto: number; observaciones: string; };
  };
  
  alimentacion: {
    alimentosBebidas: { cantidad: number; observaciones: string; };
    agua: { cantidad: number; observaciones: string; };
    rehidratantes: { cantidad: number; observaciones: string; };
    barrasEnergeticas: { cantidad: number; observaciones: string; };
    atun: { cantidad: number; observaciones: string; };
    frejol: { cantidad: number; observaciones: string; };
    viandada: { cantidad: number; observaciones: string; };
    chorizos: { cantidad: number; observaciones: string; };
    refrescoSobres: { cantidad: number; observaciones: string; };
    lechePolvo: { cantidad: number; observaciones: string; };
    frutosSecos: { cantidad: number; observaciones: string; };
    mentaDulces: { cantidad: number; observaciones: string; };
    alimentosNoPerecederos: { cantidad: number; observaciones: string; };
  };
  
  equipoCampo: {
    colchoneta: { cantidad: number; observaciones: string; };
    sleeping: { cantidad: number; observaciones: string; };
    camping: { cantidad: number; observaciones: string; };
  };
  
  limpiezaPersonal: {
    shampoo: { cantidad: number; observaciones: string; };
    jaboncillos: { cantidad: number; observaciones: string; };
    pastaDental: { cantidad: number; observaciones: string; };
    cepilloDientes: { cantidad: number; observaciones: string; };
    toallasHumedas: { cantidad: number; observaciones: string; };
    toallasHigienicas: { cantidad: number; observaciones: string; };
    papelHigienico: { cantidad: number; observaciones: string; };
  };
  
  limpiezaGeneral: {
    ace: { cantidad: number; observaciones: string; };
    lavandina: { cantidad: number; observaciones: string; };
  };
  
  medicamentos: {
    aguaDestilada: { cantidad: number; observaciones: string; };
    aguaOxigenada: { cantidad: number; observaciones: string; };
    alcohol: { cantidad: number; observaciones: string; };
    algodon: { cantidad: number; observaciones: string; };
    amoxicilina: { cantidad: number; observaciones: string; };
    bacitracina: { cantidad: number; observaciones: string; };
    branula: { cantidad: number; observaciones: string; };
    ciprofloxacino: { cantidad: number; observaciones: string; };
    complejoB: { cantidad: number; observaciones: string; };
    dexametasona: { cantidad: number; observaciones: string; };
    diclofenaco50: { cantidad: number; observaciones: string; };
    diclofenaco75: { cantidad: number; observaciones: string; };
    equipoVenoclisis: { cantidad: number; observaciones: string; };
    gasas: { cantidad: number; observaciones: string; };
    gentamicina: { cantidad: number; observaciones: string; };
    hidrocortisona: { cantidad: number; observaciones: string; };
    ibuprofeno600: { cantidad: number; observaciones: string; };
    ibuprofeno200: { cantidad: number; observaciones: string; };
    jeringas: { cantidad: number; observaciones: string; };
    loratadina: { cantidad: number; observaciones: string; };
    nafazolina: { cantidad: number; observaciones: string; };
    paracetamol100: { cantidad: number; observaciones: string; };
    paracetamol500: { cantidad: number; observaciones: string; };
    povidonaYodada: { cantidad: number; observaciones: string; };
    quemacuran: { cantidad: number; observaciones: string; };
    refrianex: { cantidad: number; observaciones: string; };
    rifamicina: { cantidad: number; observaciones: string; };
    salesRehidratacion: { cantidad: number; observaciones: string; };
    sertal: { cantidad: number; observaciones: string; };
    sueroDextrosa: { cantidad: number; observaciones: string; };
    sueroFisiologico: { cantidad: number; observaciones: string; };
    tabletasPotabilizadoras: { cantidad: number; observaciones: string; };
    barbijos: { cantidad: number; observaciones: string; };
    tanqueOxigeno: { cantidad: number; observaciones: string; };
    fluidimed: { cantidad: number; observaciones: string; };
    repelente: { cantidad: number; observaciones: string; };
    talcoPies: { cantidad: number; observaciones: string; };
    cremaAescaldadura: { cantidad: number; observaciones: string; };
    nebulizador: { cantidad: number; observaciones: string; };
  };
  
  rescateAnimal: {
    alimentosAnimales: { cantidad: number; observaciones: string; };
  };
  
  estado: 'pendiente' | 'en_revision' | 'aprobado' | 'rechazado';
  observacionesAdmin?: string;
}

@Component({
  selector: 'app-ver-formularios',
  templateUrl: './ver-formularios.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class VerFormulariosComponent implements OnInit {
  formularios: FormularioListado[] = [];
  formulariosFiltrados: FormularioListado[] = [];
  
  filtroBusqueda: string = '';
  filtroBrigada: string = '';
  filtroEstado: string = '';
  
  paginaActual: number = 1;
  elementosPorPagina: number = 10;
  totalElementos: number = 0;

  estados = [
    { value: 'pendiente', label: '⏳ Pendiente', class: 'bg-yellow-100 text-yellow-800' },
    { value: 'en_revision', label: '🔍 En Revisión', class: 'bg-blue-100 text-blue-800' },
    { value: 'aprobado', label: '✅ Aprobado', class: 'bg-green-100 text-green-800' },
    { value: 'rechazado', label: '❌ Rechazado', class: 'bg-red-100 text-red-800' }
  ];

  constructor(private formulariosSrv: FormulariosNecesidadesService) {}

  ngOnInit() {
    this.cargarFormularios();
  }

  cargarFormularios() {
    console.log('🔄 Cargando formularios...');
    console.log('📍 URL del servicio:', this.formulariosSrv.apiUrlDebug);
    
    this.formulariosSrv.getFormularios()
      .subscribe({
        next: (response) => {
          console.log('✅ Respuesta completa recibida:', response);
          
          const data = response?.data || [];
          console.log('📋 Datos extraídos:', data);
          
          this.formularios = data.map(f => ({
            ...f,
            fechaCreacion: f.fecha_creacion ? new Date(f.fecha_creacion) : undefined
          }));
          console.log('📋 Formularios procesados:', this.formularios);
          this.formulariosFiltrados = [...this.formularios];
          this.totalElementos = this.formulariosFiltrados.length;
          this.aplicarFiltros();
        },
        error: (error) => {
          console.error('❌ Error al cargar formularios:', error);
          this.formularios = [];
          this.formulariosFiltrados = [];
          this.totalElementos = 0;
        }
      });
  }

  aplicarFiltros() {
    this.formulariosFiltrados = this.formularios.filter(formulario => {
      const cumpleBusqueda = !this.filtroBusqueda || 
        formulario.brigada_nombre.toLowerCase().includes(this.filtroBusqueda.toLowerCase());
      
      const cumpleBrigada = !this.filtroBrigada || 
        formulario.brigada_nombre.toLowerCase().includes(this.filtroBrigada.toLowerCase());
      
      const cumpleEstado = !this.filtroEstado || formulario.estado === this.filtroEstado;
      
      return cumpleBusqueda && cumpleBrigada && cumpleEstado;
    });
    
    this.totalElementos = this.formulariosFiltrados.length;
    this.paginaActual = 1;
  }

  limpiarFiltros() {
    this.filtroBusqueda = '';
    this.filtroBrigada = '';
    this.filtroEstado = '';
    this.aplicarFiltros();
  }

  get formulariosPaginados() {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    return this.formulariosFiltrados.slice(inicio, fin);
  }

  get totalPaginas() {
    return Math.ceil(this.totalElementos / this.elementosPorPagina);
  }

  cambiarPagina(pagina: number | string) {
    if (typeof pagina === 'number' && pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  verFormulario(formulario: FormularioListado) {
    console.log('Ver formulario:', formulario);
  }

  editarFormulario(formulario: FormularioListado) {
    console.log('Editar formulario:', formulario);
  }

  obtenerEstadoLabel(estado: string) {
    const estadoObj = this.estados.find(e => e.value === estado);
    return estadoObj ? estadoObj.label : estado;
  }

  obtenerEstadoClass(estado: string) {
    const estadoObj = this.estados.find(e => e.value === estado);
    return estadoObj ? estadoObj.class : 'bg-gray-100 text-gray-800';
  }

  calcularTotalEPP(formulario: FormularioListado): number {
    let total = 0;

    if (formulario.epp_ropa) {
      total += Object.values(formulario.epp_ropa)
        .filter(v => typeof v === 'number')
        .reduce((a: number, b: any) => a + (b as number), 0);
    }

    if (formulario.epp_botas) {
      total += Object.values(formulario.epp_botas)
        .filter(v => typeof v === 'number')
        .reduce((a: number, b: any) => a + (b as number), 0);
    }

    if (formulario.epp_general) {
      total += Object.values(formulario.epp_general)
        .filter(v => typeof v === 'number')
        .reduce((a: number, b: any) => a + (b as number), 0);
    }

    if (formulario.epp_guantes) {
      total += Object.values(formulario.epp_guantes)
        .filter(v => typeof v === 'number')
        .reduce((a: number, b: any) => a + (b as number), 0);
    }

    return total;
  }

  // Hacer Math disponible en el template
  Math = Math;

  generarArrayPaginas(): (number | string)[] {
    const paginas: (number | string)[] = [];
    const totalPaginas = this.totalPaginas;
    
    if (totalPaginas <= 7) {
      for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
      }
    } else {
      if (this.paginaActual <= 4) {
        for (let i = 1; i <= 5; i++) {
          paginas.push(i);
        }
        paginas.push('...');
        paginas.push(totalPaginas);
      } else if (this.paginaActual >= totalPaginas - 3) {
        paginas.push(1);
        paginas.push('...');
        for (let i = totalPaginas - 4; i <= totalPaginas; i++) {
          paginas.push(i);
        }
      } else {
        paginas.push(1);
        paginas.push('...');
        for (let i = this.paginaActual - 1; i <= this.paginaActual + 1; i++) {
          paginas.push(i);
        }
        paginas.push('...');
        paginas.push(totalPaginas);
      }
    }
    
    return paginas;
  }

  esPaginaValida(pagina: number | string): boolean {
    return typeof pagina === 'number' && pagina >= 1 && pagina <= this.totalPaginas;
  }
}
