import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import blogImg from "../assets/blogimg.png";
import blogImgFront from "../assets/blogimgfront.png";
import exampleBlogImg from "../assets/wallpaperflare-cropped.png";
import { Link } from "react-router-dom";
import movie1 from "../assets/blogpics/movie1.jpg";
import movie2 from "../assets/blogpics/movie2.jpg";
import movie3 from "../assets/blogpics/movie3.jpg";
import movie4 from "../assets/blogpics/movie4.jpg";
import movie5 from "../assets/blogpics/movie5.jpg";
import movie6 from "../assets/blogpics/movie6.jpg";
import movie7 from "../assets/blogpics/movie7.jpg";

const localBlogUrl = "http://localhost:3000/api/v1/blog";
const prodUrl = "https://cinemasuggest.com/api/v1/blog";
const pics = [movie1, movie2, movie3, movie4, movie5, movie6, movie7];

const BlogPage = () => {
  const [blogContent, setBlogContent] = useState([]);

  useEffect(() => {
    const handlePosts = async () => {
      const response = await fetch(`${prodUrl}/published`, {
        method: "GET",
        json: true,
      });

      const blogData = await response.json();
      setBlogContent(blogData.data);
      console.log(blogData);
    };
    handlePosts();
  }, []);

  return (
    <>
      <Navbar />
      <BlogPageContainer>
        <div className="blog-img-container">
          <img src={blogImg} alt="our blog image" />
          <img src={blogImgFront} alt="blog image front" />
          <h2 className="white">Welcome To The CinemaSuggest Blog</h2>
        </div>

        <div className="blog-articles">
          {blogContent ? (
            blogContent.map((item, index) => {
              return (
                <div key={index} className="blog-article">
                  <img src={pics[index]} alt="blog showing " />
                  <div className="blog-info">
                    <h3>{item.title}</h3>
                    <p>{item.paragraphs[0].slice(0, 120)}...</p>
                    <Link
                      to={`/blog/${index}`}
                      state={item}
                      className="button-article"
                    >
                      Continue Reading...
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <h3>blog content is loading...</h3>
          )}
        </div>
      </BlogPageContainer>
      <Footer />
    </>
  );
};

const BlogPageContainer = styled.div`
  .white {
    font-size: 5rem;
    color: white;
  }
  .blog-img-container {
    width: 70%;
    position: relative;
    z-index: 1;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  .blog-img-container img {
    position: absolute;
    width: 100%;
  }

  .blog-img-container h2 {
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 24px;
  }

  .blog-articles {
    width: 85%;

    margin: 1rem auto;
    margin-top: 540px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    row-gap: 1rem;
  }
  .blog-article {
    background-color: black;
    border: 2px solid gray;
    height: 40vh;
    padding: 0;
    display: flex;
  }
  .blog-article img {
    height: 100%;
    width: 45%;
  }
  .blog-info {
    padding: 8px;
    display: flex;
    flex-direction: column;

    justify-content: space-evenly;
  }
  .blog-info h3,
  .blog-info p {
    color: white;
  }
  .blog-info .button-article {
    background: #b70304;
    color: white;
    font-size: 20px;
    width: 300px;
    padding: 5px;
    cursor: pointer;
  }
  .button-article:hover {
    background-color: #ed8554;
  }

  @media (max-width: 992px) {
    .blog-img-container {
      width: 90%;
    }

    .blog-articles {
      width: 95%;
      grid-template-columns: 1fr;
      margin-top: 350px;
    }
  }
`;

export default BlogPage;
