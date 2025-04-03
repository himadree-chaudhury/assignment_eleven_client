import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import Routing from "./routes/Routing.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>

      {/* React Hot Toast container */}
      <Toaster></Toaster>
    </AuthProvider>
    ,
  </StrictMode>,
);
