import React from "react";
import { NavLink, useParams } from "react-router";
import ArticleForm from "@/components/dashboard/article-form";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Heading } from "@/components/ui/headings";
import { useArticle } from "@/providers/article-provider";

function EditArticle() {
    const { articleId } = useParams();
    const { fetchArticleById } = useArticle();
    const article = fetchArticleById(articleId);

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <NavLink
                                to="/dashboard"
                                className="text-muted-foreground duration-300 hover:text-foreground"
                            >
                                Dashboard
                            </NavLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <NavLink
                                to="/dashboard/:articleId"
                                className="text-muted-foreground duration-300 hover:text-foreground"
                            >
                                Article ID
                            </NavLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Edit Article</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-col gap-2">
                    <Heading size={"h4"} className={"font-semibold"}>
                        Edit Article
                    </Heading>
                    <Heading size={"h6"} className="text-muted-foreground">
                        Share your knowledge and insights with the world by
                        editing your article. Make improvements and updates to
                        keep your content relevant!
                    </Heading>
                </div>
            </div>

            <ArticleForm type={"edit"} article={article} />
        </div>
    );
}

export default EditArticle;
