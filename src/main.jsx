import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "./components/ui/sonner";
import { ArticleProvider } from "./providers/article-provider";
import { AuthProvider } from "./providers/auth-provider";
import AppRoutes from "./routes/app-routes";

createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <ArticleProvider>
            <AppRoutes />
            <Toaster />
        </ArticleProvider>
    </AuthProvider>
);
