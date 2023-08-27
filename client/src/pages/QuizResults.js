import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const QuizResults = () => {
  const location = useLocation();

  return location.state ? (
    <>
      <Navbar />
      <QuizResultsContainer>
        <h1>You answered {location.state} questions right.</h1>
        <h3>
          <Link to="/quiz" className="quiz-link">
            Click Here{" "}
          </Link>
          to Solve the quiz again
        </h3>
      </QuizResultsContainer>
      <Footer />
    </>
  ) : (
    <>
      <Navbar/>
        <QuizResultsContainer>
          <h1>Too see the results, please solve the quiz first </h1>{" "}
          <h3>
            <Link to="/quiz" className="quiz-link">
              Weekly Quiz
            </Link>
          </h3>
        </QuizResultsContainer>
      <Footer/>
    </>
  );
};

const QuizResultsContainer = styled.div`
  width: 600px;
  height: 300px;
  border: 1px solid white;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  border-radius: 2rem;
  margin-bottom: 8rem;

  @media (max-width: 992px) {
    width: 90vw;
    padding: 8px;
    h1 {
      font-size: 1.5rem;
    }
  }

  h1,
  h3 {
    color: white;
    text-align: center;
  }
  h1 {
    font-size: 2rem;
  }
  .quiz-link {
    color: #ee4040;
  }
  .quiz-link:hover {
    color: #4d96cf;
  }
`;

export default QuizResults;
