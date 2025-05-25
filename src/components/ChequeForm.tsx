
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Save, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChequeFormProps {
  scannedImage?: string | null;
  onSave: () => void;
}

interface ChequeData {
  numero: string;
  monto: string;
  banco: string;
  fecha: string;
  cuentaOrigen: string;
  cuentaDestino: string;
  emisor: string;
  tipo: string;
  referencia: string;
}

const ChequeForm = ({ scannedImage, onSave }: ChequeFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ChequeData>({
    numero: "001234567",
    monto: "1500.00",
    banco: "Banco Nacional",
    fecha: "2024-05-25",
    cuentaOrigen: "1234-5678-90",
    cuentaDestino: "0987-6543-21",
    emisor: "Cliente XYZ S.A.",
    tipo: "cliente",
    referencia: "PAG-2024-001"
  });

  const handleInputChange = (field: keyof ChequeData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Simular guardado en base de datos
    const savedCheques = JSON.parse(localStorage.getItem('cheques') || '[]');
    const newCheque = {
      ...formData,
      id: Date.now().toString(),
      fechaProcesamiento: new Date().toISOString(),
      estado: 'pendiente',
      imagen: scannedImage
    };
    
    savedCheques.push(newCheque);
    localStorage.setItem('cheques', JSON.stringify(savedCheques));
    
    toast({
      title: "Cheque guardado",
      description: "El cheque ha sido procesado y guardado exitosamente",
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div className="space-y-2">
          <Label htmlFor="cuentaOrigen">Cuenta de Origen</Label>
          <Input
            id="cuentaOrigen"
            value={formData.cuentaOrigen}
            onChange={(e) => handleInputChange('cuentaOrigen', e.target.value)}
            placeholder="Número de cuenta origen"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cuentaDestino">Cuenta de Destino</Label>
          <Input
            id="cuentaDestino"
            value={formData.cuentaDestino}
            onChange={(e) => handleInputChange('cuentaDestino', e.target.value)}
            placeholder="Número de cuenta destino"
          />
        </div>

        <div className="space-y-2">
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

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="referencia">Código de Referencia</Label>
          <Input
            id="referencia"
            value={formData.referencia}
            onChange={(e) => handleInputChange('referencia', e.target.value)}
            placeholder="Código de referencia interno"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Guardar Cheque
        </Button>
      </div>
    </div>
  );
};

export default ChequeForm;
