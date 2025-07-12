import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  loading?: boolean;
}

export function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend,
  loading = false 
}: StatCardProps) {
  if (loading) {
    return (
      <Card className="financial-card">
        <CardHeader className="financial-card-header">
          <div className="flex items-center space-x-2">
            {icon && <div className="text-muted-foreground">{icon}</div>}
            <div className="h-4 bg-muted animate-pulse rounded w-24"></div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="h-8 bg-muted animate-pulse rounded w-32"></div>
          {subtitle && <div className="h-4 bg-muted animate-pulse rounded w-20"></div>}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="financial-card">
      <CardHeader className="financial-card-header">
        <CardTitle className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
          {icon && <div className="text-primary">{icon}</div>}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {subtitle && (
          <div className="text-sm text-muted-foreground">{subtitle}</div>
        )}
        {trend && (
          <div className="text-xs text-muted-foreground">
            {trend.label}: <span className="font-medium">{trend.value}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}