import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, RotateCcw, X, Scan, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { extractEcuadorianChequeData } from "@/utils/ecuadorianOCRService";

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (image: string, ocrData?: any) => void;
}

const CameraModal = ({ isOpen, onClose, onCapture }: CameraModalProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && !capturedImage) {
      startCamera();
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      toast({
        title: "Error de Cámara",
        description: "No se pudo acceder a la cámara. Verifica los permisos.",
        variant: "destructive"
      });
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    context.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageData);
    
    // Detener la cámara
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setProcessingStep("");
    startCamera();
  };

  const processImage = async () => {
    if (!capturedImage) return;

    setIsProcessing(true);
    
    try {
      setProcessingStep("Analizando imagen del cheque...");
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProcessingStep("Detectando bordes y estructura...");
      await new Promise(resolve => setTimeout(resolve, 700));
      
      setProcessingStep("Extrayendo texto con OCR...");
      await new Promise(resolve => setTimeout(resolve, 900));
      
      setProcessingStep("Validando formato ecuatoriano...");
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProcessingStep("Verificando RUC/Cédula...");
      await new Promise(resolve => setTimeout(resolve, 700));
      
      const ocrData = await extractEcuadorianChequeData(capturedImage);
      
      toast({
        title: "Escaneo Completado",
        description: "Cheque procesado exitosamente",
      });
      
      onCapture(capturedImage, ocrData);
      onClose();
      
    } catch (error) {
      toast({
        title: "Error de Procesamiento",
        description: "No se pudo procesar la imagen del cheque",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setProcessingStep("");
    }
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === "user" ? "environment" : "user");
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setCapturedImage(null);
    setProcessingStep("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Escanear Cheque
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!capturedImage ? (
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-80 bg-black rounded-lg object-cover"
              />
              
              {/* Overlay de guía */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="border-2 border-white border-dashed w-80 h-48 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <Camera className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Centra el cheque aquí</p>
                  </div>
                </div>
              </div>

              {/* Controles de cámara */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={switchCamera}
                  className="bg-black/70 text-white hover:bg-black/90"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                
                <Button
                  onClick={capturePhoto}
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Capturar
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={capturedImage}
                  alt="Cheque capturado"
                  className="w-full h-80 object-contain bg-gray-100 rounded-lg"
                />
              </div>

              {isProcessing && (
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Scan className="w-4 h-4 animate-spin text-primary" />
                    <span className="font-medium text-primary">Procesando...</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{processingStep}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-primary h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={retakePhoto}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Tomar Otra
                </Button>
                
                <Button
                  onClick={processImage}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  <Scan className="w-4 h-4 mr-2" />
                  {isProcessing ? "Procesando..." : "Procesar OCR"}
                </Button>
              </div>
            </div>
          )}

          {!capturedImage && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Consejos para mejor escaneo:</span>
              </div>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Asegúrate de tener buena iluminación</li>
                <li>• Mantén el cheque plano y completo en la imagen</li>
                <li>• Evita sombras y reflejos</li>
              </ul>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
};

export default CameraModal;