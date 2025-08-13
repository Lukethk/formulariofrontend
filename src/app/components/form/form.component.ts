import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormulariosNecesidadesService } from '../../services/formularios-necesidades.service';

export interface FormularioNecesidadesBomberos {
  // Información General
  nombreBrigada: string;
  cantidadBomberosActivos: number;
  contactoComandante: string;
  encargadoLogistica: string;
  contactoLogistica: string;
  numeroEmergenciaPublico?: string;
  
  // EPP - Ropa
  camisaForestal: {
    xs: number; s: number; m: number; l: number; xl: number; observaciones: string;
  };
  pantalonForestal: {
    xs: number; s: number; m: number; l: number; xl: number; observaciones: string;
  };
  overolFR: {
    xs: number; s: number; m: number; l: number; xl: number; observaciones: string;
  };
  
  // Botas
  botasForestales: {
    '37': number; '38': number; '39': number; '40': number; '41': number; '42': number; '43': number; otraTalla: string;
  };
  
  // EPP General
  esclavina: { cantidad: number; observaciones: string; };
  linterna: { cantidad: number; observaciones: string; };
  antiparra: { cantidad: number; observaciones: string; };
  cascoForestal: { cantidad: number; observaciones: string; };
  mascaraPolvo: { cantidad: number; observaciones: string; };
  mascaraMediaCara: { cantidad: number; observaciones: string; };
  
  // Guantes
  guantesCuero: {
    xs: number; s: number; m: number; l: number; xl: number; xxl: number; otraTalla: string;
  };
  
  // Herramientas
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
  
  // Logística Vehículos
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
  
  // Alimentación
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
  
  // Equipo de Campo
  equipoCampo: {
    colchoneta: { cantidad: number; observaciones: string; };
    sleeping: { cantidad: number; observaciones: string; };
    camping: { cantidad: number; observaciones: string; };
  };
  
  // Limpieza Personal
  limpiezaPersonal: {
    shampoo: { cantidad: number; observaciones: string; };
    jaboncillos: { cantidad: number; observaciones: string; };
    pastaDental: { cantidad: number; observaciones: string; };
    cepilloDientes: { cantidad: number; observaciones: string; };
    toallasHumedas: { cantidad: number; observaciones: string; };
    toallasHigienicas: { cantidad: number; observaciones: string; };
    papelHigienico: { cantidad: number; observaciones: string; };
  };
  
  // Limpieza General
  limpiezaGeneral: {
    ace: { cantidad: number; observaciones: string; };
    lavandina: { cantidad: number; observaciones: string; };
  };
  
  // Medicamentos
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
  
