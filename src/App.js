import React, { useState } from "react";
import "./App.css";
import Header from "./component/Header";
import Proposals from "./component/Proposal";
import Vitals from "./component/Vitals";
import Votedata from "./component/Vote-data";
import Socials from "./component/topheader";
import Move from "./component/votecomponent/Vote";
import { MdCancel } from "react-icons/md";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";



import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  const [showHeader, setShowHeader] = useState(true);

  const aptosConfig = new AptosConfig({ network: Network.DEVNET });
  const aptos = new Aptos(aptosConfig);


  const handleCancelClick = () => {
    setShowHeader(false);
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <div>
              {showHeader && (
                <div className="header">
                  <Socials />
                  <p className="cancel-button" onClick={handleCancelClick}>
                  <MdCancel />
                  </p>
                </div>
              )}
              </div>
              <Header  />
              <Vitals />
              <Votedata  />
              <Proposals />
          
            </div>
          }
        />
        <Route path="/vote" element={<Move />} />
      </Routes>
    </Router>
  );
}

export default App;
