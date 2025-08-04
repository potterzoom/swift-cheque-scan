import { FileText, Shield, TrendingUp } from "lucide-react";

const AppHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary-glow">
          <FileText className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold text-gradient">
          Swift Cheque Scan
        </h1>
        <div className="p-2 rounded-xl bg-gradient-to-br from-secondary to-secondary-glow">
          <span className="text-xl font-bold text-secondary-foreground">Ecuador</span>
        </div>
      </div>
      
      <p className="text-xl text-muted-foreground mb-4">
        Sistema especializado para cheques ecuatorianos
      </p>
      
      <div className="flex justify-center items-center gap-4 text-sm flex-wrap">
        <div className="flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full border border-secondary/30">
          <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
          <span className="font-medium">Bancos Ecuatorianos</span>
        </div>
        <div className="flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full border border-accent/30">
          <Shield className="w-4 h-4 text-success" />
          <span className="font-medium">Validación RUC/Cédula</span>
        </div>
        <div className="flex items-center gap-2 bg-success/20 text-success-foreground px-4 py-2 rounded-full border border-success/30">
          <TrendingUp className="w-4 h-4 text-success" />
          <span className="font-medium">Comprobantes SRI</span>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;