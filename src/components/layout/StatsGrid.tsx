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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {statsItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <Card key={index} className="card-natural hover:glow-effect transition-all duration-300 border-l-4 border-l-primary/20">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header con badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${item.bgColor} ring-1 ring-border/20`}>
                      <IconComponent className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{item.label}</h3>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {item.badge}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Métricas principales */}
                <div className="space-y-2">
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-foreground">
                      {item.value.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground pb-1">
                      {item.metric}
                    </span>
                  </div>
                  
                  {/* Trend indicator */}
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-success" />
                    <span className="text-sm font-medium text-success">
                      {item.trend}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      vs mes anterior
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Rendimiento</span>
                    <span>{item.metric.includes('%') ? item.value : '100'}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color.replace('text-', 'bg-')} rounded-full transition-all duration-500`}
                      style={{ 
                        width: `${item.metric.includes('%') ? item.value : Math.min(100, (item.value / Math.max(item.value, 100)) * 100)}%` 
                      }}
                    />
                  </div>
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