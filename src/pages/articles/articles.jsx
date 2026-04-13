import React, { useMemo } from "react";
import ArticleCard from "@/components/common/article-card";
import { useArticle } from "@/providers/article-provider";
import { Heading } from "@/components/ui/Headings";

function Articles() {
  const { fetchArticles } = useArticle();

  const articlesData = useMemo(() => fetchArticles(0), [fetchArticles]);

  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col gap-1">
        <Heading size="h3" className="font-semibold">
          All Articles
        </Heading>
        <Heading size="h6" className="text-muted-foreground">
          Explore the latest articles on various topics, written by our talented
          authors.
        </Heading>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articlesData.map((article, idx) => (
          <ArticleCard key={idx} article={article} />
        ))}
      </div>
    </div>
  );
}

export default Articles;
