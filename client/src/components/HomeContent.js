import styled from "styled-components"
import img from "../assets/joker.png"
import triangle from "../assets/Rectangle.png"

const HomeContent = ()=>{
    return (<HomeContentDiv>
        <img src={img} alt="" />
        <img src={triangle} alt="" />
        <h4>Have you ever lost minutes only<br/> for deciding on a movie to watch <br/>and ended up ruining the movie night? <br/>Do you want to discover new movies <br/>but also don’t want to watch a movie <br/>that is just not your cup of tea? Well, <br/>you’re in the right hands. With ……….. <br/>you can find the perfect movies for you!</h4>
    </HomeContentDiv>)
}

const HomeContentDiv = styled.div`

position:relative;
width:992px;
height:500px;
margin:1rem auto;

img{
    width:100%;
    position: absolute;
}
h4{
    position:absolute;
    text-align: left;
    font-size:24px;
    line-height:32px;
    top:10px;
    left:10px;
    color:white;
}

@media (max-width:992px){
    width:95%;
    height: auto;
    
    h4{
        font-size:12px;
        line-height: 16px;
    }
}

`

export default HomeContent