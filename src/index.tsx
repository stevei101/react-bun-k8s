import React from "react";
import { createRoot } from "react-dom/client";

const App = () => <h1>Hello from React + Bun + Kubernetes 🚀</h1>;

createRoot(document.getElementById("root")!).render(<App />);
