import styled from "styled-components"
import img from "../assets/explanation_design.png"


const HomeContent = ()=>{
    return (<HomeContentDiv>
        <img src={img} alt="" />
       
    </HomeContentDiv>)
}

const HomeContentDiv = styled.div`


width:992px;
height:600px;
margin:1rem auto;

img{
    width:100%;
    
}


@media (max-width:992px){
    width:95%;
    height: auto;
    margin:4rem auto;
    
}

`

export default HomeContent