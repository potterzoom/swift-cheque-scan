
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, FileText, BarChart3, Users, Flag } from "lucide-react";
import ChequeScanner from "@/components/ChequeScanner";
import ChequeDashboard from "@/components/ChequeDashboard";
import EcuadorianChequeForm from "@/components/EcuadorianChequeForm";
import { EcuadorianChequeOCRData } from "@/utils/ecuadorianOCRService";

const Index = () => {
  const [activeTab, setActiveTab] = useState("scanner");
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [ocrData, setOcrData] = useState<EcuadorianChequeOCRData | null>(null);
  const [stats, setStats] = useState({
    totalCheques: 0,
    clientesUnicos: 0,
    proveedoresUnicos: 0,
    procesadosHoy: 0,
    validacionesExitosas: 0,
    fondosVerificados: 0
  });

  useEffect(() => {
    // Calcular estadísticas desde localStorage (cheques ecuatorianos)
    const savedCheques = JSON.parse(localStorage.getItem('chequesEcuador') || '[]');
    
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

    const validacionesExitosas = savedCheques.filter((c: any) => 
      c.beneficiario?.validacionOK === true
    ).length;

    const fondosVerificados = savedCheques.filter((c: any) => 
      c.verificacionBancaria?.fondosDisponibles === true
    ).length;

    setStats({
      totalCheques: savedCheques.length,
      clientesUnicos,
      proveedoresUnicos,
      procesadosHoy,
      validacionesExitosas,
      fondosVerificados
    });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Swift Cheque Scan
            </h1>
            <Flag className="w-8 h-8 text-yellow-500" />
            <span className="text-2xl font-bold text-blue-600">Ecuador</span>
          </div>
          <p className="text-xl text-gray-600 mb-2">
            Sistema especializado para cheques ecuatorianos
          </p>
          <div className="flex justify-center items-center gap-4 text-sm">
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
              🏦 Bancos Ecuatorianos
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              📋 Validación RUC/Cédula
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              ✅ Comprobantes SRI
            </span>
          </div>
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
                  <Flag className="w-4 h-4 text-yellow-500" />
                  OCR Especializado para Ecuador
                </CardTitle>
                <CardDescription>
                  Sistema OCR adaptado para cheques ecuatorianos con validación de RUC/Cédula, verificación bancaria y generación de comprobantes SRI
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
                  <Flag className="w-4 h-4 text-yellow-500" />
                  Datos Completos - Cheque Ecuatoriano
                </CardTitle>
                <CardDescription>
                  Información extraída con validaciones específicas para Ecuador: RUC/Cédula, verificación bancaria y cumplimiento SRI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EcuadorianChequeForm 
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

        {/* Stats Cards específicas para Ecuador */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Total Cheques</p>
                  <p className="text-lg font-bold">{stats.totalCheques}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-xs text-gray-600">Clientes</p>
                  <p className="text-lg font-bold">{stats.clientesUnicos}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">Proveedores</p>
                  <p className="text-lg font-bold">{stats.proveedoresUnicos}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Camera className="w-6 h-6 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-600">Hoy</p>
                  <p className="text-lg font-bold">{stats.procesadosHoy}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Flag className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-xs text-gray-600">RUC/Cédula OK</p>
                  <p className="text-lg font-bold">{stats.validacionesExitosas}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">💰</span>
                <div>
                  <p className="text-xs text-gray-600">Fondos OK</p>
                  <p className="text-lg font-bold">{stats.fondosVerificados}</p>
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
