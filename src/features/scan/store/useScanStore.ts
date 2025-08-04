import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ChequeEcuador, EcuadorianChequeOCRData, ScanResult } from '@/core/types/cheque';

interface ScanState {
  // Estado del escaneo
  isScanning: boolean;
  isProcessing: boolean;
  scannedImage: string | null;
  ocrData: EcuadorianChequeOCRData | null;
  currentCheque: ChequeEcuador | null;
  
  // Errores y mensajes
  error: string | null;
  successMessage: string | null;
  
  // Acciones
  startScan: () => void;
  setScanResult: (image: string, ocrData: EcuadorianChequeOCRData | null) => void;
  setProcessing: (processing: boolean) => void;
  updateCurrentCheque: (cheque: Partial<ChequeEcuador>) => void;
  clearScanData: () => void;
  setError: (error: string | null) => void;
  setSuccessMessage: (message: string | null) => void;
}

export const useScanStore = create<ScanState>()(
  devtools(
    (set, get) => ({
      // Estado inicial
      isScanning: false,
      isProcessing: false,
      scannedImage: null,
      ocrData: null,
      currentCheque: null,
      error: null,
      successMessage: null,

      // Acciones
      startScan: () => {
        set({
          isScanning: true,
          scannedImage: null,
          ocrData: null,
          error: null,
          successMessage: null
        });
      },

      setScanResult: (image, ocrData) => {
        set({
          isScanning: false,
          scannedImage: image,
          ocrData,
          error: ocrData ? null : 'No se pudo extraer información del cheque'
        });
      },

      setProcessing: (processing) => {
        set({ isProcessing: processing });
      },

      updateCurrentCheque: (chequeUpdate) => {
        const current = get().currentCheque;
        if (current) {
          set({
            currentCheque: { ...current, ...chequeUpdate }
          });
        } else {
          // Crear nuevo cheque con datos básicos
          const newCheque: ChequeEcuador = {
            id: crypto.randomUUID(),
            numero: '',
            banco: 'Banco Pichincha',
            cuenta: '',
            monto: 0,
            fechaEmision: new Date(),
            fechaVencimiento: new Date(),
            emisor: '',
            rucCedulaEmisor: '',
            beneficiario: '',
            rucCedulaBeneficiario: '',
            tipo: 'cliente',
            estado: 'pendiente',
            fechaProcesamiento: new Date(),
            ...chequeUpdate
          };
          set({ currentCheque: newCheque });
        }
      },

      clearScanData: () => {
        set({
          isScanning: false,
          isProcessing: false,
          scannedImage: null,
          ocrData: null,
          currentCheque: null,
          error: null,
          successMessage: null
        });
      },

      setError: (error) => {
        set({ error, successMessage: null });
      },

      setSuccessMessage: (message) => {
        set({ successMessage: message, error: null });
      }
    }),
    { name: 'scan-store' }
  )
);