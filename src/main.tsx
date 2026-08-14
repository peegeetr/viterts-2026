import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AppEmailSignature from "./components/email-signature-generator/AppEmailSignature.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <AppEmailSignature />
  </StrictMode>,
);
