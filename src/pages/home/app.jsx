import React, { useMemo } from "react";
import ArticleCard from "@/components/common/article-card";
import Hero from "@/components/home/hero";
import { Heading } from "@/components/ui/Headings";
import { ImageComp } from "@/components/ui/image";
import { useArticle } from "@/providers/article-provider";

function App() {
    const { fetchArticles } = useArticle();

    const articlesData = useMemo(() => fetchArticles(6), [fetchArticles]);

    return (
        <div className="flex flex-col gap-20">
            <Hero />

            <ImageComp
                src={
                    "https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png"
                }
                alt={"Hero Image"}
                contain
                className={"aspect-5/3"}
            />

            <div className="flex flex-col gap-6">
                <Heading size="h3" className={"font-semibold"}>
                    Explore Our Latest Articles
                </Heading>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {articlesData.map((article, idx) => (
                        <ArticleCard key={idx} article={article} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
