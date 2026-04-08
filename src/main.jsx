import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/app-routes";
import { AuthProvider } from "./providers/auth-provider";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>,
);
