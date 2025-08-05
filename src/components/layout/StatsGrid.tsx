import { FileText, Users, BarChart3, Camera, Shield, TrendingUp, Database, Cpu, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChequeStats } from "@/core/types/cheque";

interface StatsGridProps {
  stats: ChequeStats;
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  // Calcular métricas técnicas
  const tasaValidacion = stats.totalCheques > 0 ? (stats.validacionesExitosas / stats.totalCheques * 100) : 0;
  const tasaFondos = stats.totalCheques > 0 ? (stats.fondosVerificados / stats.totalCheques * 100) : 0;
  const eficienciaOCR = 94.7; // Simulado
  
  const statsItems = [
    {
      icon: Database,
      label: "Total Cheques",
      value: stats.totalCheques,
      metric: "registros",
      trend: "+12%",
      color: "text-primary",
      bgColor: "bg-primary/10",
      badge: "PROD"
    },
    {
      icon: Users,
      label: "Entidades Únicas",
      value: stats.clientesUnicos + stats.proveedoresUnicos,
      metric: "activas",
      trend: "+8%",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      badge: "REAL"
    },
    {
      icon: Activity,
      label: "Procesamiento",
      value: stats.procesadosHoy,
      metric: "docs/día",
      trend: "+15%",
      color: "text-accent",
      bgColor: "bg-accent/10",
      badge: "24H"
    },
    {
      icon: Shield,
      label: "Validación SRI",
      value: Math.round(tasaValidacion),
      metric: "% éxito",
      trend: "+2.1%",
      color: "text-success",
      bgColor: "bg-success/10",
      badge: "BCE"
    },
    {
      icon: TrendingUp,
      label: "Verificación Fondos",
      value: Math.round(tasaFondos),
      metric: "% ok",
      trend: "+1.8%",
      color: "text-success",
      bgColor: "bg-success/10",
      badge: "API"
    },
    {
      icon: Cpu,
      label: "OCR Engine",
      value: Math.round(eficienciaOCR),
      metric: "% precisión",
      trend: "+0.3%",
      color: "text-primary",
      bgColor: "bg-primary/10",
      badge: "IA"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
      {statsItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <Card key={index} className="card-natural hover:glow-effect transition-all duration-300">
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Header compacto */}
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${item.bgColor}`}>
                    <IconComponent className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                </div>

                {/* Métrica principal */}
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-xl font-bold text-foreground">
                      {item.value.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground pb-0.5">
                      {item.metric}
                    </span>
                  </div>
                </div>

                {/* Trend compacto */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-success" />
                    <span className="font-medium text-success">{item.trend}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {item.metric.includes('%') ? item.value : '100'}%
                  </span>
                </div>

                {/* Progress bar compacto */}
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color.replace('text-', 'bg-')} rounded-full transition-all duration-500`}
                    style={{ 
                      width: `${item.metric.includes('%') ? item.value : Math.min(100, (item.value / Math.max(item.value, 100)) * 100)}%` 
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsGrid;