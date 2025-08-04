import { FileText, Users, BarChart3, Camera, Shield, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ChequeStats } from "@/core/types/cheque";

interface StatsGridProps {
  stats: ChequeStats;
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  const statsItems = [
    {
      icon: FileText,
      label: "Total Cheques",
      value: stats.totalCheques,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Users,
      label: "Clientes",
      value: stats.clientesUnicos,
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: BarChart3,
      label: "Proveedores",
      value: stats.proveedoresUnicos,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Camera,
      label: "Hoy",
      value: stats.procesadosHoy,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      icon: Shield,
      label: "RUC/Cédula OK",
      value: stats.validacionesExitosas,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      icon: TrendingUp,
      label: "Fondos OK",
      value: stats.fondosVerificados,
      color: "text-success",
      bgColor: "bg-success/10"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-8">
      {statsItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <Card key={index} className="card-natural hover:glow-effect transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${item.bgColor}`}>
                  <IconComponent className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                  <p className="text-lg font-bold text-foreground">{item.value.toLocaleString()}</p>
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