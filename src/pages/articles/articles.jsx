import React, { useMemo } from "react";
import ArticleCard from "@/components/common/article-card";
import { useArticle } from "@/providers/article-provider";

function Articles() {
    const { fetchArticles } = useArticle();

    const articlesData = useMemo(() => fetchArticles(0), [fetchArticles]);

    return (
        <div className="flex flex-col gap-20">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {articlesData.map((article, idx) => (
                    <ArticleCard key={idx} article={article} />
                ))}
            </div>
        </div>
    );
}

export default Articles;
