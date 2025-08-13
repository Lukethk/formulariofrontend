import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, API_ENDPOINTS } from '../config/environment';

export interface ApiResponse {
	success: boolean;
	data: FormularioListado[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasNext: boolean;
		hasPrev: boolean;
	};
}

export interface FormularioListado {
	id?: string;
	fecha_creacion?: string | Date;
	brigada_nombre: string;
	estado: string;
	estado_nombre: string;
	estado_color: string;
	observaciones_admin?: string;
	
	epp_ropa?: any;
	epp_botas?: any;
	epp_general?: any;
	epp_guantes?: any;
	herramientas?: any;
	logistica_vehiculos?: any;
	alimentacion?: any;
	equipo_campo?: any;
	limpieza_personal?: any;
	limpieza_general?: any;
	medicamentos?: any;
	rescate_animal?: any;
}

@Injectable({ providedIn: 'root' })
export class FormulariosNecesidadesService {
	private readonly apiUrl = `${environment.apiUrl}${API_ENDPOINTS.FORMULARIOS}`;
	private readonly crearUrl = `${environment.apiUrl}${API_ENDPOINTS.CREAR_FORMULARIO}`;

	constructor(private http: HttpClient) {}

	get apiUrlDebug() {
		return this.apiUrl;
	}

	getFormularios(params?: Record<string, string | number | boolean>): Observable<ApiResponse> {
		console.log('🌐 GET request a:', this.apiUrl);
		return this.http.get<ApiResponse>(this.apiUrl, { params: params as any });
	}

	createFormulario(payload: any): Observable<any> {
		console.log('📤 POST request a:', this.crearUrl);
		return this.http.post<any>(this.crearUrl, payload);
	}
}


