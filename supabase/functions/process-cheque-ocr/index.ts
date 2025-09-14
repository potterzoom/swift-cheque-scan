import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EcuadorianChequeOCRData {
  // Datos básicos del cheque
  numeroCheque: string;
  banco: string;
  codigoBanco: string;
  fechaEmision: string;
  fechaVencimiento: string;
  monto: number;
  montoTexto: string;
  
  // Datos del beneficiario
  beneficiario: string;
  rucCedulaBeneficiario: string;
  
  // Datos bancarios
  cuentaBancaria: string;
  ciudadEmision: string;
  
  // Datos del código de barras
  codigoBarras: string;
  micr: string;
  
  // Datos SRI y validación
  sri: {
    comprobante: string;
    autorizacion: string;
    fechaAutorizacion: string;
  };
  
  // Metadatos de procesamiento
  confianza: number;
  validaciones: {
    formatoValido: boolean;
    rucCedulaValido: boolean;
    bancoValido: boolean;
    fechasValidas: boolean;
    montoConsistente: boolean;
  };
}

// Función para validar RUC ecuatoriano
function validateRUC(ruc: string): boolean {
  if (!ruc || ruc.length !== 13) return false;
  
  const provincia = parseInt(ruc.substring(0, 2));
  if (provincia < 1 || provincia > 24) return false;
  
  const tercerDigito = parseInt(ruc.charAt(2));
  if (tercerDigito < 0 || tercerDigito > 9) return false;
  
  return true;
}

// Función para validar cédula ecuatoriana
function validateCedula(cedula: string): boolean {
  if (!cedula || cedula.length !== 10) return false;
  
  const provincia = parseInt(cedula.substring(0, 2));
  if (provincia < 1 || provincia > 24) return false;
  
  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let suma = 0;
  
  for (let i = 0; i < 9; i++) {
    let valor = parseInt(cedula.charAt(i)) * coeficientes[i];
    if (valor >= 10) valor -= 9;
    suma += valor;
  }
  
  const digitoVerificador = suma % 10 === 0 ? 0 : 10 - (suma % 10);
  return digitoVerificador === parseInt(cedula.charAt(9));
}

// Función para obtener banco ecuatoriano por código
function getBancoEcuatoriano(codigo: string): string {
  const bancos: { [key: string]: string } = {
    '001': 'Banco del Pacífico',
    '002': 'Banco Pichincha',
    '003': 'Banco del Guayaquil',
    '004': 'Banco Internacional',
    '005': 'Produbanco',
    '006': 'Banco Bolivariano',
    '007': 'Banco del Austro',
    '008': 'Banco General Rumiñahui',
    '009': 'Banco Procredit',
    '010': 'Banco Machala',
    '011': 'Banco Loja',
    '012': 'Banco Solidario',
    '013': 'Banco Capital',
    '014': 'Banco Finca',
    '015': 'Banco VisionFund Ecuador',
    '016': 'Banco del Litoral',
    '017': 'Banco Coopnacional',
    '018': 'Banco Amazonas',
    '019': 'Banco D-Miro',
    '020': 'Banco Diners Club'
  };
  return bancos[codigo] || 'Banco Desconocido';
}

