
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, FileText, Clock, CheckCircle } from "lucide-react";

interface DashboardStatsProps {
  cheques: any[];
}

const DashboardStats = ({ cheques }: DashboardStatsProps) => {
  // Calcular estadísticas
  const totalCheques = cheques.length;
  const totalMonto = cheques.reduce((sum, cheque) => sum + parseFloat(cheque.monto || 0), 0);
  const pendientes = cheques.filter(c => c.estado === 'pendiente').length;
  const aprobados = cheques.filter(c => c.estado === 'aprobado').length;
  const rechazados = cheques.filter(c => c.estado === 'rechazado').length;

  // Datos para gráfico de barras por tipo
  const tipoData = [
    { tipo: 'Cliente', cantidad: cheques.filter(c => c.tipo === 'cliente').length },
    { tipo: 'Proveedor', cantidad: cheques.filter(c => c.tipo === 'proveedor').length },
    { tipo: 'Mayorista', cantidad: cheques.filter(c => c.tipo === 'mayorista').length },
    { tipo: 'Interno', cantidad: cheques.filter(c => c.tipo === 'interno').length },
  ].filter(item => item.cantidad > 0);

  // Datos para gráfico circular de estados
  const estadoData = [
    { name: 'Pendiente', value: pendientes, color: '#f59e0b' },
    { name: 'Aprobado', value: aprobados, color: '#10b981' },
    { name: 'Rechazado', value: rechazados, color: '#ef4444' },
  ].filter(item => item.value > 0);

  // Datos para tendencias por mes (últimos 6 meses)
  const tendenciaData = [];
  for (let i = 5; i >= 0; i--) {
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() - i);
    const mes = fecha.toLocaleString('es', { month: 'short' });
    const año = fecha.getFullYear();
    const chequesDelMes = cheques.filter(c => {
      const fechaCheque = new Date(c.fechaProcesamiento);
      return fechaCheque.getMonth() === fecha.getMonth() && 
             fechaCheque.getFullYear() === fecha.getFullYear();
    });
    
    tendenciaData.push({
      mes: `${mes} ${año}`,
      cantidad: chequesDelMes.length,
      monto: chequesDelMes.reduce((sum, c) => sum + parseFloat(c.monto || 0), 0)
    });
  }

  return (
    <div className="grid gap-6">
      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cheques</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCheques}</div>
            <p className="text-xs text-muted-foreground">
              +{cheques.filter(c => {
                const fecha = new Date(c.fechaProcesamiento);
                const hoy = new Date();
                return fecha.toDateString() === hoy.toDateString();
              }).length} hoy
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monto Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalMonto.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Acumulado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendientes}</div>
            <p className="text-xs text-muted-foreground">
              Requieren atención
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{aprobados}</div>
            <p className="text-xs text-muted-foreground">
              Procesados exitosamente
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de barras por tipo */}
        <Card>
          <CardHeader>
            <CardTitle>Cheques por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tipoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tipo" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico circular de estados */}
        <Card>
          <CardHeader>
            <CardTitle>Estados de Cheques</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={estadoData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {estadoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tendencias */}
      <Card>
        <CardHeader>
          <CardTitle>Tendencias - Últimos 6 Meses</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tendenciaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'cantidad' ? value : `$${value?.toLocaleString()}`,
                  name === 'cantidad' ? 'Cantidad' : 'Monto'
                ]}
              />
              <Bar dataKey="cantidad" fill="#8884d8" name="cantidad" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
