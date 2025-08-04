import { useCallback, useRef, useState, useEffect } from 'react';
import { EcuadorianChequeOCRData } from '@/core/types/cheque';

interface UseOCRWorkerReturn {
  processImage: (imageData: ImageData) => Promise<EcuadorianChequeOCRData>;
  isProcessing: boolean;
  error: string | null;
}

export const useOCRWorker = (): UseOCRWorkerReturn => {
  const workerRef = useRef<Worker | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initWorker = useCallback(() => {
    if (!workerRef.current) {
      workerRef.current = new Worker(
        new URL('@/core/lib/ocr.worker.ts', import.meta.url),
        { type: 'module' }
      );
    }
    return workerRef.current;
  }, []);

  const processImage = useCallback(async (imageData: ImageData): Promise<EcuadorianChequeOCRData> => {
    return new Promise((resolve, reject) => {
      setIsProcessing(true);
      setError(null);

      const worker = initWorker();
      const taskId = crypto.randomUUID();

      const timeout = setTimeout(() => {
        setIsProcessing(false);
        setError('Timeout: El procesamiento tomó demasiado tiempo');
        reject(new Error('Timeout'));
      }, 15000); // 15 segundos timeout

      worker.onmessage = (event) => {
        const { type, taskId: responseTaskId, data, error: workerError } = event.data;

        if (responseTaskId !== taskId) return;

        clearTimeout(timeout);
        setIsProcessing(false);

        if (type === 'PROCESS_SUCCESS') {
          resolve(data);
        } else if (type === 'PROCESS_ERROR') {
          setError(workerError || 'Error en el procesamiento OCR');
          reject(new Error(workerError));
        }
      };

      worker.onerror = (error) => {
        clearTimeout(timeout);
        setIsProcessing(false);
        setError('Error del worker OCR');
        reject(error);
      };

      // Enviar tarea al worker
      worker.postMessage({
        type: 'PROCESS_CHEQUE',
        imageData,
        taskId
      });
    });
  }, [initWorker]);

  // Cleanup del worker
  const cleanup = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  }, []);

  // Cleanup al desmontar
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    processImage,
    isProcessing,
    error
  };
};