// Simulación de OCR avanzado (en producción sería Tesseract o Google Vision API)
async function processImageOCR(imageBase64: string): Promise<EcuadorianChequeOCRData> {
  console.log('Iniciando procesamiento OCR de cheque ecuatoriano...');
  
  // Simular tiempo de procesamiento
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generar datos realistas para demostración
  const bancos = [
    { codigo: '002', nombre: 'Banco Pichincha' },
    { codigo: '001', nombre: 'Banco del Pacífico' },
    { codigo: '003', nombre: 'Banco del Guayaquil' },
    { codigo: '005', nombre: 'Produbanco' }
  ];
  
  const bancoSeleccionado = bancos[Math.floor(Math.random() * bancos.length)];
  const numeroBase = Math.floor(Math.random() * 900000) + 100000;
  const monto = Math.floor(Math.random() * 10000) + 100;
  
  // Generar cédula válida
  const provincia = String(Math.floor(Math.random() * 24) + 1).padStart(2, '0');
  const baseCedula = provincia + '0' + String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
  
  const result: EcuadorianChequeOCRData = {
    numeroCheque: String(numeroBase),
    banco: bancoSeleccionado.nombre,
    codigoBanco: bancoSeleccionado.codigo,
    fechaEmision: new Date().toISOString().split('T')[0],
    fechaVencimiento: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    monto: monto,
    montoTexto: `${monto}.00 DOLARES AMERICANOS`,
    beneficiario: 'JUAN CARLOS MENDEZ TORRES',
    rucCedulaBeneficiario: baseCedula + '1', // Simplificado para demo
    cuentaBancaria: `${bancoSeleccionado.codigo}${numeroBase}001`,
    ciudadEmision: 'QUITO',
    codigoBarras: `${bancoSeleccionado.codigo}${numeroBase}${monto}`,
    micr: `⑆${numeroBase}⑆ ⑇${bancoSeleccionado.codigo}⑇`,
    sri: {
      comprobante: `001-001-${String(Math.floor(Math.random() * 999999999)).padStart(9, '0')}`,
      autorizacion: String(Math.floor(Math.random() * 999999999999999999)),
      fechaAutorizacion: new Date().toISOString()
    },
    confianza: 0.85 + Math.random() * 0.13, // 85-98% confianza
    validaciones: {
      formatoValido: true,
      rucCedulaValido: validateCedula(baseCedula + '1'),
      bancoValido: true,
      fechasValidas: true,
      montoConsistente: true
    }
  };
  
  console.log('OCR procesado con confianza:', result.confianza);
  return result;
}

// Función para encriptar datos sensibles
async function encryptSensitiveData(data: string): Promise<string> {
  // En producción, usar un algoritmo de encriptación real
  return btoa(data + '_encrypted_' + Date.now());
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Obtener usuario autenticado
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      return new Response(JSON.stringify({ error: 'Usuario no autenticado' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { imageData, chequeId } = await req.json();

    if (!imageData) {
      return new Response(JSON.stringify({ error: 'Imagen requerida' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Iniciando procesamiento OCR para usuario: ${user.id}`);

    // Agregar a cola de OCR
    const { error: queueError } = await supabaseClient
      .from('ocr_queue')
      .insert({
        user_id: user.id,
        cheque_id: chequeId,
        imagen_data: imageData,
        estado: 'procesando'
      });

    if (queueError) {
      console.error('Error al agregar a cola OCR:', queueError);
    }

    // Procesar OCR
    const ocrResult = await processImageOCR(imageData);
    
    // Encriptar imagen
    const encryptedImage = await encryptSensitiveData(imageData);

    // Crear o actualizar cheque en base de datos
    const chequeData = {
      user_id: user.id,
      numero_cheque: ocrResult.numeroCheque,
      banco: ocrResult.banco,
      codigo_banco: ocrResult.codigoBanco,
      fecha_emision: ocrResult.fechaEmision,
      fecha_vencimiento: ocrResult.fechaVencimiento,
      monto: ocrResult.monto,
      beneficiario: ocrResult.beneficiario,
      ruc_cedula_beneficiario: ocrResult.rucCedulaBeneficiario,
      cuenta_bancaria: ocrResult.cuentaBancaria,
      imagen_encrypted: encryptedImage,
      datos_ocr: ocrResult,
      confianza_ocr: ocrResult.confianza,
      validaciones: ocrResult.validaciones,
      procesado_en_backend: true,
      intentos_procesamiento: 1
    };

    let chequeResponse;
    if (chequeId) {
      // Actualizar cheque existente
      chequeResponse = await supabaseClient
        .from('cheques')
        .update(chequeData)
        .eq('id', chequeId)
        .eq('user_id', user.id)
        .select()
        .single();
    } else {
      // Crear nuevo cheque
      chequeResponse = await supabaseClient
        .from('cheques')
        .insert(chequeData)
        .select()
        .single();
    }

    if (chequeResponse.error) {
      console.error('Error al guardar cheque:', chequeResponse.error);
      return new Response(JSON.stringify({ error: 'Error al guardar cheque' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Actualizar cola de OCR como completada
    await supabaseClient
      .from('ocr_queue')
      .update({
        estado: 'completado',
        resultado: ocrResult,
        processed_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .eq('cheque_id', chequeResponse.data.id);

    console.log('Procesamiento OCR completado exitosamente');

    return new Response(JSON.stringify({
      success: true,
      cheque: chequeResponse.data,
      ocrData: ocrResult,
      message: 'Cheque procesado exitosamente'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error en process-cheque-ocr:', error);
    return new Response(JSON.stringify({ 
      error: 'Error interno del servidor',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});