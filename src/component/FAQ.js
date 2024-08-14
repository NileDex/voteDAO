import React, { useState } from "react";
import "../App.css";

const FAQ = () => {
  const [faqs, setFaqs] = useState([
    {
      question: "What is Blockchain?",
      answer:
        "Blockchain is a decentralized digital ledger technology that records transactions across multiple computers in such a way that the registered transactions cannot be altered retroactively.",
    },
    {
      question: "What are Smart Contracts?",
      answer:
        "Smart contracts are self-executing contracts with the terms of the agreement directly written into code. They automatically execute and enforce the terms of a contract when predetermined conditions are met.",
    },
    {
      question: "How does Decentralized Governance work?",
      answer:
        "Decentralized governance allows stakeholders of a network or platform to participate in decision-making processes through voting and proposals. It enables decentralized autonomous organizations (DAOs) to operate autonomously based on predefined rules and community consensus.",
    },
    // Add more FAQ items as needed
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);

  const toggleFAQ = (index) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index].open = !updatedFaqs[index].open;
    setFaqs(updatedFaqs);
  };

  const openModal = (faq) => {
    setSelectedFAQ(faq);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFAQ(null);
  };

  return (
    <div className="faq">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <h3>{faq.question}</h3>
              <span>{faq.open ? "-" : "+"}</span>
            </div>
            {faq.open && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
                <button className="openmodal" onClick={() => openModal(faq)}>
                  Read More
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && selectedFAQ && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{selectedFAQ.question}</h3>
            <p>{selectedFAQ.answer}</p>
            <button className="modal-close" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQ;
