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
          <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
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
              activeDot={{ r: 4 }}
            />
          ) : (
            <Bar dataKey={dataKey} fill={fill} radius={[4, 4, 0, 0]} />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
}