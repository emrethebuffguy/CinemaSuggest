import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import imgUrl from "../assets/design_1.png";
import imgTwo from "../assets/design_2.png";
import imgThree from "../assets/design_3.png";
import imgFour from "../assets/design_4.png";
import imgFive from "../assets/design_5.png";
import imgSix from "../assets/design_6.png";
const slideDelay = 5000;

const Heroslider = () => {
  const [current, setCurrent] = useState(0);
  const slideList = [imgUrl, imgFive, imgSix, imgTwo, imgThree, imgFour];

  useEffect(() => {
    setTimeout(() => {
      if (current >= slideList.length - 1) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
      return () => {};
    }, slideDelay);
  }, [current]);

  return (
    <HeroContainer>
      <div className="slider">
        {slideList.map((slide, index) => {
          return (
            <img
              key={index}
              className={index === current ? "slide active" : "slide"}
              src={slide}
              alt=""
            />
          );
        })}
      </div>
      <h1>
        CHOOSING A MOVIE HAS
        <br /> NEVER BEEN EASIER.
      </h1>
      <p>
        Stop scrolling hours only to find a movie you do not like. <br />
        Take the test and let it decide for you.
      </p>
      <Link className="submitbtn" to="/movietest">
        Take The Test
      </Link>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  background: black;
  min-width: 100%;
  /* min-height: 100vh; */
  z-index: 1;
  position: relative;
  margin: 0 auto;

   margin-top: -3rem; 
   @media (max-width:992px){
    /* min-height: 100%; */
    height:400px !important;
   }
  .slider {
    height: 720px;
    position: relative;
    display: flex;
    justify-content: flex-start;
    margin: 5rem auto;
    width: 80%;

    overflow: hidden;
    transition: all 0.4s linear;
  }
  @media (max-width:992px){
    .slider{
      height: 400px;
      width:100%;
    }
  }
  img {
    width: 100%;
  }
  .slide {
    position: absolute;
    height: 100%;
    opacity: 0;
    left: 0;
    transition: all 0.4s linear;
  }
  .slide.active {
    opacity: 1 !important;
    transition: all 0.4s linear;
  }

  h1 {
    z-index: 0;
    text-align: left;
    position: absolute;
    top: 10%;
    left: 10%;
    font-size: 48px;
    line-height: 60px;
    background: rgba(0,0,0,0.6);
    color: white;
    padding:6px;
  }
 
  p {
    position: absolute;
    top: 30%;
    left: 10%;
    background: rgba(0,0,0,0.6);
    color: white;
    padding:6px;
  }
  .submitbtn {
    background-color: #b70304;
    color: white;
    position: absolute;
    top: 40%;
    left: 10%;
    font-size: 32px;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
  }
  .submitbtn:hover {
    background-color: #ed8554;
  }

  @media (max-width: 992px) {
    height: 600px;
    .slider {
      max-width: 95vw;
      height: 300px;
      margin: 2rem auto;
      margin-bottom: 0;
    }
    .slide {
      height: auto;
    }
    h1 {
      font-size: 20px;
      line-height: 24px;
      top: 10%;
      left:2%;
    }
    p {
      top: 35%;
      left:2%;
    }
    .submitbtn {
      top: 70%;
      left:2%;
    }
  }
`;

export default Heroslider;
