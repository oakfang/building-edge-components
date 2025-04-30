import "./index.css";

import { createRoot } from "react-dom/client";
import { App } from "./App";

function start() {
  const rootEl = document.getElementById("root");
  if (!rootEl) throw new Error("Root element not found");
  const root = createRoot(rootEl);
  root.render(<App />);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
