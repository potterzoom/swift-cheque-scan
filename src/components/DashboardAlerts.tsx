
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, Calendar, DollarSign, Bell } from "lucide-react";

interface DashboardAlertsProps {
  cheques: any[];
}

const DashboardAlerts = ({ cheques }: DashboardAlertsProps) => {
  const hoy = new Date();
  const mañana = new Date(hoy);
  mañana.setDate(hoy.getDate() + 1);
  
  // Cheques pendientes por más de 3 días
  const pendientesViejos = cheques.filter(cheque => {
    if (cheque.estado !== 'pendiente') return false;
    const fechaProcesamiento = new Date(cheque.fechaProcesamiento);
    const diferenciaDias = (hoy.getTime() - fechaProcesamiento.getTime()) / (1000 * 3600 * 24);
    return diferenciaDias > 3;
  });

  // Cheques con montos altos (más de $10,000)
  const montosAltos = cheques.filter(cheque => parseFloat(cheque.monto || 0) > 10000);

  // Cheques procesados hoy
  const procesadosHoy = cheques.filter(cheque => {
    const fechaProcesamiento = new Date(cheque.fechaProcesamiento);
    return fechaProcesamiento.toDateString() === hoy.toDateString();
  });

  // Duplicados potenciales (mismo número de cheque)
  const numerosCheques = cheques.map(c => c.numero);
  const duplicados = cheques.filter((cheque, index) => 
    numerosCheques.indexOf(cheque.numero) !== index
  );

  const alertas = [
    {
      tipo: 'warning',
      icono: Clock,
      titulo: 'Cheques Pendientes Antiguos',
      descripcion: `${pendientesViejos.length} cheques llevan más de 3 días pendientes`,
      cantidad: pendientesViejos.length,
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      tipo: 'info',
      icono: DollarSign,
      titulo: 'Montos Altos',
      descripcion: `${montosAltos.length} cheques superan los $10,000`,
      cantidad: montosAltos.length,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      tipo: 'success',
      icono: Calendar,
      titulo: 'Procesados Hoy',
      descripcion: `${procesadosHoy.length} cheques procesados hoy`,
      cantidad: procesadosHoy.length,
      color: 'bg-green-100 text-green-800'
    },
    {
      tipo: 'error',
      icono: AlertTriangle,
      titulo: 'Posibles Duplicados',
      descripcion: `${duplicados.length} cheques con números duplicados`,
      cantidad: duplicados.length,
      color: 'bg-red-100 text-red-800'
    }
  ].filter(alerta => alerta.cantidad > 0);

  if (alertas.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notificaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No hay alertas importantes en este momento</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notificaciones y Alertas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alertas.map((alerta, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <alerta.icono className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium">{alerta.titulo}</h4>
                <p className="text-sm text-gray-600">{alerta.descripcion}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={alerta.color}>
                {alerta.cantidad}
              </Badge>
              <Button variant="outline" size="sm">
                Ver
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DashboardAlerts;
