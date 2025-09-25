import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusLower = "pendente" | "aprovado" | "rejeitado" | "ativo" | "cancelado";
type StatusUpper = "PENDENTE" | "APROVADO" | "REJEITADO" | "CANCELADO" | "ATIVO"; // ATIVO para compatibilidade futura
interface StatusBadgeProps {
  status: StatusLower | StatusUpper;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  // Normaliza para lowercase para reutilizar lógica existente
  const norm: StatusLower | string = typeof status === 'string' ? status.toLowerCase() : status;
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-warning/10 text-warning border-warning/20";
      case "aprovado":
      case "ativo":
        return "bg-success/10 text-success border-success/20";
      case "rejeitado":
      case "cancelado":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pendente":
        return "Pendente";
      case "aprovado":
        return "Aprovado";
      case "rejeitado":
        return "Rejeitado";
      case "ativo":
        return "Ativo";
      case "cancelado":
        return "Cancelado";
      default:
        return status;
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn(getStatusStyles(norm), className)}
    >
      {getStatusText(norm)}
    </Badge>
  );
};

export default StatusBadge;