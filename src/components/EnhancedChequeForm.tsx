
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, DollarSign, CreditCard, QrCode, Scan } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ChequeOCRData } from "@/utils/ocrService";

interface EnhancedChequeFormProps {
  ocrData?: ChequeOCRData | null;
  scannedImage?: string | null;
  onSave: () => void;
}

const EnhancedChequeForm = ({ ocrData, scannedImage, onSave }: EnhancedChequeFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Datos básicos
    numero: ocrData?.numero || "",
    monto: ocrData?.monto || "",
    banco: ocrData?.banco || "",
    fecha: ocrData?.fecha || "",
    emisor: ocrData?.emisor || "",
    tipo: "cliente",
    referencia: `REF-${Date.now().toString().slice(-6)}`,
    
    // Datos adicionales del OCR
    codigoBarras: ocrData?.codigoBarras || null,
    lineaMICR: ocrData?.lineaMICR || null,
    reverso: ocrData?.reverso || null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const savedCheques = JSON.parse(localStorage.getItem('cheques') || '[]');
    const newCheque = {
      ...formData,
      id: Date.now().toString(),
      fechaProcesamiento: new Date().toISOString(),
      estado: 'pendiente',
      imagen: scannedImage,
      datosCompletos: true // Indica que tiene datos de OCR avanzado
    };
    
    savedCheques.push(newCheque);
    localStorage.setItem('cheques', JSON.stringify(savedCheques));
    
    toast({
      title: "Cheque procesado completamente",
      description: "Se han extraído y guardado todos los datos del cheque incluyendo código de barras y reverso",
    });
    
    onSave();
  };

  return (
    <div className="space-y-6">
      {scannedImage && (
        <Card>
          <CardContent className="p-4">
            <img
              src={scannedImage}
              alt="Cheque escaneado"
              className="w-full max-w-sm mx-auto rounded-lg shadow-sm"
            />
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="basicos" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basicos">Datos Básicos</TabsTrigger>
          <TabsTrigger value="barcode">Código Barras</TabsTrigger>
          <TabsTrigger value="micr">Línea MICR</TabsTrigger>
          <TabsTrigger value="reverso">Reverso</TabsTrigger>
        </TabsList>

        <TabsContent value="basicos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Información del Cheque
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numero">Número de Cheque</Label>
                <Input
                  id="numero"
                  value={formData.numero}
                  onChange={(e) => handleInputChange('numero', e.target.value)}
                  placeholder="Número del cheque"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monto">Monto</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="monto"
                    value={formData.monto}
                    onChange={(e) => handleInputChange('monto', e.target.value)}
                    placeholder="0.00"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="banco">Banco</Label>
                <Input
                  id="banco"
                  value={formData.banco}
                  onChange={(e) => handleInputChange('banco', e.target.value)}
                  placeholder="Nombre del banco"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => handleInputChange('fecha', e.target.value)}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="emisor">Emisor</Label>
                <Input
                  id="emisor"
                  value={formData.emisor}
                  onChange={(e) => handleInputChange('emisor', e.target.value)}
                  placeholder="Nombre del emisor"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Cheque</Label>
                <Select value={formData.tipo} onValueChange={(value) => handleInputChange('tipo', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cliente">Cliente</SelectItem>
                    <SelectItem value="proveedor">Proveedor</SelectItem>
                    <SelectItem value="mayorista">Mayorista</SelectItem>
                    <SelectItem value="interno">Interno</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="referencia">Referencia</Label>
                <Input
                  id="referencia"
                  value={formData.referencia}
                  onChange={(e) => handleInputChange('referencia', e.target.value)}
                  placeholder="Código de referencia"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="barcode">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="w-5 h-5" />
                Datos del Código de Barras
              </CardTitle>
            </CardHeader>
            <CardContent>
              {formData.codigoBarras ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Número Único</Label>
                    <Input value={formData.codigoBarras.numeroUnico} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Código de Banco</Label>
                    <Input value={formData.codigoBarras.codigoBanco} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Código de Sucursal</Label>
                    <Input value={formData.codigoBarras.codigoSucursal} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Dígito de Verificación</Label>
                    <Input value={formData.codigoBarras.verificacion} readOnly className="bg-gray-50" />
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No se detectaron datos de código de barras en la imagen
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="micr">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="w-5 h-5" />
                Línea MICR (Caracteres Magnéticos)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {formData.lineaMICR ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Número de Cuenta</Label>
                    <Input value={formData.lineaMICR.numeroCuenta} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Número de Ruta</Label>
                    <Input value={formData.lineaMICR.numeroRuta} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Número de Tránsito</Label>
                    <Input value={formData.lineaMICR.numeroTransito} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Código de Control</Label>
                    <Input value={formData.lineaMICR.codigoControl} readOnly className="bg-gray-50" />
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No se detectaron datos de la línea MICR en la imagen
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reverso">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Datos del Reverso del Cheque
              </CardTitle>
            </CardHeader>
            <CardContent>
              {formData.reverso ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Fecha de Depósito</Label>
                    <Input value={formData.reverso.fechaDeposito} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Código de Cliente</Label>
                    <Input value={formData.reverso.codigoCliente} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Cuenta de Depósito</Label>
                    <Input value={formData.reverso.cuentaDeposito} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Sucursal de Depósito</Label>
                    <Input value={formData.reverso.sucursalDeposito} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Código de Operación</Label>
                    <Input value={formData.reverso.codigoOperacion} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Sello Digital</Label>
                    <Input value={formData.reverso.selloDigital} readOnly className="bg-gray-50" />
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No se detectaron datos del reverso del cheque
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Guardar Cheque Completo
        </Button>
      </div>
    </div>
  );
};

export default EnhancedChequeForm;
