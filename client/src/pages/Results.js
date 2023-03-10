import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ResultComponent from '../components/ResultComponent';

const Results = () => {
    return (
        <>
        <Navbar/>
        <ResultsContainer>
            <ResultComponent/>
            <ResultComponent/>
        </ResultsContainer>
        </>
    );
};

const ResultsContainer = styled.div`
    
    margin:2rem auto;
    width:70%;
    display:flex;
    flex-direction: column;
    column-gap: 2rem;
    row-gap: 2rem;
    @media (max-width:992px){
        width:90%;
    }

`

export default Results;