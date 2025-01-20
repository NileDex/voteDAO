import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./profilecss/profile.css";

const Profile: React.FC = () => {
  // Properly type the state for `currentStep`
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Type the `formData` state
  const [formData, setFormData] = useState<{
    username: string;
    additionalInfo: string;
  }>({
    username: "",
    additionalInfo: "",
  });

  // Handle advancing to the next step
  const handleNext = () => setCurrentStep((prev) => prev + 1);

  // Handle going back to the previous step
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
     
      <div className="profile-container">
        <div className="eligible-container">
          {/* Progress Bar */}
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>

          {/* Step 1: Check Eligibility */}
          {currentStep === 1 && (
            <>
              <h1>Check Eligibility</h1>
              <p>Ensure you meet the requirements to prove ownership of assets.</p>
              <Link
                to="#"
                className="eligibility-button"
                onClick={handleNext}
              >
                Check Eligibility
              </Link>
            </>
          )}

          {/* Step 2: Display NFT */}
          {currentStep === 2 && (
            <>
              <h1>Your NFT</h1>
              <div className="nft-frame">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS4ErWyouTCiRv77HOm1_ggvdT5GgKouZi1w&s" // Replace with your NFT image source
                  alt="NFT"
                  className="nft-image"
                />
              </div>
              <p>This is your proof of ownership.</p>
              <div className="button-group">
                <button className="eligibility-button" onClick={handleBack}>
                  Back
                </button>
                <button className="eligibility-button" onClick={handleNext}>
                  Proceed
                </button>
              </div>
            </>
          )}

          {/* Step 3: User Info Form */}
          {currentStep === 3 && (
            <>
              <h1>Complete Your Profile</h1>
              <form
                className="user-info-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Form Submitted");
                }}
              >
                <label>
                  Username (with @):
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="@username"
                    required
                  />
                </label>
                <label>
                  Additional Info:
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    placeholder="Add any necessary information"
                  />
                </label>
                <div className="button-group">
                  <button
                    type="button"
                    className="eligibility-button"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                  <button type="submit" className="eligibility-button">
                    Submit
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
