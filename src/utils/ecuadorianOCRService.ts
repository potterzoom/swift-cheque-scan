
import { validateRUC, validateCedula, getBancoEcuatoriano, getProvinciaEcuador, generateSRIComprobante } from './ecuadorValidation';

// Interfaz extendida para datos de cheques ecuatorianos
export interface EcuadorianChequeOCRData {
  // Datos básicos del cheque
  numero: string;
  monto: string;
  banco: string;
  codigoBanco: string;
  fecha: string;
  emisor: string;
  
  // Datos específicos de Ecuador
  beneficiario: {
    nombre: string;
    ruc?: string;
    cedula?: string;
    tipoDocumento: 'RUC' | 'CEDULA';
    provincia: string;
    validacionOK: boolean;
  };
  
  // Datos bancarios ecuatorianos
  datosBancarios: {
    bancoEmisor: string;
    sucursal: string;
    plaza: string;
    numeroCuenta: string;
    tipoCuenta: 'Corriente' | 'Ahorros';
  };
  
  // Datos del código de barras (formato ecuatoriano)
  codigoBarras: {
    numeroUnico: string;
    codigoBanco: string;
    codigoSucursal: string;
    codigoPlaza: string;
    verificacion: string;
  };
  
  // Validaciones SRI
  sri: {
    numeroComprobante: string;
    fechaEmision: string;
    requiereFacturacion: boolean;
    baseImponible: string;
    iva: string;
    total: string;
  };
  
  // Estado de verificación con bancos
  verificacionBancaria: {
    fondosDisponibles: boolean;
    estadoCuenta: 'Activa' | 'Suspendida' | 'Cerrada';
    fechaVerificacion: string;
    bancoConsultado: string;
  };
}

export const extractEcuadorianChequeData = async (imageData: string): Promise<EcuadorianChequeOCRData> => {
  // Simular procesamiento OCR específico para Ecuador
  await new Promise(resolve => setTimeout(resolve, 4000));
  
  const currentDate = new Date();
  const chequeNumber = Math.floor(Math.random() * 9000000) + 1000000;
  const codigoBanco = ['001', '002', '003', '012', '014'][Math.floor(Math.random() * 5)];
  
  // Generar RUC o Cédula aleatoria válida
  const esRUC = Math.random() > 0.5;
  let documento = '';
  let tipoDoc: 'RUC' | 'CEDULA' = 'CEDULA';
  
  if (esRUC) {
    // Generar RUC válido (13 dígitos)
    const provincia = Math.floor(Math.random() * 24) + 1;
    documento = provincia.toString().padStart(2, '0') + '9' + Math.floor(Math.random() * 9999999999).toString().padStart(10, '0');
    tipoDoc = 'RUC';
  } else {
    // Generar cédula válida (10 dígitos)
    const provincia = Math.floor(Math.random() * 24) + 1;
    const base = provincia.toString().padStart(2, '0') + Math.floor(Math.random() * 99999999).toString().padStart(8, '0');
    documento = base + '0'; // Simplificado para demo
  }
  
  const provinciaCode = documento.substring(0, 2);
  const monto = (Math.random() * 50000 + 500).toFixed(2);
  const baseImponible = (parseFloat(monto) / 1.12).toFixed(2);
  const iva = (parseFloat(baseImponible) * 0.12).toFixed(2);
  
  return {
    // Datos básicos
    numero: chequeNumber.toString(),
    monto: monto,
    banco: getBancoEcuatoriano(codigoBanco),
    codigoBanco: codigoBanco,
    fecha: currentDate.toISOString().split('T')[0],
    emisor: obtenerEmisorEcuatoriano(),
    
    // Beneficiario con validación ecuatoriana
    beneficiario: {
      nombre: obtenerBeneficiarioEcuatoriano(),
      ...(esRUC ? { ruc: documento } : { cedula: documento }),
      tipoDocumento: tipoDoc,
      provincia: getProvinciaEcuador(provinciaCode),
      validacionOK: esRUC ? validateRUC(documento) : validateCedula(documento)
    },
    
    // Datos bancarios específicos de Ecuador
    datosBancarios: {
      bancoEmisor: getBancoEcuatoriano(codigoBanco),
      sucursal: `SUC${Math.floor(Math.random() * 999) + 100}`,
      plaza: ['Quito', 'Guayaquil', 'Cuenca', 'Ambato', 'Machala'][Math.floor(Math.random() * 5)],
      numeroCuenta: generarNumeroCuentaEcuador(),
      tipoCuenta: Math.random() > 0.5 ? 'Corriente' : 'Ahorros'
    },
    
    // Código de barras formato ecuatoriano
    codigoBarras: {
      numeroUnico: `EC${Date.now().toString().slice(-8)}`,
      codigoBanco: codigoBanco,
      codigoSucursal: (Math.floor(Math.random() * 999) + 100).toString(),
      codigoPlaza: provinciaCode,
      verificacion: Math.floor(Math.random() * 99).toString().padStart(2, '0')
    },
    
    // Datos SRI obligatorios
    sri: {
      numeroComprobante: generateSRIComprobante({}),
      fechaEmision: currentDate.toISOString().split('T')[0],
      requiereFacturacion: parseFloat(monto) > 200,
      baseImponible: baseImponible,
      iva: iva,
      total: monto
    },
    
    // Verificación bancaria simulada
    verificacionBancaria: {
      fondosDisponibles: Math.random() > 0.3, // 70% tienen fondos
      estadoCuenta: ['Activa', 'Activa', 'Activa', 'Suspendida'][Math.floor(Math.random() * 4)] as 'Activa' | 'Suspendida' | 'Cerrada',
      fechaVerificacion: new Date().toISOString(),
      bancoConsultado: getBancoEcuatoriano(codigoBanco)
    }
  };
};

const obtenerEmisorEcuatoriano = (): string => {
  const emisores = [
    "Corporación Favorita C.A.",
    "Banco del Pichincha S.A.",
    "Pronaca S.A.",
    "Cervecería Nacional CN S.A.",
    "Holcim Ecuador S.A.",
    "Nestle Ecuador S.A."
  ];
  return emisores[Math.floor(Math.random() * emisores.length)];
};

const obtenerBeneficiarioEcuatoriano = (): string => {
  const beneficiarios = [
    "María Elena Vásquez López",
    "Carlos Alberto Mendoza Torres",
    "Empresa Distribuidora del Sur S.A.",
    "Ana Patricia Guerrero Ruiz",
    "Comercializadora Andina Cía. Ltda.",
    "José Miguel Paredes Castro"
  ];
  return beneficiarios[Math.floor(Math.random() * beneficiarios.length)];
};

const generarNumeroCuentaEcuador = (): string => {
  // Formato típico de cuentas ecuatorianas
  return `${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 9000000 + 1000000)}`;
};
