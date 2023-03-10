import React from "react";
import example from "../assets/joker.png";
import styled from "styled-components";
import {BsFillTrashFill} from "react-icons/bs"


import Tooltip from "@mui/material/Tooltip";

const ResultComponent = () => {
  return (
    <ResultContainer>
      <img src={example} alt="" />
      <div className="info">
        <h3 className="header">The Shawshank Redemption</h3>
        <div className="genre-date">
          <span className="info-span">Drama</span>
          <span className="info-span">1994</span>
          <span className="info-span">142 min</span>
          <span className="info-span">country</span>
          <span className="info-span">language</span>
          <span className="info-span">movie</span>
        </div>
        <div className="director-star">
          <p className="dir">
            <span className="bold">Director</span>: Frank Darabont
          </p>
          <p className="dir">
            <span className="bold">Stars</span>: 50 Cent
          </p>
        </div>
        <div className="bottom-info">
          <Tooltip title="I do not like this, remove from the movie list.">
            <button className="remove"> <BsFillTrashFill/></button>
          </Tooltip>
          <p className="match">94%</p>
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
  
  img {
    height:100%;
    width:100%;
  }

  .bold {
    font-weight: bold;
  }

  .director-star {
    margin:0 0.5rem;
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
  @media (max-width:992px){
    grid-template-columns: 1fr 2fr;
    .genre-date{
        grid-template-columns: 1fr 1fr;
    }
    .info-span{
        width:100px;
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
    line-height:40px;
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
    color:white;
  }
  p{
    margin-bottom:0.2rem;
  }
`;

export default ResultComponent;
