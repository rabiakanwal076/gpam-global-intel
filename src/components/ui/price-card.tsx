import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PriceCardProps {
  title: string;
  value: string;
  change: number;
  changePercent: number;
  subtitle?: string;
  icon?: React.ReactNode;
  loading?: boolean;
}

export function PriceCard({ 
  title, 
  value, 
  change, 
  changePercent, 
  subtitle,
  icon,
  loading = false 
}: PriceCardProps) {
  const isPositive = change > 0;
  const isNegative = change < 0;
  const isNeutral = change === 0;

  const getTrendIcon = () => {
    if (isPositive) return <TrendingUp className="h-4 w-4" />;
    if (isNegative) return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const getTrendColor = () => {
    if (isPositive) return "text-success";
    if (isNegative) return "text-danger";
    return "text-muted-foreground";
  };

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
          <div className="h-4 bg-muted animate-pulse rounded w-20"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="financial-card hover:shadow-financial">
      <CardHeader className="financial-card-header">
        <CardTitle className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
          {icon && <div className="text-primary">{icon}</div>}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-sm font-medium">
              {change > 0 ? '+' : ''}{change.toFixed(2)}
            </span>
          </div>
          <div className={`text-sm ${getTrendColor()}`}>
            ({changePercent > 0 ? '+' : ''}{changePercent.toFixed(2)}%)
          </div>
        </div>
        {subtitle && (
          <div className="text-xs text-muted-foreground">{subtitle}</div>
        )}
      </CardContent>
    </Card>
  );
}