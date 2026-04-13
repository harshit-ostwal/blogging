import { nanoid } from "nanoid";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { statusOptions } from "@/constants/article";
import { StorageKeys } from "@/constants/storage-keys";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/localStorage.utils";
import { useAuth } from "./auth-provider";
import { articleData } from "@/constants/seed";
import { useEffect } from "react";

const ArticleContext = createContext();

const ArticleProvider = ({ children }) => {
  const { loggedInUser } = useAuth();

  useEffect(() => {
    if (!getLocalStorageItem(StorageKeys.ARTICLES)) {
      setLocalStorageItem(StorageKeys.ARTICLES, articleData);
    }
  }, []);

  const [articles, setArticles] = useState(
    getLocalStorageItem(StorageKeys.ARTICLES) || articleData,
  );

  const getDashboardStats = () => {
    const articles = fetchArticlesByUserId(loggedInUser.id);

    const totalArticles = articles.length;

    const totalViews = articles.reduce(
      (acc, article) => acc + article.views,
      0,
    );

    const totalLikes = articles.reduce(
      (acc, article) => acc + article.likes,
      0,
    );

    const totalPublished = articles.filter(
      (article) => article.status === statusOptions[1],
    ).length;

    const totalDraft = articles.filter(
      (article) => article.status === statusOptions[0],
    ).length;

    const totalUnpublished = articles.filter(
      (article) => article.status === statusOptions[2],
    ).length;

    return {
      totalArticles,
      totalViews,
      totalLikes,
      totalPublished,
      totalDraft,
      totalUnpublished,
    };
  };

  const attachAuthor = (article) => {
    const users = getLocalStorageItem(StorageKeys.USERS) || [];
    const authorUser = users.find((user) => user.id === article.authorId);
    const author = authorUser
      ? {
          fullName: authorUser.fullName,
          email: authorUser.email,
        }
      : undefined;
    return { ...article, author };
  };

  const fetchArticles = (limit) => {
    const publishedArticles = articles
      .filter((article) => article.status === statusOptions[1])
      .map(attachAuthor);

    const sortedArticles = publishedArticles.sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
    );

    if (limit !== 0) {
      return sortedArticles.slice(0, limit);
    }

    return sortedArticles;
  };

  const fetchArticlesByUserId = (userId) => {
    return articles
      .filter((article) => article.authorId === userId)
      .map(attachAuthor);
  };

  const fetchArticleById = (articleId) => {
    const article = articles.find((article) => article.id === articleId);
    if (!article) return undefined;

    if (!loggedInUser) {
      if (article.status !== statusOptions[1]) return undefined;
      return attachAuthor(article);
    }

    if (article.authorId === loggedInUser.id) {
      return attachAuthor(article);
    }

    if (article.status === statusOptions[1]) {
      return attachAuthor(article);
    }
    return undefined;
  };

  const fetchArticleByTitle = (title) => {
    const article = articles.find((article) => article.title === title);
    if (!article) return undefined;
    return attachAuthor(article);
  };

  const createArticle = (data) => {
    const existingArticles = fetchArticleByTitle(data.title);

    if (existingArticles) {
      toast.error(
        "An article with the same title already exists. Please choose a different title.",
      );
      return;
    }

    const newArticle = {
      id: nanoid(),
      ...data,
      publishedAt: null,
      status: statusOptions[0],
      authorId: loggedInUser.id,
      createdAt: new Date().toISOString(),
    };

    const updatedArticles = [...articles, newArticle];
    setArticles(updatedArticles);
    setLocalStorageItem(StorageKeys.ARTICLES, updatedArticles);
    toast.success("Article created successfully!");
    return true;
  };

  const updateStatus = (articleId, status) => {
    const article = fetchArticleById(articleId);

    if (!article) {
      toast.error("Article not found.");
      return false;
    }

    const updatedArticle = {
      ...article,
      status,
      publishedAt:
        status === statusOptions[1] ? new Date().toISOString() : null,
    };

    const updatedArticles = articles.map((a) =>
      a.id === articleId ? updatedArticle : a,
    );

    setArticles(updatedArticles);
    setLocalStorageItem(StorageKeys.ARTICLES, updatedArticles);
    toast.success("Article status updated successfully!");
    return true;
  };

  const updateArticle = (articleId, data) => {
    const article = fetchArticleById(articleId);

    if (!article) {
      toast.error("Article not found.");
      return false;
    }

    const updatedArticle = {
      ...article,
      ...data,
    };

    const updatedArticles = articles.map((a) =>
      a.id === articleId ? updatedArticle : a,
    );

    setArticles(updatedArticles);
    setLocalStorageItem(StorageKeys.ARTICLES, updatedArticles);
    toast.success("Article updated successfully!");
    return true;
  };

  const deleteArticle = (articleId) => {
    const article = fetchArticleById(articleId);

    if (!article) {
      toast.error("Article not found.");
      return false;
    }

    const updatedArticles = articles.filter((a) => a.id !== articleId);

    setArticles(updatedArticles);
    setLocalStorageItem(StorageKeys.ARTICLES, updatedArticles);
    toast.success("Article deleted successfully!");
    return true;
  };

  return (
    <ArticleContext.Provider
      value={{
        fetchArticles,
        fetchArticlesByUserId,
        fetchArticleById,
        fetchArticleByTitle,
        createArticle,
        getDashboardStats,
        updateStatus,
        updateArticle,
        deleteArticle,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

const useArticle = () => useContext(ArticleContext);

export { ArticleProvider, useArticle };
