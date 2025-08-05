
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, FileText, BarChart3, Shield } from "lucide-react";
import ChequeScanner from "@/components/ChequeScanner";
import ChequeDashboard from "@/components/ChequeDashboard";
import EcuadorianChequeForm from "@/components/EcuadorianChequeForm";
import AppHeader from "@/components/layout/AppHeader";
import StatsGrid from "@/components/layout/StatsGrid";
import Footer from "@/components/layout/Footer";
import { useScanStore } from "@/features/scan/store/useScanStore";
import { useChequesStore } from "@/features/cheques/store/useChequesStore";
import { EcuadorianChequeOCRData as LegacyOCRData } from "@/utils/ecuadorianOCRService";

const Index = () => {
  const [activeTab, setActiveTab] = useState("scanner");
  
  // Zustand stores
  const { scannedImage, ocrData, setScanResult } = useScanStore();
  const { getStats } = useChequesStore();
  
  // Obtener estadísticas dinámicas
  const stats = getStats();

  // Función helper para convertir el OCR data legacy al nuevo formato
  const convertLegacyOCRData = (legacyData: LegacyOCRData | null) => {
    if (!legacyData) return null;
    
    return {
      numero: legacyData.numero,
      banco: legacyData.banco,
      cuenta: legacyData.datosBancarios?.numeroCuenta || '',
      monto: parseFloat(legacyData.monto) || 0,
      fechaEmision: legacyData.fecha,
      emisor: legacyData.emisor,
      beneficiario: legacyData.beneficiario?.nombre || '',
      rucCedula: legacyData.beneficiario?.ruc || legacyData.beneficiario?.cedula || '',
      confidence: 0.85
    };
  };

  return (
    <div className="min-h-screen gradient-ocean">
      <div className="container mx-auto px-4 py-8">
        <AppHeader />

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-card/80 backdrop-blur-sm border-border/50">
            <TabsTrigger value="scanner" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Camera className="w-4 h-4" />
              Escanear
            </TabsTrigger>
            <TabsTrigger value="form" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="w-4 h-4" />
              Procesar
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
          </TabsList>

          {/* Scanner Tab */}
          <TabsContent value="scanner">
            <Card className="card-natural">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" />
                  <Shield className="w-4 h-4 text-secondary" />
                  OCR Especializado para Ecuador
                </CardTitle>
                <CardDescription>
                  Sistema OCR adaptado para cheques ecuatorianos con validación de RUC/Cédula, verificación bancaria y generación de comprobantes SRI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChequeScanner 
                  onImageCaptured={(image, extractedData) => {
                    const convertedData = convertLegacyOCRData(extractedData);
                    setScanResult(image, convertedData);
                    setActiveTab("form");
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Form Tab */}
          <TabsContent value="form">
            <Card className="card-natural">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <Shield className="w-4 h-4 text-secondary" />
                  Datos Completos - Cheque Ecuatoriano
                </CardTitle>
                <CardDescription>
                  Información extraída con validaciones específicas para Ecuador: RUC/Cédula, verificación bancaria y cumplimiento SRI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EcuadorianChequeForm 
                  ocrData={ocrData as any}
                  scannedImage={scannedImage}
                  onSave={() => setActiveTab("dashboard")}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <Card className="card-natural">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Dashboard Ecuador
                </CardTitle>
                <CardDescription>
                  Gestión y estadísticas de cheques procesados con validaciones ecuatorianas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChequeDashboard />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Stats Grid */}
        <StatsGrid stats={stats} />
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
