import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, User, Calendar, ExternalLink } from "lucide-react";
import { getPostBySlug, getRelatedPosts } from "@/data/blogPosts";

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug || "");

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post.relatedPosts);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.title} | GPAM Blog</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={`/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:image" content={post.featuredImage} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.metaDescription,
            "image": post.featuredImage,
            "author": { "@type": "Person", "name": post.author },
            "datePublished": post.date,
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <div className="relative h-[400px] overflow-hidden">
        <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-4xl">
            <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>{post.category}</Badge>
              {post.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{post.title}</h1>
            <div className="flex items-center gap-6 text-muted-foreground text-sm">
              <span className="flex items-center gap-1"><User className="h-4 w-4" />{post.author}</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(post.date).toLocaleDateString()}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readTime} read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground">
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>').replace(/## /g, '<h2 class="text-2xl font-bold mt-8 mb-4 text-foreground">').replace(/### /g, '<h3 class="text-xl font-semibold mt-6 mb-3 text-foreground">').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>') }} />
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(related => (
                <Link key={related.id} to={`/blog/${related.slug}`}>
                  <Card className="financial-card hover-lift h-full">
                    <img src={related.featuredImage} alt={related.title} className="w-full h-32 object-cover rounded-t-lg" />
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-2">{related.category}</Badge>
                      <h3 className="font-semibold text-foreground line-clamp-2">{related.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{related.readTime} read</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
