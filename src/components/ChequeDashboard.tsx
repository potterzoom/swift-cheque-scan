
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, DollarSign, Calendar, Building, BarChart3, Bell, Camera, Plus } from "lucide-react";
import DashboardStats from "./DashboardStats";
import DashboardAlerts from "./DashboardAlerts";
import CameraModal from "./CameraModal";
import { useToast } from "@/hooks/use-toast";

interface Cheque {
  id: string;
  numero: string;
  monto: string;
  banco: string;
  fecha: string;
  emisor: string;
  tipo: string;
  estado: string;
  fechaProcesamiento: string;
  imagen?: string;
}

const ChequeDashboard = () => {
  const [cheques, setCheques] = useState<Cheque[]>([]);
  const [filteredCheques, setFilteredCheques] = useState<Cheque[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("todos");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [activeView, setActiveView] = useState("resumen");
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedCheques = JSON.parse(localStorage.getItem('cheques') || '[]');
    setCheques(savedCheques);
    setFilteredCheques(savedCheques);
  }, []);

  useEffect(() => {
    let filtered = cheques;

    if (searchTerm) {
      filtered = filtered.filter(cheque =>
        cheque.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cheque.emisor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cheque.banco.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== "todos") {
      filtered = filtered.filter(cheque => cheque.tipo === filterType);
    }

    if (filterStatus !== "todos") {
      filtered = filtered.filter(cheque => cheque.estado === filterStatus);
    }

    setFilteredCheques(filtered);
  }, [cheques, searchTerm, filterType, filterStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'aprobado': return 'bg-green-100 text-green-800';
      case 'rechazado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cliente': return 'bg-blue-100 text-blue-800';
      case 'proveedor': return 'bg-purple-100 text-purple-800';
      case 'mayorista': return 'bg-orange-100 text-orange-800';
      case 'interno': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCameraCapture = (image: string, ocrData?: any) => {
    if (ocrData) {
      const newCheque: Cheque = {
        id: Date.now().toString(),
        numero: ocrData.numero || `CHQ-${Date.now()}`,
        monto: ocrData.monto?.toString() || "0",
        banco: ocrData.banco || "Banco detectado",
        fecha: ocrData.fechaEmision || new Date().toISOString().split('T')[0],
        emisor: ocrData.emisor || "Emisor detectado",
        tipo: "cliente",
        estado: "pendiente",
        fechaProcesamiento: new Date().toISOString(),
        imagen: image
      };

      const updatedCheques = [...cheques, newCheque];
      setCheques(updatedCheques);
      localStorage.setItem('cheques', JSON.stringify(updatedCheques));
      
      toast({
        title: "Cheque Escaneado",
        description: `Cheque #${newCheque.numero} agregado exitosamente`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Botón de escaneo rápido */}
      <div className="flex justify-end">
        <Button
          onClick={() => setIsCameraModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Camera className="w-4 h-4" />
          Escanear Cheque
        </Button>
      </div>

      {/* Vista con pestañas */}
      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="resumen" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Resumen
          </TabsTrigger>
          <TabsTrigger value="alertas" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Alertas
          </TabsTrigger>
          <TabsTrigger value="lista" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Lista
          </TabsTrigger>
        </TabsList>

        {/* Pestaña de Resumen con Estadísticas */}
        <TabsContent value="resumen">
          <DashboardStats cheques={cheques} />
        </TabsContent>

        {/* Pestaña de Alertas */}
        <TabsContent value="alertas">
          <DashboardAlerts cheques={cheques} />
        </TabsContent>

        {/* Pestaña de Lista (funcionalidad original) */}
        <TabsContent value="lista">
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por número, emisor o banco..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Tipo de cheque" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los tipos</SelectItem>
                  <SelectItem value="cliente">Cliente</SelectItem>
                  <SelectItem value="proveedor">Proveedor</SelectItem>
                  <SelectItem value="mayorista">Mayorista</SelectItem>
                  <SelectItem value="interno">Interno</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="aprobado">Aprobado</SelectItem>
                  <SelectItem value="rechazado">Rechazado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Cheques List */}
            <div className="grid gap-4">
              {filteredCheques.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      No hay cheques procesados
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Comienza escaneando tu primer cheque
                    </p>
                    <Button
                      onClick={() => setIsCameraModalOpen(true)}
                      className="flex items-center gap-2 mx-auto"
                    >
                      <Camera className="w-4 h-4" />
                      Escanear Primer Cheque
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredCheques.map((cheque) => (
                  <Card key={cheque.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <h3 className="font-semibold text-lg">
                              Cheque #{cheque.numero}
                            </h3>
                            <Badge className={getTypeColor(cheque.tipo)}>
                              {cheque.tipo}
                            </Badge>
                            <Badge className={getStatusColor(cheque.estado)}>
                              {cheque.estado}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              ${cheque.monto}
                            </div>
                            <div className="flex items-center gap-1">
                              <Building className="w-4 h-4" />
                              {cheque.banco}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(cheque.fecha).toLocaleDateString()}
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-700">
                            <strong>Emisor:</strong> {cheque.emisor}
                          </p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Ver Detalles
                          </Button>
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de Cámara */}
      <CameraModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onCapture={handleCameraCapture}
      />
    </div>
  );
};

export default ChequeDashboard;
