
// Simulación de servicio OCR mejorado para extraer datos completos del cheque
export interface ChequeOCRData {
  // Datos del frente del cheque
  numero: string;
  monto: string;
  banco: string;
  fecha: string;
  emisor: string;
  
  // Datos del código de barras
  codigoBarras: {
    numeroUnico: string;
    codigoBanco: string;
    codigoSucursal: string;
    verificacion: string;
  };
  
  // Datos de la línea MICR (Magnetic Ink Character Recognition)
  lineaMICR: {
    numeroCuenta: string;
    numeroRuta: string;
    numeroTransito: string;
    codigoControl: string;
  };
  
  // Datos del reverso (endorsement)
  reverso: {
    fechaDeposito: string;
    codigoCliente: string;
    cuentaDeposito: string;
    sucursalDeposito: string;
    codigoOperacion: string;
    selloDigital: string;
  };
}

export const extractChequeData = async (imageData: string): Promise<ChequeOCRData> => {
  // Simular procesamiento OCR avanzado
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Datos simulados basados en OCR real
  const currentDate = new Date();
  const chequeNumber = Math.floor(Math.random() * 9000000) + 1000000;
  
  return {
    // Datos básicos del cheque (frente)
    numero: chequeNumber.toString(),
    monto: (Math.random() * 50000 + 500).toFixed(2),
    banco: obtenerBancoAleatorio(),
    fecha: currentDate.toISOString().split('T')[0],
    emisor: obtenerEmisorAleatorio(),
    
    // Código de barras (datos únicos codificados)
    codigoBarras: {
      numeroUnico: `BC${Date.now().toString().slice(-8)}`,
      codigoBanco: generarCodigoBanco(),
      codigoSucursal: (Math.floor(Math.random() * 999) + 100).toString(),
      verificacion: Math.floor(Math.random() * 99).toString().padStart(2, '0')
    },
    
    // Línea MICR (números magnéticos en la parte inferior)
    lineaMICR: {
      numeroCuenta: generarNumeroCuenta(),
      numeroRuta: generarNumeroRuta(),
      numeroTransito: (Math.floor(Math.random() * 9999) + 1000).toString(),
      codigoControl: Math.floor(Math.random() * 999).toString().padStart(3, '0')
    },
    
    // Datos del reverso del cheque
    reverso: {
      fechaDeposito: new Date(currentDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      codigoCliente: `CLI${Math.floor(Math.random() * 99999) + 10000}`,
      cuentaDeposito: generarCuentaDeposito(),
      sucursalDeposito: `SUC${Math.floor(Math.random() * 999) + 100}`,
      codigoOperacion: `OP${Date.now().toString().slice(-6)}`,
      selloDigital: generarSelloDigital()
    }
  };
};

const obtenerBancoAleatorio = (): string => {
  const bancos = [
    "Banco Nacional de México",
    "BBVA Bancomer",
    "Banco Santander",
    "Banco Azteca",
    "Scotiabank México",
    "HSBC México"
  ];
  return bancos[Math.floor(Math.random() * bancos.length)];
};

const obtenerEmisorAleatorio = (): string => {
  const emisores = [
    "Comercializadora ABC S.A. de C.V.",
    "Distribuidora XYZ S.A.",
    "Empresa Industrial DEF",
    "Servicios Profesionales GHI",
    "Corporativo JKL S.A. de C.V."
  ];
  return emisores[Math.floor(Math.random() * emisores.length)];
};

const generarCodigoBanco = (): string => {
  const codigos = ["001", "002", "012", "014", "019", "021", "030", "036", "037", "042"];
  return codigos[Math.floor(Math.random() * codigos.length)];
};

const generarNumeroCuenta = (): string => {
  return Math.floor(Math.random() * 90000000000 + 10000000000).toString();
};

const generarNumeroRuta = (): string => {
  return Math.floor(Math.random() * 900000000 + 100000000).toString();
};

const generarCuentaDeposito = (): string => {
  return `${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 900000 + 100000)}`;
};

const generarSelloDigital = (): string => {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let resultado = '';
  for (let i = 0; i < 16; i++) {
    resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return resultado;
};
