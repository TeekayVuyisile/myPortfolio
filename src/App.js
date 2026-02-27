import React from "react";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import References from "./components/References";
import Contact from "./components/Contact";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <Hero />
        <About />
        <Experience />

        <Projects />
        <References />
        <Skills />
        <Education />

        <Contact />
      </div>
    </ThemeProvider>
  );
}

export default App;
