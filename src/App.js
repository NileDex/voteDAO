// import React, { useState } from "react";
// import "./App.css";
// import Header from "./component/Header";
// import Proposals from "./component/Proposal";
// import Vitals from "./component/Vitals";
// import Votedata from "./component/Vote-data";
// import Socials from "./component/topheader";
// import Move from "./component/votecomponent/Vote";
// import Move2 from "./component/votecomponent/Vote2";
// import Move3 from "./component/votecomponent/Vote3";
// import { MdCancel } from "react-icons/md";
// import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
// import FAQ from "./component/FAQ"



// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { FaQ } from "react-icons/fa6";


// function App() {
//   const [showHeader, setShowHeader] = useState(true);

//   const aptosConfig = new AptosConfig({ network: Network.DEVNET });
//   const aptos = new Aptos(aptosConfig);


//   const handleCancelClick = () => {
//     setShowHeader(false);
//   };
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <div className="App">
//               <div>
//               {showHeader && (
//                 <div className="header">
//                   <Socials />
//                   <p className="cancel-button" onClick={handleCancelClick}>
//                   <MdCancel />
//                   </p>
//                 </div>
//               )}
//               </div>
//               <Header  />
//               <Vitals />
//               <Votedata  />
//               <Proposals />
//               <FAQ/>
//             </div>
//           }
//         />
//         <Route path="/vote" element={<Move />} />
//         <Route path="/vote2" element={<Move2 />} />
//         <Route path="/vote3" element={<Move3 />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React, { useState } from "react";
import "./App.css";
import Header from "./component/Header";
import Proposals from "./component/Proposal";
import Vitals from "./component/Vitals";
import Votedata from "./component/Vote-data";
import Socials from "./component/topheader";
import Move from "./component/votecomponent/Vote";
import Move2 from "./component/votecomponent/Vote2";
import Move3 from "./component/votecomponent/Vote3";
import FAQ from "./component/FAQ";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import Navbar from "./landing/landing"; // Ensure this is the correct path and component
import Footer from "./component/footer";

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
              <Votedata />
              <Proposals />
              <FAQ />
              <Footer/>
            </div>
          }
        />
        <Route path="/vote" element={<Move />} />
        <Route path="/vote2" element={<Move2 />} />
        <Route path="/vote3" element={<Move3 />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown paths to landing page */}
      </Routes>
    </Router>
  );
}

export default App;
