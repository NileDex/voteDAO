import React, { useState } from "react";
import Header from "../Header";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Move = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <Header />
      <div className="back">
        <Link to="/">
          <span className="backicon">
            <IoChevronBackOutline />
          </span>
        </Link>
      </div>
      <div className="votequestion">
        <h4>Proposal / Governance</h4>
        <h1>Vote Question</h1>
        <h3>Who Should be Move DAO President</h3>
      </div>
      <div className="answer-container">
        <div className="voteanswer">
          <form>
            <section>
              <label className="custom-radio">
                <input
                  type="radio"
                  value="yes"
                  checked={selectedOption === "yes"}
                  onChange={handleOptionChange}
                />
                <span className="checkmark"></span>
                Russhi
              </label>
            </section>
            <section>
              <label className="custom-radio">
                <input
                  type="radio"
                  value="no"
                  checked={selectedOption === "no"}
                  onChange={handleOptionChange}
                />
                <span className="checkmark"></span>
                Coop
              </label>
            </section>
            <button className="votebtn">VOTE</button>
          </form>
        </div>
        <div className="votedescription">
          <p>
            General Voting Rules One Person, One Vote: Each eligible voter
            should be allowed to cast only one vote. Eligibility Verification:
            Ensure that only eligible voters (those who meet predefined criteria
            such as age, residency, etc.) can participate in the voting process.
            Confidentiality: Voting should be confidential to protect voter
            privacy and prevent undue influence. Transparency: The voting
            process should be transparent to build trust. This includes clear
            instructions, open counting processes, and accessible records.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Move;
