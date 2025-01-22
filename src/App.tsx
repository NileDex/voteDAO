<<<<<<< HEAD
=======
// import { useState } from "react";
// import { MdCancel } from "react-icons/md";
// import "./App.css";
// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Socials from "./components/Socials";
// import Header from "./components/Header";
// import Vitals from "./components/Vitals";
// import VoteData from "./components/VoteData";
// import Proposals from "./components/Proposals";
// import FAQ from "./components/FAQ";
// import Move from "./components/votecomponent/Vote";

// function App() {
//   const [showHeader, setShowHeader] = useState(true);

//   const handleCancelClick = () => {
//     setShowHeader(false);
//   };

//   return (
//     <BrowserRouter>
//       <Routes>

//         <Route
//           path="/"
//           element={
//             <div className="App">
//               <div>
//               <div className="hero-background"></div>
//                 {showHeader && (
//                   <div className="socials">
//                     <Socials />
//                     <p className="cancel-button" onClick={handleCancelClick}>
//                       <MdCancel />
//                     </p>
//                   </div>
//                 )}
//               </div>
//               <Header />
//               <Vitals />
//               <VoteData />
//               <Proposals />
//               <FAQ />

//             </div>
//           }
//         />
//         <Route path="/vote" element={<Move />} />
//         <Route path="/vote2" element={<Move />} />
//         <Route path="/vote3" element={<Move />} />
//         <Route path="*" element={<Navigate to="/" />} />{" "}
//         {/* Redirect unknown paths to landing page */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
>>>>>>> 4cf47d670c645f87e68663261e134d4b5448458c
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
import Vote from "./components/votecomponent/Vote";
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
<<<<<<< HEAD
        <Route path="/CommunityGovernance" element={ <SimpleCards/> } />
        <Route path="/vote" element={<Move />} />
=======
        {/* <Route path="/CommunityGovernance" element={<CommunityGovernance/>} /> */}
        <Route path="/vote" element={<Vote />} />
>>>>>>> 4cf47d670c645f87e68663261e134d4b5448458c
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
