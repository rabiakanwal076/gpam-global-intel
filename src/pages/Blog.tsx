import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet-async";
import { BookOpen, Clock, User, ArrowRight, TrendingUp, BarChart3, Globe, Lightbulb, Shield, Leaf } from "lucide-react";
import { blogPosts, categories, getFeaturedPosts } from "@/data/blogPosts";

const categoryIcons: Record<string, any> = {
  "Monetary Policy": TrendingUp,
  "Equities": BarChart3,
  "Commodities": Globe,
  "FX": Globe,
  "Strategy": Lightbulb,
  "Digital Assets": TrendingUp,
  "Fixed Income": BarChart3,
  "Risk Management": Shield,
  "ESG": Leaf,
};

export function AIInsightsBlog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const featuredPosts = getFeaturedPosts();
  
  const filteredPosts = activeCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>AI Insights Blog | Financial Analysis & Investment Strategies | GPAM</title>
        <meta name="description" content="Expert AI-driven market insights covering stocks, bonds, commodities, forex, and investment strategies. Stay informed with GPAM's financial analysis blog." />
        <link rel="canonical" href="/blog" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "GPAM AI Insights Blog",
            "description": "AI-powered financial analysis and investment insights",
            "url": "/blog"
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <div className="bg-gradient-card border-b border-card-border">
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="p-3 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            AI Insights Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
            Expert financial analysis powered by AI. Covering stocks, bonds, commodities, and investment strategies.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Featured */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Featured Insights</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredPosts.slice(0, 3).map(post => (
              <Link key={post.id} to={`/blog/${post.slug}`}>
                <Card className="financial-card hover-lift h-full group">
                  <img src={post.featuredImage} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" />
                  <CardHeader className="pb-2">
                    <div className="flex gap-2 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <Badge variant="outline">Featured</Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><User className="h-3 w-3" />{post.author}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                      </div>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map(cat => {
              const Icon = categoryIcons[cat.name] || TrendingUp;
              return (
                <Card 
                  key={cat.name} 
                  className={`financial-card hover-lift cursor-pointer ${activeCategory === cat.name ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setActiveCategory(activeCategory === cat.name ? "all" : cat.name)}
                >
                  <CardContent className="p-4 text-center">
                    <div className={`w-10 h-10 rounded-full ${cat.color} bg-opacity-20 flex items-center justify-center mx-auto mb-2`}>
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground">{cat.count} articles</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* All Posts */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {activeCategory === "all" ? "All Articles" : activeCategory}
            </h2>
            {activeCategory !== "all" && (
              <Button variant="ghost" onClick={() => setActiveCategory("all")}>View All</Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <Link key={post.id} to={`/blog/${post.slug}`}>
                <Card className="financial-card hover-lift h-full group">
                  <img src={post.featuredImage} alt={post.title} className="w-full h-40 object-cover rounded-t-lg" />
                  <CardHeader className="pb-2">
                    <div className="flex gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                    </div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />{post.readTime}
                      </span>
                      <Button variant="ghost" size="sm" className="text-xs group-hover:text-primary">
                        Read More <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section>
          <Card className="financial-card bg-gradient-to-r from-primary/10 to-accent/10">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-2">Stay Ahead of the Markets</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Get weekly AI-powered insights delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-lg bg-background border border-border" />
                <Button>Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
