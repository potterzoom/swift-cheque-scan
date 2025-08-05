import { Github, Mail, Globe, Shield, FileText, Zap } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    {
      category: "Producto",
      items: [
        { label: "OCR Ecuatoriano", href: "#", icon: FileText },
        { label: "Validación SRI", href: "#", icon: Shield },
        { label: "API Integración", href: "#", icon: Zap },
      ]
    },
    {
      category: "Soporte",
      items: [
        { label: "Documentación", href: "#", icon: FileText },
        { label: "Centro Ayuda", href: "#", icon: Globe },
        { label: "Contacto", href: "mailto:soporte@chequescanner.ec", icon: Mail },
      ]
    },
    {
      category: "Desarrolladores",
      items: [
        { label: "GitHub", href: "https://github.com", icon: Github },
        { label: "API Docs", href: "#", icon: FileText },
        { label: "SDK Ecuador", href: "#", icon: Globe },
      ]
    }
  ];

  return (
    <footer className="mt-16 border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg text-foreground">ChequeScanner EC</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sistema OCR especializado para cheques ecuatorianos con validación automática de RUC/Cédula y cumplimiento SRI.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3 h-3" />
              <span>Certificado SRI • Validación BCE</span>
            </div>
          </div>

          {/* Links */}
          {links.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-foreground">{section.category}</h3>
              <ul className="space-y-3">
                {section.items.map((link, linkIndex) => {
                  const IconComponent = link.icon;
                  return (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group"
                      >
                        <IconComponent className="w-3.5 h-3.5 group-hover:text-primary" />
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>© {currentYear} ChequeScanner EC</span>
            <span>•</span>
            <span>Todos los derechos reservados</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Términos</a>
            <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
            <a href="#" className="hover:text-primary transition-colors">SRI Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;