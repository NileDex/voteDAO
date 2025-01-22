import { useState } from "react";
import { MdCancel } from "react-icons/md";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Socials from "./components/Socials";
import Header from "./components/Header";
import Vitals from "./components/Vitals";
import VoteData from "./components/VoteData";
import Proposals from "./components/Proposals";
import FAQ from "./components/FAQ";
import Move from "./components/votecomponent/Vote";
import Profile from "./components/profilecomponent/Profile";
import Footer from "./components/votecomponent/utils/Footer";
import AnalyticsPage from "./components/Analytics/analytics";
import SimpleCards from "./components/community/CommunityGovernance";



function App() {
  const [showHeader, setShowHeader] = useState(true);

  const handleCancelClick = () => {
    setShowHeader(false);
  };

  return (
    <BrowserRouter>
            <div>
                <div className="hero-background"></div>
                {showHeader && (
                  <div className="socials">
                    <Socials />
                    <p className="cancel-button" onClick={handleCancelClick}>
                      <MdCancel />
                    </p>
                  </div>
                )}
              </div>
              <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
      
              <Vitals />
              <VoteData />
              <Proposals />
              <FAQ />
       
            </div>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/CommunityGovernance" element={ <SimpleCards/> } />
        <Route path="/vote" element={<Move />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
