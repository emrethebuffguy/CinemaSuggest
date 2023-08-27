import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import React, { useState, useEffect } from "react";
import {GrCaretNext} from "react-icons/gr"
import { useNavigate } from "react-router-dom";
const url = "http://localhost:5000/api/v1/quiz";
const prodUrl = "https://cinemasuggest.com/api/v1/quiz";

const WeeklyQuiz = () => {
  const [weeklyQuiz, setWeeklyQuiz] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [noOfCorrectAnswers, setNoOfCorrectAnswers] = useState(0);
  const [isQuizFinished,setIsQuizFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const generateQuiz = async () => {
      const response = await fetch(prodUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setWeeklyQuiz(data.data);
        console.log(data.data)
        setIsDataLoaded(true);
      } else {
        console.log("failed to fetch data. please try again later");
      }
    };

    generateQuiz();
  }, []);

  const handleQuizClick = (ans) => {
    if(ans === weeklyQuiz.answers[currentQuestion]){
      let answer = noOfCorrectAnswers +1;
      setNoOfCorrectAnswers(answer);
    }

    let current = currentQuestion+1
    setCurrentQuestion(current);

    if(currentQuestion === weeklyQuiz.answers.length-1){
      navigate("/quizresults", {state: noOfCorrectAnswers});
    }
  }

  return isDataLoaded ? (
    <>
      <Navbar />
      <Quiz>
        <h2>How Well Do You Know {weeklyQuiz.title}</h2>
        <div className="question-box">
          <h4>
            {currentQuestion + 1}- {weeklyQuiz.questions[currentQuestion]}
          </h4>
          <button onClick={()=> handleQuizClick(0)}>{weeklyQuiz.options[currentQuestion].split(",")[0]}</button>
          <button onClick={()=> handleQuizClick(1)}>{weeklyQuiz.options[currentQuestion].split(",")[1]}</button>
          <button onClick={()=> handleQuizClick(2)}>{weeklyQuiz.options[currentQuestion].split(",")[2]}</button>
          <button onClick={()=> handleQuizClick(3)}>{weeklyQuiz.options[currentQuestion].split(",")[3]}</button>
        </div>

      </Quiz>
      <Footer/>
    </>
  ) : (
    <Loading />
  );
};

const Quiz = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: auto;
  width: 50vw;
  gap: 2rem;
  padding: 4px;
  margin-bottom:3rem;

  @media (max-width:992px){
    width:90vw;
  }

  h2 {
    color: white;
    text-align: center;
    margin-top: 3rem;
  }
  .question-box {
    background-color: transparent;
    border:2px solid white;
    border-radius: 2rem;
    padding: 1.5rem;
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h4 {
      color: white;
      font-size: 1.2rem;
    }
    p {
      color: white;
    }
    button {
      font-family: arial;
      color: #fffff8 !important;
      font-size: 14px;
      text-shadow: 0px 0px 0px #ffffff;
      box-shadow: 1px 1px 0px #0d0b0d;
      width: 70%;
      border-radius: 10px;
      border: 1px solid #000000;
      background: #ee4040;
      background: linear-gradient(to top, #ee4040, #cf1919);
      cursor: pointer;
      padding:10px;
      text-align: left;
    }
    button:hover {
      color: #ffffff !important;
      background: #4d96cf;
    }
  }
  
`;

export default WeeklyQuiz;
