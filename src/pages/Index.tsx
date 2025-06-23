
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, FileText, BarChart3, Users } from "lucide-react";
import ChequeScanner from "@/components/ChequeScanner";
import ChequeDashboard from "@/components/ChequeDashboard";
import EnhancedChequeForm from "@/components/EnhancedChequeForm";
import { ChequeOCRData } from "@/utils/ocrService";

const Index = () => {
  const [activeTab, setActiveTab] = useState("scanner");
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [ocrData, setOcrData] = useState<ChequeOCRData | null>(null);
  const [stats, setStats] = useState({
    totalCheques: 0,
    clientesUnicos: 0,
    proveedoresUnicos: 0,
    procesadosHoy: 0
  });

  useEffect(() => {
    // Calcular estadísticas desde localStorage
    const savedCheques = JSON.parse(localStorage.getItem('cheques') || '[]');
    
    const hoy = new Date().toDateString();
    const procesadosHoy = savedCheques.filter((cheque: any) => 
      new Date(cheque.fechaProcesamiento).toDateString() === hoy
    ).length;

    const clientesUnicos = new Set(
      savedCheques.filter((c: any) => c.tipo === 'cliente').map((c: any) => c.emisor)
    ).size;

    const proveedoresUnicos = new Set(
      savedCheques.filter((c: any) => c.tipo === 'proveedor').map((c: any) => c.emisor)
    ).size;

    setStats({
      totalCheques: savedCheques.length,
      clientesUnicos,
      proveedoresUnicos,
      procesadosHoy
    });
  }, [activeTab]); // Recalcular cuando cambie de pestaña

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Swift Cheque Scan
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Sistema inteligente de procesamiento de cheques
          </p>
          <p className="text-sm text-blue-600 font-medium">
            ✨ Con OCR Avanzado: Código de Barras + Línea MICR + Datos del Reverso
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="scanner" className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Escanear
            </TabsTrigger>
            <TabsTrigger value="form" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Procesar
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
          </TabsList>

          {/* Scanner Tab */}
          <TabsContent value="scanner">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Escanear Cheque con OCR Avanzado
                </CardTitle>
                <CardDescription>
                  Toma una foto del cheque para extraer automáticamente toda la información incluyendo código de barras, línea MICR y datos del reverso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChequeScanner 
                  onImageCaptured={(image, extractedData) => {
                    setScannedImage(image);
                    setOcrData(extractedData || null);
                    setActiveTab("form");
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Form Tab */}
          <TabsContent value="form">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Datos Completos del Cheque
                </CardTitle>
                <CardDescription>
                  Revisa y completa toda la información extraída del cheque mediante OCR avanzado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EnhancedChequeForm 
                  ocrData={ocrData}
                  scannedImage={scannedImage}
                  onSave={() => setActiveTab("dashboard")}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Dashboard de Cheques
                </CardTitle>
                <CardDescription>
                  Historial y gestión de todos los cheques procesados con OCR avanzado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChequeDashboard />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Stats Cards - Ahora con datos dinámicos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Cheques</p>
                  <p className="text-2xl font-bold">{stats.totalCheques}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Clientes</p>
                  <p className="text-2xl font-bold">{stats.clientesUnicos}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Proveedores</p>
                  <p className="text-2xl font-bold">{stats.proveedoresUnicos}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Camera className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Hoy</p>
                  <p className="text-2xl font-bold">{stats.procesadosHoy}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
