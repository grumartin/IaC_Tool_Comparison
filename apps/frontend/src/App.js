import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages';
import Contact from './pages/Contact';
import Imprint from './pages/Imprint';
import Pricing from './pages/Pricing';
import CookieConsent from "react-cookie-consent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact/>
        <Route path="/contact" element={<Contact/>} />
        <Route path="/imprint" element={<Imprint/>} />
        <Route path="/pricing" element={<Pricing/>} />
      </Routes>
      <CookieConsent 
      style={{background: '#000', textAlign: 'left'}}
      buttonStyle={{color: '#000', background: '#01BF71', borderRadius: '10px'}}
      expires={30}
      >This website uses cookies to enhance the user experience.
        See our <a style={{color: "#01BF71"}} href="/policy">privacy policy</a> for more!
      </CookieConsent>
    </BrowserRouter>
  );
}

export default App;
