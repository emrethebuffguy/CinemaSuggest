import styled from "styled-components";
import computer from "../assets/CinemaSuggest.png";
import { Link } from "react-router-dom";
const BottomComp = () => {
  return (
    <BottomCompContainer>
      <h2>How To Use CinemaSuggest ?</h2>
      <div className="computer-section">
        <div>
          <h4>
            It’s really simple! Just answer the questions and let CinemaSuggest
            give you the best movie suggestions. If you
            watched the suggested movies just mark them as ‘watched’ or discard
            them and CinemaSuggest will come up with new ones.
          </h4>
          <Link className="sbmt" to="/movietest">Take The Test</Link>
        </div>
        <img src={computer} alt="computer" />
      </div>
    </BottomCompContainer>
  );
};

const BottomCompContainer = styled.div`
  width: 80%;
  height: 80%;
  margin: 2rem auto;
  margin-top: 15rem;

  display: flex;
  flex-direction: column;

  h2 {
    padding: 3px;
    color: white;
  }
  h4 {
    padding: 3px;
    font-size: 24px;
    line-height: 30px;
    color: white;
    margin-top:-6rem;
  }

  .computer-section {
    display: flex;
    align-items: center;
  }

  img {
    width: 700px;
  }
 .sbmt {
    background-color: #b70304;
    color: white;
    margin-top:16px;
    top: 60%;
    left: 10%;
    font-size: 32px;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
  }
  .sbmt:hover {
    background-color: #ed8554;
  }

  @media (max-width:992px){
    margin-top:15rem;
    .computer-section{
        flex-direction: column;
    }
    h4{
        margin-top:0;
        font-size:16px;
        line-height: 20px;
    }
    
    img{
        width:95%;
    }
  }
`;

export default BottomComp;
