import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import ResultComponent from "../components/ResultComponent";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";


const devUrl = "https://cinemasuggest.herokuapp.com/api/v1/movies/?";

const localUrl = "http://localhost:5000/api/v1/movies/?";

const handlePassingData = (passData) => {
  const genres = passData.state.genres.join(",");
  const warningState = passData.state.warningState.join(",");
  const featureState = passData.state.featureState.join(",");
  const actors = passData.state.actors.join(",");

  return {
    ...passData.state,
    genres: genres,
    actors: actors,
    featureState: featureState,
    warningState: warningState,
  };
};

const Results = (props) => {
  let passData = useLocation();

  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [maxPoints, setMaxPoints] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = handlePassingData(passData);
        const response = await fetch(
          `${localUrl}durationFilter=${data.duration.join(
            ","
          )}&date=${data.date.join(",")}&genres=${data.genres}&imdbRate=${
            data.imdbscore
          }&metaRate=${data.metascore}&warnings=${
            data.warningState
          }&languages=${data.language}&popularity=${data.popularity}&country=${
            data.country
          }&actors=${data.actors}&features=${data.featureState}&director=${
            data.director
          }&type=${data.type}`
        );
        const newData = await response.json();
        setResultData(newData.data);
        setMaxPoints(newData.maxPoints);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (!loading) {
    return (
      <>
        <Navbar />
        <ResultsContainer>
          
            {resultData.map((data, index) => {
              if (index <= 10) {
                return (
                  
                    <ResultComponent
                      arrindex={index}
                      resultData={resultData}
                      setResultData={setResultData}
                      key={index}
                      {...data}
                      maxPoints={maxPoints}
                    />
                  
                );
              }
            })}
          
          <Link className="test-retake" to="/movietest">
            Retake The Test
          </Link>
        </ResultsContainer>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <Loading />
      </>
    );
  }
};

const ResultsContainer = styled.div`
  margin: 2rem auto;
  width: 70%;
  display: flex;
  flex-direction: column;
  column-gap: 2rem;
  row-gap: 2rem;
  transition: transform 0.3s ease-in-out;
  @media (max-width: 992px) {
    width: 95%;
  }
  .trans {
    display: flex;
    flex-direction: column;
    column-gap: 2rem;
    row-gap: 2rem;
  }
  .test-retake {
    padding: 4px 52px;
    border-radius: 10px;
    background-color: #b70304;
    color: white;
    margin-left: 10%;
    font-size: 24px;
  }

  .on-destroy{
    transform: translateX(200%);
  }
`;

export default Results;
