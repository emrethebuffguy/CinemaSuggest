import { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";

const devUrl = "https://cinemasuggest.com/api/v1/admin/login";
const devBlogUrl = "https://cinemasuggest.com/api/v1/blog";

const localUrl = "http://localhost:5000/api/v1/admin/login";
const localBlogUrl = "http://localhost:5000/api/v1/blog";

const Admin = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstRender, setFirstRender] = useState(false);
  const [blogPosts,setBlogPosts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    const response = await fetch(devUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      json: true,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    setUser(data.token);
  };

  
  useEffect(() => {
    if (!firstRender) {
      setFirstRender(true);
    } else {
      const handlePosts = async () => {
        console.log(user);
        const blogresponse = await fetch(devBlogUrl, {
          method: "GET",
          json: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
          },
        });
        const blogData = await blogresponse.json();
        setBlogPosts(blogData.data);
        console.log(blogData.data);
      };
      handlePosts();
    }
  }, [user]);

  if (user) {
    return (
      <>
        <Navbar />
        <Dashboard blogPosts={blogPosts} setBlogPosts={setBlogPosts} user= {user}/>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <LoginContainer>
          <form>
            <h2>Login</h2>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="email"
              type="text"
              name="email"
              id="email"
            />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="password"
              type="password"
              name="password"
              id="password"
            />
            <button onClick={handleSubmit} className="submit-btn">
              Login
            </button>
          </form>
        </LoginContainer>
      </>
    );
  }
};

const LoginContainer = styled.div`
  margin: 3rem auto;
  width: 300px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.9);

  h2 {
    text-align: center;
    color: #b70304;
  }
  form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 0.5rem;
    column-gap: 0.5rem;
    margin-top: 1rem;
    padding: 5px;
  }

  input {
    font-size: 24px;
  }

  button {
    padding: 3px 30px;
    font-size: 24px;
  }
`;

export default Admin;
