import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AptosWalletProvider } from "@razorlabs/wallet-kit";
import { ThemeProvider } from "./components/ThemeContext.tsx";

import App from "./App.tsx";
import "./index.css";
import "@razorlabs/wallet-kit/style.css";
import "./razorlabs-wallet-kit-custom.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AptosWalletProvider autoConnect={true}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AptosWalletProvider>
  </StrictMode>
);
