import React from 'react';
import Contact from './Pages/Contact';
import Footer from './Components/Footer';
import HeroSection from './Pages/Heronsection';
import About from './Pages/About';
import SkillsData from './Pages/skillsData';
import Education from './Pages/Education';

const App = () => {
  return (
    <div
    style={{ background: "#060c18" }} 
    >
      <HeroSection></HeroSection>
      <About></About>
      {/* <SkillsData></SkillsData> */}
      <Education></Education>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  );
};

export default App;