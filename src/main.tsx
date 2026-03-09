import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "./hooks/Auth.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <CookiesProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CookiesProvider>
  </StrictMode>
);
