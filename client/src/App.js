import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Results from "./pages/Results";



function App() {
  return <>
  <Router>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/movietest" element={<Test/>} />
    <Route path="/results" element={<Results/>} />
    </Routes>
  </Router>
  </>;
}

export default App;
