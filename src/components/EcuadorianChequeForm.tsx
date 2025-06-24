
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Save, DollarSign, CreditCard, QrCode, Scan, MapPin, FileText, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EcuadorianChequeOCRData } from "@/utils/ecuadorianOCRService";

interface EcuadorianChequeFormProps {
  ocrData?: EcuadorianChequeOCRData | null;
  scannedImage?: string | null;
  onSave: () => void;
}

const EcuadorianChequeForm = ({ ocrData, scannedImage, onSave }: EcuadorianChequeFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    ...ocrData,
    tipo: "cliente",
    referencia: `ECU-${Date.now().toString().slice(-6)}`,
  });

  const handleSave = () => {
    const savedCheques = JSON.parse(localStorage.getItem('chequesEcuador') || '[]');
    const newCheque = {
      ...formData,
      id: Date.now().toString(),
      fechaProcesamiento: new Date().toISOString(),
      estado: ocrData?.verificacionBancaria.fondosDisponibles ? 'aprobado' : 'pendiente_verificacion',
      imagen: scannedImage,
      pais: 'Ecuador',
      datosCompletos: true
    };
    
    savedCheques.push(newCheque);
    localStorage.setItem('chequesEcuador', JSON.stringify(savedCheques));
    
    toast({
      title: "Cheque ecuatoriano procesado",
      description: `Se ha procesado el cheque con validación ${ocrData?.beneficiario.validacionOK ? 'exitosa' : 'fallida'} de ${ocrData?.beneficiario.tipoDocumento}`,
    });
    
    onSave();
  };

  if (!ocrData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No hay datos de cheque para mostrar</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {scannedImage && (
        <Card>
          <CardContent className="p-4">
            <img
              src={scannedImage}
              alt="Cheque ecuatoriano escaneado"
              className="w-full max-w-sm mx-auto rounded-lg shadow-sm"
            />
          </CardContent>
        </Card>
      )}

      {/* Alertas de validación */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={`border-2 ${ocrData.beneficiario.validacionOK ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              {ocrData.beneficiario.validacionOK ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-600" />
              )}
              <div>
                <p className="text-sm font-medium">Validación {ocrData.beneficiario.tipoDocumento}</p>
                <p className={`text-xs ${ocrData.beneficiario.validacionOK ? 'text-green-600' : 'text-red-600'}`}>
                  {ocrData.beneficiario.validacionOK ? 'Válido' : 'Inválido'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`border-2 ${ocrData.verificacionBancaria.fondosDisponibles ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              {ocrData.verificacionBancaria.fondosDisponibles ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              )}
              <div>
                <p className="text-sm font-medium">Verificación Bancaria</p>
                <p className={`text-xs ${ocrData.verificacionBancaria.fondosDisponibles ? 'text-green-600' : 'text-yellow-600'}`}>
                  {ocrData.verificacionBancaria.fondosDisponibles ? 'Fondos OK' : 'Sin fondos'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`border-2 ${ocrData.sri.requiereFacturacion ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Obligación SRI</p>
                <p className="text-xs text-blue-600">
                  {ocrData.sri.requiereFacturacion ? 'Requiere facturación' : 'No requiere facturación'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="basicos" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basicos">Básicos</TabsTrigger>
          <TabsTrigger value="beneficiario">Beneficiario</TabsTrigger>
          <TabsTrigger value="bancarios">Bancarios</TabsTrigger>
          <TabsTrigger value="sri">SRI</TabsTrigger>
          <TabsTrigger value="verificacion">Verificación</TabsTrigger>
        </TabsList>

        <TabsContent value="basicos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Información Básica del Cheque
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Número de Cheque</Label>
                <Input value={ocrData.numero} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>Monto</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input value={`$${ocrData.monto}`} readOnly className="pl-10 bg-gray-50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Banco Emisor</Label>
                <Input value={ocrData.banco} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>Fecha</Label>
                <Input value={ocrData.fecha} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Emisor</Label>
                <Input value={ocrData.emisor} readOnly className="bg-gray-50" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="beneficiario">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Datos del Beneficiario
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nombre</Label>
                <Input value={ocrData.beneficiario.nombre} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>Tipo de Documento</Label>
                <div className="flex items-center gap-2">
                  <Badge variant={ocrData.beneficiario.tipoDocumento === 'RUC' ? 'default' : 'secondary'}>
                    {ocrData.beneficiario.tipoDocumento}
                  </Badge>
                  {ocrData.beneficiario.validacionOK ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>{ocrData.beneficiario.tipoDocumento}</Label>
                <Input 
                  value={ocrData.beneficiario.ruc || ocrData.beneficiario.cedula || ''} 
                  readOnly 
                  className="bg-gray-50" 
                />
              </div>
              <div className="space-y-2">
                <Label>Provincia</Label>
                <Input value={ocrData.beneficiario.provincia} readOnly className="bg-gray-50" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bancarios">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="w-5 h-5" />
                Datos Bancarios Ecuatorianos
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Banco Emisor</Label>
                <Input value={ocrData.datosBancarios.bancoEmisor} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>Sucursal</Label>
                <Input value={ocrData.datosBancarios.sucursal} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>Plaza</Label>
                <Input value={ocrData.datosBancarios.plaza} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>Tipo de Cuenta</Label>
                <Input value={ocrData.datosBancarios.tipoCuenta} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Número de Cuenta</Label>
                <Input value={ocrData.datosBancarios.numeroCuenta} readOnly className="bg-gray-50" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sri">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Datos SRI y Facturación
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Número de Comprobante</Label>
                <Input value={ocrData.sri.numeroComprobante} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>Fecha de Emisión</Label>
                <Input value={ocrData.sri.fechaEmision} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>Base Imponible</Label>
                <Input value={`$${ocrData.sri.baseImponible}`} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>IVA (12%)</Label>
                <Input value={`$${ocrData.sri.iva}`} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>Total</Label>
                <Input value={`$${ocrData.sri.total}`} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>Requiere Facturación</Label>
                <Badge variant={ocrData.sri.requiereFacturacion ? 'destructive' : 'default'}>
                  {ocrData.sri.requiereFacturacion ? 'SÍ' : 'NO'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verificacion">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="w-5 h-5" />
                Verificación Bancaria
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Banco Consultado</Label>
                <Input value={ocrData.verificacionBancaria.bancoConsultado} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>Fecha de Verificación</Label>
                <Input value={new Date(ocrData.verificacionBancaria.fechaVerificacion).toLocaleString()} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>Estado de la Cuenta</Label>
                <Badge variant={ocrData.verificacionBancaria.estadoCuenta === 'Activa' ? 'default' : 'destructive'}>
                  {ocrData.verificacionBancaria.estadoCuenta}
                </Badge>
              </div>
              <div className="space-y-2">
                <Label>Fondos Disponibles</Label>
                <Badge variant={ocrData.verificacionBancaria.fondosDisponibles ? 'default' : 'destructive'}>
                  {ocrData.verificacionBancaria.fondosDisponibles ? 'SÍ' : 'NO'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Guardar Cheque Ecuatoriano
        </Button>
      </div>
    </div>
  );
};

export default EcuadorianChequeForm;
