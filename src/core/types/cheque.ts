// Tipos específicos para cheques ecuatorianos

export type BancoEcuador = 
  | 'Banco Pichincha'
  | 'Banco del Guayaquil'
  | 'Banco del Pacífico'
  | 'Banco Internacional'
  | 'Produbanco'
  | 'Banco Bolivariano'
  | 'Banco de Machala'
  | 'Banco ProCredit'
  | 'Banco de Loja'
  | 'Banco Solidario';

export type TipoCheque = 'cliente' | 'proveedor';

export type EstadoCheque = 'pendiente' | 'procesado' | 'rechazado' | 'cobrado';

export interface ChequeEcuador {
  id: string;
  numero: string;
  banco: BancoEcuador;
  cuenta: string;
  monto: number;
  fechaEmision: Date;
  fechaVencimiento: Date;
  codigoSeguridad?: string;
  
  // Datos del emisor
  emisor: string;
  rucCedulaEmisor: string;
  
  // Datos del beneficiario
  beneficiario: string;
  rucCedulaBeneficiario: string;
  
  // Específico para Ecuador
  tipo: TipoCheque;
  estado: EstadoCheque;
  
  // Validaciones
  validacionRUC?: {
    valido: boolean;
    mensaje?: string;
  };
  
  verificacionBancaria?: {
    fondosDisponibles: boolean;
    fechaVerificacion: Date;
    mensaje?: string;
  };
  
  // Metadatos
  fechaProcesamiento: Date;
  imagenEscaneada?: string;
  observaciones?: string;
}

export interface EcuadorianChequeOCRData {
  numero?: string;
  banco?: string;
  cuenta?: string;
  monto?: number;
  fechaEmision?: string;
  emisor?: string;
  beneficiario?: string;
  rucCedula?: string;
  confidence?: number;
}

export interface ScanResult {
  success: boolean;
  data?: EcuadorianChequeOCRData;
  error?: string;
  processingTime?: number;
}

export interface ChequeStats {
  totalCheques: number;
  clientesUnicos: number;
  proveedoresUnicos: number;
  procesadosHoy: number;
  validacionesExitosas: number;
  fondosVerificados: number;
  montoTotal: number;
  promedioPorCheque: number;
}