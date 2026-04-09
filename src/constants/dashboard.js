export const statsCard = (data) => [
    {
        title: "Total Articles",
        value: data.totalArticles,
        description: "Total number of articles you have written.",
    },
    // {
    //   title: "Total Views",
    //   value: data.totalViews,
    //   description: "Total number of views across all your articles.",
    // },
    // {
    //   title: "Total Likes",
    //   value: data.totalLikes,
    //   description: "Total number of likes across all your articles.",
    // },
    {
        title: "Published Articles",
        value: data.totalPublished,
        description: "Number of articles that are published.",
    },
    {
        title: "Draft Articles",
        value: data.totalDraft,
        description: "Number of articles that are in draft status.",
    },
    {
        title: "Unpublished Articles",
        value: data.totalUnpublished,
        description: "Number of articles that are unpublished.",
    },
];
