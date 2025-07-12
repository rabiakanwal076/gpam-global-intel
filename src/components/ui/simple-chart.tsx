import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface SimpleChartProps {
  data: any[];
  type?: 'line' | 'bar';
  dataKey: string;
  stroke?: string;
  fill?: string;
  height?: number;
}

export function SimpleChart({ 
  data, 
  type = 'line', 
  dataKey, 
  stroke = 'hsl(var(--primary))', 
  fill = 'hsl(var(--primary))',
  height = 300 
}: SimpleChartProps) {
  const ChartComponent = type === 'line' ? LineChart : BarChart;
  
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <ChartComponent data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--foreground))'
            }} 
          />
          {type === 'line' ? (
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={stroke} 
              strokeWidth={2} 
              dot={false} 
            />
          ) : (
            <Bar dataKey={dataKey} fill={fill} />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
}