import React from "react";
import "./App.css";
import GoogleFontLoader from "react-google-font";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <GoogleFontLoader
        fonts={[
          {
            font: "Roboto",
            weights: [400, "400i"],
          },
          {
            font: "Roboto Mono",
            weights: [400, 700],
          },
          {
            font: "Merriweather",
            weights: [400, 700],
          },
        ]}
      />
      <BrowserRouter>
        <Header />
        <div id="App" className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
