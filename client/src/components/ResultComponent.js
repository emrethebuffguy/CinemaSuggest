import React, { useState,useEffect } from "react";

import styled from "styled-components";
import { BsFillTrashFill } from "react-icons/bs";

import Tooltip from "@mui/material/Tooltip";

const ResultComponent = (props) => {
  const [onDestroy,setOnDestroy] = useState(false);
  
  const { resultData, setResultData, arrindex } = props;
  const handleDelete = (e) => {
    setOnDestroy(true);
    setTimeout(()=>{
      const newData = resultData.filter((item, index) => {
        if (arrindex !== index) {
          return item;
        }
      });
      setResultData(newData);
      setOnDestroy(false);
    },500)
    
  };


  return (
    <ResultContainer className={onDestroy? "on-destroy": null}>
      <img src={props.poster_link} alt="" />
      <div className="info">
        <h3 className="header">{props.title}</h3>
        <div className="genre-date">
          {props.genre.map((item, index) => {
            return (
              <span key={index} className="info-span">
                {item}
              </span>
            );
          })}

          <span className="info-span">{props.date}</span>
          <span className="info-span">{props.duration}min</span>
          <span className="info-span">{props.country}</span>
          <span className="info-span">{props.language}</span>
          <span className="info-span">{props.movie_type}</span>
        </div>
        <div className="director-star">
          <p className="dir">
            <span className="bold">Director</span>: {props.director}
          </p>
          <p className="dir">
            <span className="bold">Stars</span>: {props.actors.join(", ")}
          </p>
        </div>
        <div className="bottom-info">
          <Tooltip title="I do not like this, remove from the movie list.">
            <button onClick={handleDelete} className="remove">
              <BsFillTrashFill />
            </button>
          </Tooltip>

          <p className="match">
            {Math.floor((props.points / props.maxPoints) * 100)}%
          </p>
        </div>
      </div>
    </ResultContainer>
  );
};

const ResultContainer = styled.section`
  width: 100%;
  background: rgba(217, 217, 217, 0.17);
  height: auto;
  display: grid;
  grid-template-columns: 1fr 3fr;
  transition: all 0.3s ease-in-out;

  img {
    max-height: 400px;
    width: auto;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .bold {
    font-weight: bold;
  }

  .director-star {
    margin: 0 0.5rem;
  }

  .dir {
    color: white;
    font-size: 20px;
  }

  .header {
    color: black;
    background-color: #d9d9d9;
    padding: 3px 30px;
    text-align: center;
    margin: 0.5rem;
  }
  .genre-date {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 0.5rem;
    column-gap: 0.5rem;
    margin: 0.5rem;
  }

  .info-span {
    background: #b70304;
    text-align: center;
    color: white;
    font-size: 16px;
    border-radius: 15px;
    padding: 5px;
  }
  @media (max-width: 992px) {
    grid-template-columns: 1fr 2fr;
    .genre-date {
      grid-template-columns: 1fr 1fr;
    }
    .info-span {
      width: 100px;
    }
    img {
      width: 100%;
    }
  }
  .bottom-info {
    margin: 0.5rem;
    display: flex;
    justify-content: space-between;
  }

  .match {
    background-color: #d9d9d9;
    color: black;
    padding: 5px 10px;
    text-align: center;
    font-weight: bold;
    line-height: 40px;
  }

  .remove {
    border: none;
    font-size: 48px;
    border: none;
    background: transparent;
    color: #b70304;
    cursor: pointer;
  }
  .remove:hover {
    color: white;
  }
  p {
    margin-bottom: 0.2rem;
  }
`;

export default ResultComponent;
