import React, {useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Results from "./pages/Results";
import Admin from "./pages/Admin";
import BlogPage from "./pages/BlogPage";
import WeeklyQuiz from "./pages/WeeklyQuiz";
import BlogArticle from "./pages/BlogArticle";

function App() {
  useEffect(() => {
    document.title = 'Cinemasuggest - Find movies you like within munites!';
  }, []);
  return <>
  <Router>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/movietest" element={<Test/>} />
    <Route path="/results" element={<Results/>} />
    <Route path="/admin" element={<Admin/>} />
    <Route path="/blog" element={<BlogPage/>}/>
    <Route path="/quiz" element={<WeeklyQuiz/>}/>
    <Route path="/blog/:id" element={<BlogArticle/>}/>
    
    </Routes>
  </Router>
  </>;
}

export default App;
