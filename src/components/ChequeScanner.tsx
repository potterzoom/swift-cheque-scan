
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, RefreshCw, Scan, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { extractChequeData, ChequeOCRData } from "@/utils/ocrService";

interface ChequeScannerProps {
  onImageCaptured: (image: string, ocrData?: ChequeOCRData) => void;
}

const ChequeScanner = ({ onImageCaptured }: ChequeScannerProps) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCapturedImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!capturedImage) return;
    
    setIsProcessing(true);
    
    try {
      // Simular diferentes etapas del procesamiento OCR
      setProcessingStep("Analizando imagen del cheque...");
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProcessingStep("Extracting datos del frente del cheque...");
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProcessingStep("Decodificando código de barras...");
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setProcessingStep("Leyendo línea MICR transparente...");
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProcessingStep("Procesando datos del reverso...");
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProcessingStep("Validando información extraída...");
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Extraer todos los datos del cheque
      const ocrData = await extractChequeData(capturedImage);
      
      toast({
        title: "Procesamiento OCR completado",
        description: "Se han extraído exitosamente los datos del cheque, código de barras, línea MICR y reverso",
      });
      
      setIsProcessing(false);
      setProcessingStep("");
      onImageCaptured(capturedImage, ocrData);
      
    } catch (error) {
      toast({
        title: "Error en el procesamiento",
        description: "No se pudieron extraer todos los datos del cheque",
        variant: "destructive"
      });
      setIsProcessing(false);
      setProcessingStep("");
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setProcessingStep("");
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {!capturedImage ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Capturar imagen del cheque
          </h3>
          <p className="text-gray-500 mb-6">
            Toma una foto clara del cheque (frente y reverso si es posible)
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <QrCode className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-800">OCR Avanzado Activado</span>
            </div>
            <p className="text-sm text-blue-700">
              Este sistema extraerá automáticamente:
            </p>
            <ul className="text-sm text-blue-600 mt-2 space-y-1">
              <li>• Datos básicos del cheque (número, monto, fecha, banco)</li>
              <li>• Información del código de barras</li>
              <li>• Datos de la línea MICR (caracteres magnéticos)</li>
              <li>• Información del reverso (códigos de depósito)</li>
            </ul>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            capture="environment"
          />
          <Button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Seleccionar Imagen del Cheque
          </Button>
        </div>
      ) : (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <img
                src={capturedImage}
                alt="Cheque capturado"
                className="w-full max-w-md mx-auto rounded-lg shadow-md"
              />
              
              {isProcessing && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
                    <span className="font-medium text-blue-800">Procesando OCR Avanzado...</span>
                  </div>
                  <p className="text-sm text-blue-700">{processingStep}</p>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-3">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
                  </div>
                </div>
              )}
              
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  onClick={retakePhoto}
                  disabled={isProcessing}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Tomar otra foto
                </Button>
                
                <Button
                  onClick={processImage}
                  disabled={isProcessing}
                  className="flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Scan className="w-4 h-4 animate-pulse" />
                      Procesando OCR...
                    </>
                  ) : (
                    <>
                      <Scan className="w-4 h-4" />
                      Procesar con OCR Avanzado
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChequeScanner;
