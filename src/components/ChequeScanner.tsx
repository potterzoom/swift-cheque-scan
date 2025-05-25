
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChequeScannerProps {
  onImageCaptured: (image: string) => void;
}

const ChequeScanner = ({ onImageCaptured }: ChequeScannerProps) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
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
    
    // Simular procesamiento OCR
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Procesamiento completado",
      description: "La información del cheque ha sido extraída exitosamente",
    });
    
    setIsProcessing(false);
    onImageCaptured(capturedImage);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
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
          <p className="text-gray-500 mb-4">
            Selecciona una imagen desde tu dispositivo o toma una foto
          </p>
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
            Seleccionar Imagen
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
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4" />
                      Procesar Cheque
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
