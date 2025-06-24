
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, RefreshCw, Scan, QrCode, Flag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { extractEcuadorianChequeData, EcuadorianChequeOCRData } from "@/utils/ecuadorianOCRService";

interface ChequeScannerProps {
  onImageCaptured: (image: string, ocrData?: EcuadorianChequeOCRData) => void;
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
      // Simular diferentes etapas del procesamiento OCR ecuatoriano
      setProcessingStep("Analizando cheque ecuatoriano...");
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProcessingStep("Validando formato de bancos locales...");
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProcessingStep("Extrayendo RUC/Cédula del beneficiario...");
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProcessingStep("Consultando APIs bancarias ecuatorianas...");
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setProcessingStep("Verificando fondos con el banco...");
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProcessingStep("Generando comprobante SRI...");
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProcessingStep("Validando datos con autoridades...");
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Extraer datos específicos para Ecuador
      const ocrData = await extractEcuadorianChequeData(capturedImage);
      
      toast({
        title: "OCR Ecuatoriano completado",
        description: `Cheque procesado con validación ${ocrData.beneficiario.validacionOK ? 'exitosa' : 'fallida'} de ${ocrData.beneficiario.tipoDocumento}`,
      });
      
      setIsProcessing(false);
      setProcessingStep("");
      onImageCaptured(capturedImage, ocrData);
      
    } catch (error) {
      toast({
        title: "Error en el procesamiento",
        description: "No se pudieron validar los datos del cheque ecuatoriano",
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
          <div className="flex justify-center items-center gap-2 mb-4">
            <Camera className="w-16 h-16 text-gray-400" />
            <Flag className="w-8 h-8 text-yellow-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Escanear Cheque Ecuatoriano
          </h3>
          <p className="text-gray-500 mb-6">
            Sistema OCR especializado para cheques de bancos ecuatorianos
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <QrCode className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-800">OCR Ecuatoriano Especializado</span>
            </div>
            <p className="text-sm text-blue-700 mb-2">
              Sistema adaptado específicamente para Ecuador:
            </p>
            <ul className="text-sm text-blue-600 space-y-1 text-left">
              <li>• ✅ Validación automática de RUC y Cédula</li>
              <li>• 🏦 Integración con bancos ecuatorianos</li>
              <li>• 💰 Verificación de fondos en tiempo real</li>
              <li>• 📋 Generación de comprobantes SRI</li>
              <li>• 🌎 Reconocimiento de provincias del Ecuador</li>
              <li>• 📊 Cálculo automático de IVA (12%)</li>
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
            Seleccionar Cheque Ecuatoriano
          </Button>
        </div>
      ) : (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <img
                src={capturedImage}
                alt="Cheque ecuatoriano capturado"
                className="w-full max-w-md mx-auto rounded-lg shadow-md"
              />
              
              {isProcessing && (
                <div className="bg-gradient-to-r from-yellow-50 to-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
                    <Flag className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium text-blue-800">Procesando OCR Ecuatoriano...</span>
                  </div>
                  <p className="text-sm text-blue-700">{processingStep}</p>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-3">
                    <div className="bg-gradient-to-r from-yellow-400 to-blue-600 h-2 rounded-full animate-pulse" style={{width: '80%'}}></div>
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
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Scan className="w-4 h-4" />
                      <Flag className="w-3 h-3" />
                      Procesar OCR Ecuatoriano
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
