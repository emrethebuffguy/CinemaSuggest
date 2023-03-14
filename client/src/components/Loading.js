import React from 'react'
import styled from 'styled-components'

const Loading = () =>{
  return (
    <LoadingContainer>
        <div className='circle'></div>
    </LoadingContainer>
  )
}

const LoadingContainer = styled.section`

width:120px;
height: 120px;
border-radius: 50%;
background-color: #b70304;
margin: calc(15%) auto;
display:flex;
justify-content: center;
align-items: center;
animation: outerloading 3s infinite;
.circle{
    width: 0px;
    height:0px;
    background-color: rgba(255, 255, 255, 0.88);
    border-radius: 50%;
    animation: innerloading 3s infinite;

}

@keyframes outerloading{
    50% {width:0px; height:0px;}
    100% {width:120px; height:120px;}
}

@keyframes innerloading{
    50%{width:60px; height:60px;}
    100%{width:0px; height:0px;}
}

`

export default Loading