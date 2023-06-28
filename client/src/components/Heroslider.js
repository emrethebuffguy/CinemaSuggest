import { useEffect,useState } from "react";
import styled from "styled-components";
import imgUrl from '../assets/spiderman.jpg';
import { Link } from "react-router-dom";

import imgTwo from "../assets/slider3.png"
import imgThree from "../assets/slider4.png"
import imgFour from "../assets/slider5.png"
import imgFive from "../assets/cinema.jpg"
import imgSix from "../assets/movie.jpg"
const slideDelay = 5000;

const Heroslider = () => {
  const [current,setCurrent] = useState(0);
  const slideList = [imgUrl,imgFive,imgSix,imgTwo,imgThree,imgFour];


  useEffect(()=>{
    setTimeout(()=> {
      if(current >= slideList.length-1){
        setCurrent(0);
      }
      else{
        setCurrent(current + 1);
      }
      return ()=>{}
    },slideDelay)
  },[current])

  return (
    <HeroContainer>
        <div className="slider">
        {slideList.map((slide,index)=>{
          return(<img key={index} className={index === current ? 'slide active' : 'slide'} src={slide} alt="" />)
        })}

        </div>
        <h1>CHOOSING A MOVIE HAS<br/> NEVER BEEN EASIER.</h1>
        <p>Stop scrolling hours only to find a movie you do not like. <br/>Take the test and let it decide for you.</p>
        <Link className="submitbtn" to="/movietest">Take The Test</Link>
    </HeroContainer>
  );
};


const HeroContainer = styled.div`
  background: black ;
  min-width:100%;
  min-height:100vh;
  z-index:1;
  position: relative;
  margin:0 auto;
  
  margin-top: -5rem;
  .slider{
    height:650px;
    position:relative;
    display:flex;
    justify-content: flex-start;
    margin:5rem auto;
    width:683px;
    
    overflow: hidden;
    transition: all 0.4s linear;

  }
  img{
    width:100%;
  }
  .slide{
    
    position:absolute;
    height:100%;
    opacity:0;
    left:0;
    transition: all 0.4s linear;
  }
  .slide.active{
    opacity:1 !important;
    transition: all 0.4s linear;
  }
  
  h1 {
    z-index:0;
    text-align: left;
    position: absolute;
    top: 15%;
    left: 10%;
    font-size: 48px;
    line-height: 60px;
    background: transparent;
    color: white;
  }
  p{
    position:absolute;
    top:30%;
    left:10%;
    color:white;
  }
  .submitbtn{
    background-color: #B70304;
    color:white;
    position:absolute;
    top:40%;
    left:10%;
    font-size:32px;
    padding: 8px 16px;
    border-radius: 4px;
    cursor:pointer;
    border:none;
  }
  .submitbtn:hover{
    background-color: #ed8554;
  }

  @media (max-width:992px){
    height: 600px;
    .slider{
      max-width:95vw;
      height:600px;
      margin:10rem auto;
      margin-bottom: 0;
    }
    .slide{
      height:auto;
    }
    h1{
      font-size:40px;
      line-height:48px;
      top:10%;
    }
    p{
      top:40%;
    }
    .submitbtn{
      top:60%;
    }
  }

`;

export default Heroslider;
