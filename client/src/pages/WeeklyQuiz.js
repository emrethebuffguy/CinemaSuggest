import styled from "styled-components"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Loading from "../components/Loading"

const WeeklyQuiz = ()=>{

    return <>
        <Navbar/>
        <Quiz>
        <h1>COMING SOON!!!</h1>
        <Loading/>
        </Quiz>
    </>
}

const Quiz = styled.div`
h1{
    color: white;
    text-align: center;
    margin-top:2rem;
}
`

export default WeeklyQuiz