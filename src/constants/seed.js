const userData = [
  {
    id: "Xt5LtJiAwflhvaPxyxkAa",
    fullName: "Harshit Jain",
    email: "harshit@gmail.com",
    password: "Harshit@123",
    role: "User",
  },
  {
    id: "gvpsEzBnJCcT27GhWftMy",
    fullName: "Admin User",
    email: "admin@gmail.com",
    password: "Harshit@123",
    role: "Author",
  },
  {
    id: "123",
    fullName: "123",
    email: "123@gmail.com",
    password: "123123",
    role: "Reader",
    confPas: "123123",
  },
];

const articleData = [
  {
    id: "EePaKOUO5DO8hNX5H9w_V",
    title: "How Developers Should Learn React.js in 2026 (Sample 1)",
    slug: "how-developers-should-learn-react-js-in-2026-sample-1",
    thumbnail:
      "https://images.unsplash.com/photo-1775474519447-49c052c485e5?q=100",
    category: "Technology",
    description:
      "A complete and practical guide for developers to learn React.js in 2026 with modern tools and real-world approaches.",
    content:
      "React.js is no longer just a UI library. In 2026, it is the foundation of modern web applications.\n\nDevelopers need a structured approach to learn React effectively.\n\n...\n\nSample article number 1.",
    tags: ["React", "Frontend", "JavaScript"],
    publishedAt: "2026-04-09T15:53:44.044Z",
    status: "Published",
    authorId: "gvpsEzBnJCcT27GhWftMy",
    authorDetails: {
      fullName: "Admin User",
      email: "admin@gmail.com",
    },
    createdAt: "2026-04-09T15:53:44.044Z",
  },
  {
    id: "l6GCUvFwK2s_odxcENmJB",
    title: "The Future of Frontend Development in 2026 (Sample 2)",
    slug: "future-of-frontend-development-2026-sample-2",
    thumbnail:
      "https://images.unsplash.com/photo-1774893582522-c8e9c0aeaec9?q=100",
    category: "Technology",
    description:
      "Explore how frontend development is evolving and what skills developers need to stay relevant.",
    content:
      "Frontend development is changing rapidly.\n\nIn 2026, developers must think beyond UI.\n\n...\n\nSample article number 2.",
    tags: ["Frontend", "Technology"],
    publishedAt: "2026-04-09T15:53:44.044Z",
    status: "Published",
    authorId: "gvpsEzBnJCcT27GhWftMy",
    authorDetails: { fullName: "Admin User", email: "admin@gmail.com" },
    createdAt: "2026-04-09T15:53:44.044Z",
  },
  {
    id: "IqZRAC3LIXuLuURXxaAF1",
    title: "Complete Guide to Frontend Performance Optimization (Sample 3)",
    slug: "complete-guide-frontend-performance-optimization-sample-3",
    thumbnail:
      "https://images.unsplash.com/photo-1773754532196-014342510e64?q=100",
    category: "Technology",
    description:
      "Learn how to build fast and efficient web applications with modern optimization techniques.",
    content:
      "Performance is one of the most important aspects of frontend development.\n\n...\n\nSample article number 3.",
    tags: ["Performance", "React"],
    publishedAt: "2026-04-09T15:53:44.044Z",
    status: "Published",
    authorId: "gvpsEzBnJCcT27GhWftMy",
    authorDetails: { fullName: "Admin User", email: "admin@gmail.com" },
    createdAt: "2026-04-09T15:53:44.044Z",
  },
  {
    id: "F1ScTO5FhJp3sKXOIuzGp",
    title: "How Developers Should Learn React.js in 2026 (Sample 4)",
    slug: "how-developers-should-learn-react-js-in-2026-sample-4",
    thumbnail:
      "https://images.unsplash.com/photo-1775474519447-49c052c485e5?q=100",
    category: "Technology",
    description:
      "A complete and practical guide for developers to learn React.js in 2026 with modern tools and real-world approaches.",
    content:
      "React.js is no longer just a UI library. In 2026, it is the foundation of modern web applications.\n\nDevelopers need a structured approach to learn React effectively.\n\n...\n\nSample article number 4.",
    tags: ["React", "Frontend", "JavaScript"],
    publishedAt: "2026-04-09T15:53:44.044Z",
    status: "Published",
    authorId: "gvpsEzBnJCcT27GhWftMy",
    authorDetails: { fullName: "Admin User", email: "admin@gmail.com" },
    createdAt: "2026-04-09T15:53:44.044Z",
  },
  {
    id: "w2RJ43qUO5sSQthhlhfpc",
    title: "The Future of Frontend Development in 2026 (Sample 5)",
    slug: "future-of-frontend-development-2026-sample-5",
    thumbnail:
      "https://images.unsplash.com/photo-1774893582522-c8e9c0aeaec9?q=100",
    category: "Technology",
    description:
      "Explore how frontend development is evolving and what skills developers need to stay relevant.",
    content:
      "Frontend development is changing rapidly.\n\nIn 2026, developers must think beyond UI.\n\n...\n\nSample article number 5.",
    tags: ["Frontend", "Technology"],
    publishedAt: "2026-04-09T15:53:44.044Z",
    status: "Published",
    authorId: "gvpsEzBnJCcT27GhWftMy",
    authorDetails: { fullName: "Admin User", email: "admin@gmail.com" },
    createdAt: "2026-04-09T15:53:44.044Z",
  },
  {
    id: "oET684TJ0TYxU9oxXnlPT",
    title: "Complete Guide to Frontend Performance Optimization (Sample 6)",
    slug: "complete-guide-frontend-performance-optimization-sample-6",
    thumbnail:
      "https://images.unsplash.com/photo-1773754532196-014342510e64?q=100",
    category: "Technology",
    description:
      "Learn how to build fast and efficient web applications with modern optimization techniques.",
    content:
      "Performance is one of the most important aspects of frontend development.\n\n...\n\nSample article number 6.",
    tags: ["Performance", "React"],
    publishedAt: "2026-04-09T15:53:44.044Z",
    status: "Published",
    authorId: "gvpsEzBnJCcT27GhWftMy",
    authorDetails: { fullName: "Admin User", email: "admin@gmail.com" },
    createdAt: "2026-04-09T15:53:44.044Z",
  },
  {
    id: "cpSv-a_FDOjOpz8apWZAA",
    title: "How Developers Should Learn React.js in 2026 (Sample 7)",
    slug: "how-developers-should-learn-react-js-in-2026-sample-7",
    thumbnail:
      "https://images.unsplash.com/photo-1775474519447-49c052c485e5?q=100",
    category: "Technology",
    description:
      "A complete and practical guide for developers to learn React.js in 2026 with modern tools and real-world approaches.",
    content:
      "React.js is no longer just a UI library. In 2026, it is the foundation of modern web applications.\n\nDevelopers need a structured approach to learn React effectively.\n\n...\n\nSample article number 7.",
    tags: ["React", "Frontend", "JavaScript"],
    publishedAt: "2026-04-09T15:53:44.044Z",
    status: "Published",
    authorId: "gvpsEzBnJCcT27GhWftMy",
    authorDetails: { fullName: "Admin User", email: "admin@gmail.com" },
    createdAt: "2026-04-09T15:53:44.044Z",
  },
];

export { userData, articleData };
