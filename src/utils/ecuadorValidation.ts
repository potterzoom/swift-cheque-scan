
// Servicio de validación específico para Ecuador
export interface EcuadorianData {
  ruc: string;
  cedula: string;
  tipoDocumento: 'RUC' | 'CEDULA';
  razonSocial?: string;
  provincia: string;
  canton: string;
}

export const validateRUC = (ruc: string): boolean => {
  // Validación básica de RUC ecuatoriano (13 dígitos)
  if (!/^\d{13}$/.test(ruc)) return false;
  
  // Los primeros 2 dígitos deben corresponder a una provincia válida (01-24)
  const provincia = parseInt(ruc.substring(0, 2));
  if (provincia < 1 || provincia > 24) return false;
  
  // El tercer dígito debe ser válido según el tipo de RUC
  const tercerDigito = parseInt(ruc.charAt(2));
  
  // Simulación de validación de dígito verificador
  return tercerDigito >= 0 && tercerDigito <= 9;
};

export const validateCedula = (cedula: string): boolean => {
  // Validación básica de cédula ecuatoriana (10 dígitos)
  if (!/^\d{10}$/.test(cedula)) return false;
  
  // Los primeros 2 dígitos deben corresponder a una provincia válida
  const provincia = parseInt(cedula.substring(0, 2));
  if (provincia < 1 || provincia > 24) return false;
  
  // Algoritmo de validación del dígito verificador de cédula
  const digits = cedula.split('').map(Number);
  const verificador = digits[9];
  
  let suma = 0;
  for (let i = 0; i < 9; i++) {
    let digit = digits[i];
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    suma += digit;
  }
  
  const modulo = suma % 10;
  const digitoCalculado = modulo === 0 ? 0 : 10 - modulo;
  
  return digitoCalculado === verificador;
};

export const getBancoEcuatoriano = (codigoBanco: string): string => {
  const bancos: Record<string, string> = {
    '001': 'Banco Central del Ecuador',
    '002': 'Banco del Pacífico',
    '003': 'Banco de Guayaquil',
    '007': 'Banco del Austro',
    '009': 'Banco Internacional',
    '011': 'Banco de Machala',
    '012': 'Banco del Pichincha',
    '013': 'Banco de Loja',
    '014': 'Produbanco',
    '016': 'Banco del Litoral',
    '017': 'Banco Solidario',
    '023': 'Banco de la Producción'
  };
  
  return bancos[codigoBanco] || 'Banco no identificado';
};

export const getProvinciaEcuador = (codigo: string): string => {
  const provincias: Record<string, string> = {
    '01': 'Azuay', '02': 'Bolívar', '03': 'Cañar', '04': 'Carchi',
    '05': 'Cotopaxi', '06': 'Chimborazo', '07': 'El Oro', '08': 'Esmeraldas',
    '09': 'Guayas', '10': 'Imbabura', '11': 'Loja', '12': 'Los Ríos',
    '13': 'Manabí', '14': 'Morona Santiago', '15': 'Napo', '16': 'Pastaza',
    '17': 'Pichincha', '18': 'Tungurahua', '19': 'Zamora Chinchipe',
    '20': 'Galápagos', '21': 'Sucumbíos', '22': 'Orellana', '23': 'Santo Domingo',
    '24': 'Santa Elena'
  };
  
  return provincias[codigo] || 'Provincia no identificada';
};

export const generateSRIComprobante = (chequeData: any): string => {
  // Generar número de comprobante electrónico según formato SRI
  const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const secuencial = Math.floor(Math.random() * 999999999).toString().padStart(9, '0');
  
  return `001-001-${secuencial}`;
};
