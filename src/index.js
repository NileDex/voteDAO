import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./component/ThemeContext";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";


const wallets = [new PetraWallet()];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
    <ThemeProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </AptosWalletAdapterProvider>
);

reportWebVitals();
