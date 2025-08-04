// Web Worker para procesamiento OCR en segundo plano
import { EcuadorianChequeOCRData } from '@/core/types/cheque';

// Simulación de procesamiento OCR para cheques ecuatorianos
// En producción aquí iría Tesseract.js u otra librería OCR
async function processEcuadorianCheque(imageData: ImageData): Promise<EcuadorianChequeOCRData> {
  // Simular tiempo de procesamiento
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  // Patrones específicos para cheques ecuatorianos
  const bancos = [
    'Banco Pichincha',
    'Banco del Guayaquil', 
    'Banco del Pacífico',
    'Banco Internacional',
    'Produbanco'
  ];
  
  const randomBanco = bancos[Math.floor(Math.random() * bancos.length)];
  
  // Generar datos simulados realistas
  const mockData: EcuadorianChequeOCRData = {
    numero: `${Math.floor(Math.random() * 900000) + 100000}`,
    banco: randomBanco,
    cuenta: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    monto: Math.floor(Math.random() * 50000) + 100,
    fechaEmision: new Date().toISOString().split('T')[0],
    emisor: `Empresa Demo ${Math.floor(Math.random() * 100)}`,
    beneficiario: `Cliente ${Math.floor(Math.random() * 100)}`,
    rucCedula: `${Math.floor(Math.random() * 9000000000) + 1000000000}001`,
    confidence: 0.85 + Math.random() * 0.10 // 85-95%
  };
  
  return mockData;
}

// Manejar mensajes del hilo principal
self.onmessage = async (event) => {
  const { type, imageData, taskId } = event.data;
  
  try {
    if (type === 'PROCESS_CHEQUE') {
      const result = await processEcuadorianCheque(imageData);
      
      self.postMessage({
        type: 'PROCESS_SUCCESS',
        taskId,
        data: result
      });
    }
  } catch (error) {
    self.postMessage({
      type: 'PROCESS_ERROR',
      taskId,
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

// Exportar para tipado TypeScript
export {};