import { MdDateRange } from "react-icons/md"
import {RxAvatar} from "react-icons/rx"
import styled from "styled-components";
import {   useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const localBlogUrl = "http://localhost:5000/api/v1/blog";
const prodUrl = "https://cinemasuggest.com/api/v1/blog"

const BlogArticle = (props) => {
  let { id } = useParams();
  const [blogContent, setBlogContent] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const handlePosts = async () => {
      const response = await fetch(`${prodUrl}/published`, {
        method: "GET",
        json: true,
      });

      const blogData = await response.json();
      setBlogContent(blogData.data[id]);
      setLoading(false);
      
    };
    handlePosts();
    
    
  }, []);

  if (!loading && blogContent.paragraphs) {
    
    return (
      <>
        <Navbar />
        <MainBlogContainer>
          <h1>{blogContent.title}</h1>
          <div className="info">
            <p className="author"> <RxAvatar className="icon"/>  {blogContent.author}</p>
            <p className="date"><MdDateRange className="icon"/>  {blogContent.date.slice(0,10)}</p>
          </div>

          {blogContent.paragraphs.map((item, index) => {
            return <p key={index}>{item}</p>;
          })}
        </MainBlogContainer>
        <Footer/>
      </>
    );
  } else {
    return (
      <>
        <Navbar/>
        <Loading />
        <Footer/>
      </>
    );
  }
};

const MainBlogContainer = styled.div`
  margin: 2rem auto;
  width: 70%;

  h1 {
    text-align: center;
    color: white;
  }
  p {
    color: white;
  }
  .info{
    display:flex;
    width:100%;
    justify-content: space-between;
  }
  .info p{
    background: #b70304; 
    padding: 4px 8px;
    margin-top:1rem;
    display:flex;
    align-items: center;
  }
  .icon{
    font-size:20px;
    text-align: center;
  }
`;

export default BlogArticle;
