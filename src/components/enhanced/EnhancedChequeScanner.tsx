import { useState, useRef, useEffect } from 'react';
import { Camera, RotateCcw, Check, AlertCircle, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useCheques } from '@/hooks/useCheques';
import { useToast } from '@/hooks/use-toast';

interface EnhancedChequeScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (chequeData: any) => void;
}

const processingSteps = [
  'Capturando imagen...',
  'Enviando al servidor...',
  'Procesando OCR...',
  'Validando datos...',
  'Guardando resultado...'
];

export const EnhancedChequeScanner = ({ isOpen, onClose, onSuccess }: EnhancedChequeScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { processChequeOCR } = useCheques();
  const { toast } = useToast();

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [currentCamera, setCurrentCamera] = useState<'user' | 'environment'>('environment');

  // Initialize camera
  const startCamera = async () => {
    try {
      setError(null);
      const constraints = {
        video: {
          facingMode: currentCamera,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setError('No se pudo acceder a la cámara. Verifique los permisos.');
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  // Capture photo
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageData);
    stopCamera();
  };

  // Retake photo
  const retakePhoto = () => {
    setCapturedImage(null);
    setError(null);
    startCamera();
  };

  // Switch camera
  const switchCamera = () => {
    setCurrentCamera(prev => prev === 'user' ? 'environment' : 'user');
    stopCamera();
    setTimeout(startCamera, 100);
  };

  // Process image with enhanced UI feedback
  const processImage = async () => {
    if (!capturedImage) return;

    setIsProcessing(true);
    setProcessingStep(0);
    setProgress(0);
    setError(null);

    try {
      // Simulate progress through steps
      for (let i = 0; i < processingSteps.length; i++) {
        setProcessingStep(i);
        setProgress((i / (processingSteps.length - 1)) * 100);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      const result = await processChequeOCR(capturedImage);

      if (result.success) {
        toast({
          title: "¡Éxito!",
          description: "Cheque procesado correctamente",
        });
        
        onSuccess?.(result);
        onClose();
      } else {
        throw new Error(result.error || 'Error al procesar el cheque');
      }
    } catch (error: any) {
      console.error('Error processing image:', error);
      setError(error.message || 'Error al procesar la imagen');
      toast({
        title: "Error de procesamiento",
        description: error.message || 'No se pudo procesar el cheque',
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProcessingStep(0);
      setProgress(0);
    }
  };

  // Handle modal close
  const handleClose = () => {
    stopCamera();
    setCapturedImage(null);
    setError(null);
    setIsProcessing(false);
    onClose();
  };

  // Initialize camera when modal opens
  useEffect(() => {
    if (isOpen && !capturedImage) {
      startCamera();
    }
    
    return () => {
      if (!isOpen) {
        stopCamera();
      }
    };
  }, [isOpen, currentCamera]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Escanear Cheque
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Processing State */}
          {isProcessing && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">
                  {processingSteps[processingStep]}
                </span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {/* Camera View */}
          {!capturedImage && !isProcessing && (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                />
                <canvas ref={canvasRef} className="hidden" />
                
                {/* Camera Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-80 h-48 border-2 border-white border-dashed rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                      Centra el cheque aquí
                    </span>
                  </div>
                </div>
              </div>

              {/* Camera Controls */}
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" onClick={switchCamera}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Cambiar cámara
                </Button>
                
                <Button onClick={capturePhoto} size="lg">
                  <Camera className="h-5 w-5 mr-2" />
                  Capturar
                </Button>
              </div>
            </div>
          )}

          {/* Captured Image Preview */}
          {capturedImage && !isProcessing && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={capturedImage}
                  alt="Cheque capturado"
                  className="w-full rounded-lg border"
                />
                <Badge className="absolute top-2 right-2 bg-green-500">
                  <Check className="h-3 w-3 mr-1" />
                  Capturado
                </Badge>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={retakePhoto}>
                  <X className="h-4 w-4 mr-2" />
                  Tomar otra
                </Button>
                
                <Button onClick={processImage} disabled={isProcessing}>
                  <Check className="h-4 w-4 mr-2" />
                  Procesar cheque
                </Button>
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Asegúrate de que el cheque esté bien iluminado</p>
            <p>• Mantén el cheque plano y dentro del marco</p>
            <p>• Evita reflejos y sombras</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};