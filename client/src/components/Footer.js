import styled from "styled-components";
import {AiFillFacebook} from "react-icons/ai"
import {FaTiktok} from "react-icons/fa"
import {BsInstagram} from "react-icons/bs"
//footer
const Footer = () => {
  return (
    <FooterContainer>
      <div className="info">
        <div className="content">
          <h3>Contact Us!</h3>
          <h3>Email: cinemasuggestinfo@gmail.com</h3>
        </div>
        <div className="social">
           <a href="#"> <AiFillFacebook className="social-icon"/></a>
           <a href="#"> <FaTiktok className="social-icon"/></a>
           <a href="#"> <BsInstagram className="social-icon"/></a>
        </div>
        <div className="sitemap">
            <h3>Sitemap</h3>
            <a href="/">Home</a>
            <a href="/movietest">The Movie Test</a>
            <a href="/blog">Blog</a>
            <a href="/quiz">Weekly Quiz</a>
        </div>
      </div>
      <h4>&copy; 2023 CinemaSuggest. All rights Reserved.</h4>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  width: 100%;
    
  display:flex;
  flex-direction: column;
  .info{
    margin-top:1rem;
    display:flex;
    justify-content: space-around;
  }
  .social-icon{
    font-size:32px;
    color:white;
    margin-left:1rem;
  }
  .sitemap{
    display:flex;
    flex-direction: column;
    color:white;
  }
  .sitemap a{
    color:white;
    font-size:16px;
  }
  h3{
    font-size:24px;
    color:white;
  }
  .social{
    display:flex;
    justify-content: space-around;
  }
  h4{
    color:white;
  }
  @media (max-width:992px){
    .info{
        flex-direction: column;
       row-gap: 2rem;
    }
    .social{
        justify-content: flex-start;
    }
    h4{
        margin-top:1rem;
    }
  }
`;

export default Footer;
