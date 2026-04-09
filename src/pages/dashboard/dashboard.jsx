import React from "react";
import { NavLink } from "react-router";
import { columns } from "@/components/dashboard/columns";
import Stats from "@/components/dashboard/stats";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Heading } from "@/components/ui/headings";
import { useArticle } from "@/providers/article-provider";
import { useAuth } from "@/providers/auth-provider";

function Dashboard() {
    const { loggedInUser } = useAuth();
    const { getDashboardStats, fetchArticlesByUserId } = useArticle();

    const dashboardStats = getDashboardStats(loggedInUser.id);
    const userArticles = fetchArticlesByUserId(loggedInUser.id);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col">
                <Heading size={"h5"}>
                    Hey, <strong>{loggedInUser.fullName}</strong>
                </Heading>
                <Heading size={"h6"} className="text-muted-foreground">
                    Start writing your articles and share your knowledge with
                    the world.
                </Heading>
            </div>

            <div className="flex items-center justify-between">
                <Heading size={"h6"}>
                    Your Articles ({userArticles.length})
                </Heading>
                <NavLink to={"/dashboard/articles/create"}>
                    <Button>Create New Article</Button>
                </NavLink>
            </div>

            <Stats stats={dashboardStats} />

            <DataTable data={userArticles} columns={columns} />
        </div>
    );
}

export default Dashboard;
