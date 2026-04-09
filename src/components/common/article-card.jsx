import { formatDate } from "date-fns";
import React from "react";
import { NavLink } from "react-router";
import { Badge } from "../ui/badge";
import { Heading } from "@/components/ui/Headings";
import { ImageComp } from "../ui/image";

function ArticleCard({ article }) {
    return (
        <NavLink
            to={`/articles/${article.id}`}
            className="flex flex-col gap-4 rounded-4xl border border-border p-6"
        >
            <div className="relative">
                <ImageComp
                    className={"aspect-5/3 rounded-4xl"}
                    src={article.thumbnail}
                    alt={article.title}
                />

                <Badge className={"absolute top-5 left-5"}>
                    {article.category}
                </Badge>
            </div>

            <div className="flex flex-col gap-2">
                <Heading size={"h5"} className={"line-clamp-2 font-semibold"}>
                    {article.title}
                </Heading>
                <Heading size={"p"} className={"line-clamp-2"}>
                    {article.description}
                </Heading>
            </div>
            <div className="mt-auto flex flex-col gap-4">
                {article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {article.tags.slice(0, 3).map((tag, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className={"uppercase"}
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <Heading size={"p"} className={"line-clamp-1"}>
                        By {article.author.fullName}
                    </Heading>
                    <Heading size={"p"}>
                        {formatDate(article.publishedAt, "PPP")}
                    </Heading>
                </div>
            </div>
        </NavLink>
    );
}

export default ArticleCard;
