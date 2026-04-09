import { format } from "date-fns";
import React, { useMemo } from "react";
import { NavLink, useParams } from "react-router";
import MarkdownContent from "@/components/common/markdown-content";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Headings";
import { ImageComp } from "@/components/ui/image";
import { statusOptions } from "@/constants/article";
import { useArticle } from "@/providers/article-provider";

function ViewArticle() {
    const { articleId } = useParams();

    const { fetchArticleById } = useArticle();

    const article = useMemo(
        () => fetchArticleById(articleId),
        [fetchArticleById, articleId]
    );

    if (!article) {
        return (
            <div className="flex flex-col items-center justify-center gap-6 py-20">
                <Heading
                    size="h4"
                    className="max-w-2xl text-center text-destructive"
                >
                    Article not found or you do not have permission to view this
                    article.
                </Heading>
                <NavLink to="/articles">
                    <Button>View All Articles</Button>
                </NavLink>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-10">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <NavLink
                            to="/"
                            className="text-muted-foreground duration-300 hover:text-foreground"
                        >
                            Home
                        </NavLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <NavLink
                            to="/articles"
                            className="text-muted-foreground duration-300 hover:text-foreground"
                        >
                            Articles
                        </NavLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{article.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                    <Badge variant="outline">{article.category}</Badge>
                    <Badge
                        variant={
                            article.status === statusOptions[0]
                                ? "warning"
                                : article.status === statusOptions[1]
                                  ? "success"
                                  : "destructive"
                        }
                    >
                        {article.status}
                    </Badge>
                </div>
                <Heading size="h3" className={"font-semibold"}>
                    {article.title}
                </Heading>
                <Heading
                    size="h6"
                    className={"max-w-7xl text-muted-foreground"}
                >
                    {article.description}
                </Heading>
                <div className="flex items-center gap-4">
                    <Heading size="h6" className={"text-muted-foreground"}>
                        Written By:-
                    </Heading>
                    <Heading size="h6" className={"font-medium"}>
                        {article.author.fullName} |{" "}
                        {format(
                            new Date(article.publishedAt || article.createdAt),
                            "MMMM, dd, yyyy | hh:mm a"
                        )}
                    </Heading>
                </div>
                <ImageComp
                    src={article.thumbnail}
                    alt={article.title}
                    className={"aspect-square md:aspect-5/2"}
                />
            </div>
            <MarkdownContent content={article.content} />
            {article.tags.length > 0 && (
                <div className="flex flex-col gap-4">
                    <Heading size="h6">Tags:-</Heading>
                    <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewArticle;
