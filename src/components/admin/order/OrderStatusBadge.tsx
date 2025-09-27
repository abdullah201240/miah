
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Clock,
  Package,
  AlertTriangle,
  Truck,
} from 'lucide-react';

export function OrderStatusBadge({ status }: { status: string }) {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return {
          icon: CheckCircle,
          className:
            'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
          color: 'text-green-600 dark:text-green-400',
        };
      case 'shipped':
      case 'in transit':
      case 'out for delivery':
        return {
          icon: Truck,
          className:
            'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
          color: 'text-blue-600 dark:text-blue-400',
        };
      case 'processing':
      case 'confirmed':
        return {
          icon: Clock,
          className:
            'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
          color: 'text-orange-600 dark:text-orange-400',
        };
      case 'cancelled':
      case 'returned':
        return {
          icon: AlertTriangle,
          className:
            'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
          color: 'text-red-600 dark:text-red-400',
        };
      default:
        return {
          icon: Package,
          className: 'bg-muted text-muted-foreground border-border',
          color: 'text-muted-foreground',
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <Badge className={`${config.className} text-xs font-medium border`}>
      <Icon className="h-3 w-3 mr-1" />
      {status}
    </Badge>
  );
}
