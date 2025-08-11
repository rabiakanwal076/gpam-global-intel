import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SimpleChart } from "@/components/ui/simple-chart";
import { Lightbulb, LineChart, Brain, AlertTriangle } from "lucide-react";
import { Helmet } from "react-helmet-async";

const sampleData = [
  { time: 'Mon', value: 100 },
  { time: 'Tue', value: 102 },
  { time: 'Wed', value: 101 },
  { time: 'Thu', value: 103 },
  { time: 'Fri', value: 104 },
];

export function ImpactAnalyzer() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <Helmet>
        <title>Policy Impact Analyzer | GPAM</title>
        <meta name="description" content="Analyze how policy changes correlate with market movements." />
        <link rel="canonical" href="/impact" />
      </Helmet>

      <Card className="financial-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><LineChart className="h-5 w-5 text-primary" />Impact Analyzer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[{k:'High',c:'danger'},{k:'Medium',c:'warning'},{k:'Low',c:'success'}].map((x) => (
              <div key={x.k} className={`p-4 rounded-lg border bg-${x.c}/5 border-${x.c}/20`}>
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{x.k} Impact</div>
                  <Badge variant="outline" className={`bg-${x.c}/10 text-${x.c}`}>{x.k}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Estimated market sensitivity for policy changes.</p>
              </div>
            ))}
          </div>

          <SimpleChart data={sampleData} dataKey="value" />
        </CardContent>
      </Card>

      <Card className="financial-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Brain className="h-5 w-5 text-accent" />AI Signals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className="p-4 rounded-lg border bg-muted">
                <div className="flex items-center gap-2 font-semibold"><Lightbulb className="h-4 w-4 text-accent" />Insight #{i}</div>
                <p className="text-sm text-muted-foreground mt-2">Correlated movement detected between policy category and sector index.</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-warning"><AlertTriangle className="h-4 w-4" />
            <span className="text-sm">Insights are experimental and not investment advice.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
