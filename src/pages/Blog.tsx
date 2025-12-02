import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet-async";
import { BookOpen, Clock, User, TrendingUp, ArrowRight, Lightbulb, BarChart3, Globe } from "lucide-react";

const posts = [
  { id: 1, title: "Policy shifts and tech stocks", date: "2025-08-10", tag: "Equities", excerpt: "How rate expectations ripple through growth names.", readTime: "5 min", author: "AI Analyst", featured: true },
  { id: 2, title: "Energy subsidies and oil futures", date: "2025-08-09", tag: "Commodities", excerpt: "Reading fiscal pivots in commodity curves.", readTime: "4 min", author: "AI Analyst", featured: true },
  { id: 3, title: "FX interventions decoded", date: "2025-08-07", tag: "FX", excerpt: "A playbook for spotting intervention footprints.", readTime: "6 min", author: "AI Analyst", featured: false },
  { id: 4, title: "Central bank digital currencies impact", date: "2025-08-06", tag: "Digital Assets", excerpt: "How CBDCs are reshaping monetary policy transmission.", readTime: "7 min", author: "AI Analyst", featured: false },
  { id: 5, title: "Emerging market bonds outlook", date: "2025-08-05", tag: "Fixed Income", excerpt: "Navigating EM debt in a high-rate environment.", readTime: "5 min", author: "AI Analyst", featured: false },
  { id: 6, title: "AI-driven sector rotation", date: "2025-08-04", tag: "Strategy", excerpt: "Using machine learning for tactical allocation.", readTime: "8 min", author: "AI Analyst", featured: true },
  { id: 7, title: "Geopolitical risk premium analysis", date: "2025-08-03", tag: "Risk", excerpt: "Quantifying uncertainty in asset prices.", readTime: "6 min", author: "AI Analyst", featured: false },
  { id: 8, title: "Green bonds and ESG investing", date: "2025-08-02", tag: "ESG", excerpt: "Sustainable finance trends and opportunities.", readTime: "5 min", author: "AI Analyst", featured: false },
];

const categories = [
  { name: "Equities", count: 12, icon: TrendingUp },
  { name: "Commodities", count: 8, icon: BarChart3 },
  { name: "FX", count: 6, icon: Globe },
  { name: "Strategy", count: 10, icon: Lightbulb },
];

const featuredPosts = posts.filter(p => p.featured);
const recentPosts = posts.slice(0, 6);

export function AIInsightsBlog() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>AI Insights Blog | GPAM</title>
        <meta name="description" content="AI-driven market insights across policies and assets." />
        <link rel="canonical" href="/blog" />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-card border-b border-card-border">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Insights Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover AI-powered market analysis, policy impacts, and investment strategies
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Featured Posts */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Featured Insights</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredPosts.map((p) => (
              <Card key={p.id} className="financial-card hover-lift group cursor-pointer">
                <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center">
                  <Lightbulb className="h-12 w-12 text-primary/50 group-hover:text-primary transition-colors" />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{p.tag}</Badge>
                    <Badge variant="outline" className="text-xs">Featured</Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{p.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{p.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{p.author}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.readTime}</span>
                    </div>
                    <span>{new Date(p.date).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Card key={cat.name} className="financial-card hover-lift cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <cat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">{cat.count} articles</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Posts */}
        <section className="space-y-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">All Insights</h2>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="equities">Equities</TabsTrigger>
                <TabsTrigger value="commodities">Commodities</TabsTrigger>
                <TabsTrigger value="fx">FX</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((p) => (
                  <Card key={p.id} className="financial-card hover-lift group cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">{p.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm mb-3">
                        <Badge variant="secondary">{p.tag}</Badge>
                        <span className="text-muted-foreground">{new Date(p.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">{p.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />{p.readTime}
                        </span>
                        <Button variant="ghost" size="sm" className="group-hover:text-primary">
                          Read More <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="equities" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.filter(p => p.tag === "Equities").map((p) => (
                  <Card key={p.id} className="financial-card hover-lift">
                    <CardHeader>
                      <CardTitle className="text-lg">{p.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{p.excerpt}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="commodities" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.filter(p => p.tag === "Commodities").map((p) => (
                  <Card key={p.id} className="financial-card hover-lift">
                    <CardHeader>
                      <CardTitle className="text-lg">{p.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{p.excerpt}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="fx" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.filter(p => p.tag === "FX").map((p) => (
                  <Card key={p.id} className="financial-card hover-lift">
                    <CardHeader>
                      <CardTitle className="text-lg">{p.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{p.excerpt}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Newsletter CTA */}
        <section className="space-y-6">
          <Card className="financial-card bg-gradient-to-r from-primary/10 to-accent/10">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-2">Stay Ahead of the Markets</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Get weekly AI-powered insights delivered to your inbox. Join thousands of investors making smarter decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button>Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
