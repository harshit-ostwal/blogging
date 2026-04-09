import React from "react";
import { NavLink } from "react-router";
import ArticleForm from "@/components/dashboard/article-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Heading } from "@/components/ui/Headings";

function CreateArticle() {
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
              <BreadcrumbPage>Create Article</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col gap-2">
          <Heading size={"h4"} className={"font-semibold"}>
            Create New Article
          </Heading>
          <Heading size={"h6"} className="text-muted-foreground">
            Share your knowledge and insights with the world by creating a new
            article. Start writing now and make an impact!
          </Heading>
        </div>
      </div>

      <ArticleForm type={"create"} />
    </div>
  );
}

export default CreateArticle;
