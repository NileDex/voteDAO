import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./component/ThemeContext";
// import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { AptosWalletProvider } from '@razorlabs/wallet-kit';
// import '@razorlabs/wallet-kit/style.css';
import "./razorlabs-wallet-kit-custom.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <AptosWalletProvider autoConnect={true}>
    <ThemeProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
    </AptosWalletProvider>
);

reportWebVitals();
