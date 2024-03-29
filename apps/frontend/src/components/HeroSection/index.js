import React from 'react';
//import Video from '../../video/video.mp4'
import { HeroContainer, HeroBg, Img, HeroH1, HeroContent, HeroP, Img1 } from './HeroElements';

const HeroSection = () => {
  return (
      <>
      <HeroContainer>
          <HeroBg>
              <Img src={require("../../images/1920x1080-5141-waves-dark-water-ripples-4k.jpg")}
                alt="waves"/>
          </HeroBg>
          <HeroContent>
              <HeroH1>Kajak Center</HeroH1>
              <HeroP>Ready for a new Adventure?</HeroP>
          </HeroContent>
          <Img1 src={require("../../images/kayak.webp")} alt="kajak"/>
      </HeroContainer>
      </>
  );
};

export default HeroSection;

//autoPlay loop muted 
//src={Video} type="video/mp4"
