import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";

const posts = [
  { id: 1, title: "Policy shifts and tech stocks", date: "2025-08-10", tag: "Equities", excerpt: "How rate expectations ripple through growth names." },
  { id: 2, title: "Energy subsidies and oil futures", date: "2025-08-09", tag: "Commodities", excerpt: "Reading fiscal pivots in commodity curves." },
  { id: 3, title: "FX interventions decoded", date: "2025-08-07", tag: "FX", excerpt: "A playbook for spotting intervention footprints." },
];

export function AIInsightsBlog() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <Helmet>
        <title>AI Insights Blog | GPAM</title>
        <meta name="description" content="AI-driven market insights across policies and assets." />
        <link rel="canonical" href="/blog" />
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <Card key={p.id} className="financial-card">
            <CardHeader>
              <CardTitle>{p.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm mb-2">
                <Badge variant="secondary">{p.tag}</Badge>
                <span className="text-muted-foreground">{new Date(p.date).toLocaleDateString()}</span>
              </div>
              <p className="text-muted-foreground text-sm">{p.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
