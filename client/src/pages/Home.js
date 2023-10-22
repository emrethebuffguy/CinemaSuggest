import styled from "styled-components";
import Heroslider from "../components/Heroslider";
import Navbar from "../components/Navbar";
import BottomComp from "../components/BottomComp";
import HomeContent from "../components/HomeContent";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <Wrapper>
      <Navbar />

      <Heroslider />
      <HomeContent />
      <BottomComp />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  background-color: black;
`;

export default Home;