  // Rescate Animal
  rescateAnimal: {
    alimentosAnimales: { cantidad: number; observaciones: string; };
  };
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class FormComponent implements OnInit {
  formulario: FormGroup;
  enviando = false;
  enviado = false;

  tallasRopa = ['XS', 'S', 'M', 'L', 'XL'];
  tallasGuantes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  tallasBotas = ['37', '38', '39', '40', '41', '42', '43'];

  constructor(private fb: FormBuilder, private formulariosSrv: FormulariosNecesidadesService) {
    this.formulario = this.fb.group({});
  }

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      // Información General
      nombreBrigada: ['', Validators.required],
      cantidadBomberosActivos: [0, [Validators.required, Validators.min(1)]],
      contactoComandante: ['', Validators.required],
      encargadoLogistica: ['', Validators.required],
      contactoLogistica: ['', Validators.required],
      numeroEmergenciaPublico: [''],
      
      // EPP - Ropa
      camisaForestal: this.fb.group({
        xs: [0, Validators.min(0)], s: [0, Validators.min(0)], m: [0, Validators.min(0)], 
        l: [0, Validators.min(0)], xl: [0, Validators.min(0)], observaciones: ['']
      }),
      pantalonForestal: this.fb.group({
        xs: [0, Validators.min(0)], s: [0, Validators.min(0)], m: [0, Validators.min(0)], 
        l: [0, Validators.min(0)], xl: [0, Validators.min(0)], observaciones: ['']
      }),
      overolFR: this.fb.group({
        xs: [0, Validators.min(0)], s: [0, Validators.min(0)], m: [0, Validators.min(0)], 
        l: [0, Validators.min(0)], xl: [0, Validators.min(0)], observaciones: ['']
      }),
      
      // Botas
      botasForestales: this.fb.group({
        '37': [0, Validators.min(0)], '38': [0, Validators.min(0)], '39': [0, Validators.min(0)],
        '40': [0, Validators.min(0)], '41': [0, Validators.min(0)], '42': [0, Validators.min(0)],
        '43': [0, Validators.min(0)], otraTalla: ['']
      }),
      
      // EPP General
      esclavina: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
      linterna: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
      antiparra: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
      cascoForestal: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
      mascaraPolvo: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
      mascaraMediaCara: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
      
      // Guantes
      guantesCuero: this.fb.group({
        xs: [0, Validators.min(0)], s: [0, Validators.min(0)], m: [0, Validators.min(0)], 
        l: [0, Validators.min(0)], xl: [0, Validators.min(0)], xxl: [0, Validators.min(0)], otraTalla: ['']
      }),
      
      // Herramientas
      herramientas: this.fb.group({
        linternasCabeza: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        pilasAA: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        pilasAAA: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        azadon: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        palaFibra: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        rastrilloFibra: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        mcleodFibra: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        batefuego: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        gorgui: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        pulaskyFibra: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        quemadorGoteo: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        mochilaForestal: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        escobetaAlambre: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] })
      }),
      
      // Logística Vehículos
      logisticaVehiculos: this.fb.group({
        gasolina: this.fb.group({ monto: [0, Validators.min(0)], observaciones: [''] }),
        diesel: this.fb.group({ monto: [0, Validators.min(0)], observaciones: [''] }),
        amortiguadores: this.fb.group({ monto: [0, Validators.min(0)], observaciones: [''] }),
        prensaDisco: this.fb.group({ monto: [0, Validators.min(0)], observaciones: [''] }),
        rectificacionFrenos: this.fb.group({ monto: [0, Validators.min(0)], observaciones: [''] }),
        llantas: this.fb.group({ monto: [0, Validators.min(0)], observaciones: [''] }),
        aceiteMotor: this.fb.group({ monto: [0, Validators.min(0)], observaciones: [''] }),
        grasa: this.fb.group({ monto: [0, Validators.min(0)], observaciones: [''] }),
        cambioAceite: this.fb.group({ monto: [0, Validators.min(0)], observaciones: [''] }),
        otroArreglo: this.fb.group({ monto: [0, Validators.min(0)], observaciones: [''] })
      }),
      
      // Alimentación
      alimentacion: this.fb.group({
        alimentosBebidas: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        agua: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        rehidratantes: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        barrasEnergeticas: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        atun: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        frejol: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        viandada: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        chorizos: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        refrescoSobres: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        lechePolvo: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        frutosSecos: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        mentaDulces: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        alimentosNoPerecederos: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] })
      }),
      
      // Equipo de Campo
      equipoCampo: this.fb.group({
        colchoneta: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        sleeping: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        camping: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] })
      }),
      
      // Limpieza Personal
      limpiezaPersonal: this.fb.group({
        shampoo: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        jaboncillos: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        pastaDental: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        cepilloDientes: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        toallasHumedas: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        toallasHigienicas: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        papelHigienico: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] })
      }),
      
      // Limpieza General
      limpiezaGeneral: this.fb.group({
        ace: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        lavandina: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] })
      }),
      
      // Medicamentos
      medicamentos: this.fb.group({
        aguaDestilada: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        aguaOxigenada: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        alcohol: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        algodon: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        amoxicilina: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        bacitracina: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        branula: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        ciprofloxacino: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        complejoB: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        dexametasona: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        diclofenaco50: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        diclofenaco75: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        equipoVenoclisis: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        gasas: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        gentamicina: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        hidrocortisona: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        ibuprofeno600: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        ibuprofeno200: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        jeringas: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        loratadina: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        nafazolina: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        paracetamol100: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        paracetamol500: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        povidonaYodada: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        quemacuran: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        refrianex: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        rifamicina: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        salesRehidratacion: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        sertal: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        sueroDextrosa: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        sueroFisiologico: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        tabletasPotabilizadoras: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        barbijos: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        tanqueOxigeno: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        fluidimed: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        repelente: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        talcoPies: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        cremaAescaldadura: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] }),
        nebulizador: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] })
      }),
      
      // Rescate Animal
      rescateAnimal: this.fb.group({
        alimentosAnimales: this.fb.group({ cantidad: [0, Validators.min(0)], observaciones: [''] })
      })
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.enviando = true;
      
      const payload = this.formulario.value;
      this.formulariosSrv.createFormulario(payload).subscribe({
        next: () => {
          this.enviado = true;
          this.enviando = false;
          this.formulario.reset();
          this.inicializarFormulario();
          setTimeout(() => { this.enviado = false; }, 4000);
        },
        error: () => {
          this.enviando = false;
        }
      });
    } else {
      this.marcarCamposInvalidos();
    }
  }

  marcarCamposInvalidos() {
    Object.keys(this.formulario.controls).forEach(key => {
      const control = this.formulario.get(key);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
  }

  limpiarFormulario() {
    this.formulario.reset();
    this.inicializarFormulario();
    this.enviado = false;
  }

  esCampoInvalido(campo: string): boolean {
    const control = this.formulario.get(campo);
    return control ? (control.invalid && control.touched) : false;
  }

  obtenerMensajeError(campo: string): string {
    const control = this.formulario.get(campo);
    if (control?.errors) {
      if (control.errors['required']) {
        return 'Este campo es obligatorio';
      }
      if (control.errors['min']) {
        return 'El valor debe ser mayor o igual a 0';
      }
    }
    return '';
  }

  // Métodos auxiliares para acceder a grupos del formulario
  get camisaForestal() { return this.formulario.get('camisaForestal') as FormGroup; }
  get pantalonForestal() { return this.formulario.get('pantalonForestal') as FormGroup; }
  get overolFR() { return this.formulario.get('overolFR') as FormGroup; }
  get botasForestales() { return this.formulario.get('botasForestales') as FormGroup; }
  get guantesCuero() { return this.formulario.get('guantesCuero') as FormGroup; }
  get herramientas() { return this.formulario.get('herramientas') as FormGroup; }
  get logisticaVehiculos() { return this.formulario.get('logisticaVehiculos') as FormGroup; }
  get alimentacion() { return this.formulario.get('alimentacion') as FormGroup; }
  get equipoCampo() { return this.formulario.get('equipoCampo') as FormGroup; }
  get limpiezaPersonal() { return this.formulario.get('limpiezaPersonal') as FormGroup; }
  get limpiezaGeneral() { return this.formulario.get('limpiezaGeneral') as FormGroup; }
  get medicamentos() { return this.formulario.get('medicamentos') as FormGroup; }
  get rescateAnimal() { return this.formulario.get('rescateAnimal') as FormGroup; }
}
