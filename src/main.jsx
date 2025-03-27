import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import Routing from "./routes/Routing";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Routing/>
    </StrictMode>
  </BrowserRouter>
);
