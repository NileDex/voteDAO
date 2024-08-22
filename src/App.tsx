import { useState } from "react";
import { MdCancel } from "react-icons/md";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Socials from "./components/Socials";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Vitals from "./components/Vitals";
import VoteData from "./components/VoteData";
import Proposals from "./components/Proposals";
import FAQ from "./components/FAQ";
import Move from "./components/votecomponent/Vote";
import Navbar from "./landing/Navbar";

function App() {
  const [showHeader, setShowHeader] = useState(true);

  const handleCancelClick = () => {
    setShowHeader(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navbar />} // Correctly use self-closing tag for Navbar
        />
        <Route
          path="/main"
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
              <Header />
              <Vitals />
              <VoteData />
              <Proposals />
              <FAQ />
              <Footer />
            </div>
          }
        />
        <Route path="/vote" element={<Move />} />
        <Route path="/vote2" element={<Move />} />
        <Route path="/vote3" element={<Move />} />
        <Route path="*" element={<Navigate to="/" />} />{" "}
        {/* Redirect unknown paths to landing page */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
