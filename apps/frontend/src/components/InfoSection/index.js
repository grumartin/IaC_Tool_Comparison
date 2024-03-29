import React from 'react';
import { Button } from '../ButtonElement';
import { ImgWrap, InfoContainer, InfoWrapper, InfoRow, Column1, Column2, TextWrapper, TopLine, Heading, Subtitle, BtnWrap, Img, Map } from './InfoElements';
import { useNavigate } from 'react-router';
//import { useMemo } from 'react';
//import { GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';

const InfoSection = ({lightBg, id, imgStart, topLine, lightText, headLine, darkText, description, img, alt, buttonLabel, dark, dark2, primary, map, destination}) => {
    let navigate = useNavigate();
    if(map === true){
        return (
            <>
                <InfoContainer lightBg={lightBg} id={id}>
                    <InfoWrapper>
                        <InfoRow imgStart={imgStart}>
                            <Column1>
                                <TextWrapper>
                                    <TopLine>{topLine}</TopLine>
                                    <Heading lightText={lightText}>{headLine}</Heading>
                                    <Subtitle darkText={darkText}>{description}</Subtitle>
                                    <BtnWrap>
                                        <Button
                                        onClick={() => {
                                            navigate(destination);
                                        }}
                                        smooth={true}
                                        duration={500}
                                        spy={true}
                                        exact="true"
                                        offset={-80}
                                        primary={primary ? 1 : 0}
                                        dark={dark ? 1 : 0}
                                        dark2={dark2 ? 1 : 0}
                                        >{buttonLabel}</Button>
                                    </BtnWrap>
                                </TextWrapper>
                            </Column1>
                            <Column2>
                                <ImgWrap>
                                    <Map src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21635.489456234736!2d12.784648573021103!3d47.32535221667378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47771d22d9105ac7%3A0x3fdcc8e8e8e5b492!2sKajakcenter%20Zell%20am%20See!5e0!3m2!1sde!2sat!4v1653995381790!5m2!1sde!2sat"
                                        loading="lazy"></Map>
                                </ImgWrap>
                            </Column2>
                        </InfoRow>
                    </InfoWrapper>
                </InfoContainer>
            </>
          );
    }

    return (
    <>
        <InfoContainer lightBg={lightBg} id={id}>
            <InfoWrapper>
                <InfoRow imgStart={imgStart}>
                    <Column1>
                        <TextWrapper>
                            <TopLine>{topLine}</TopLine>
                            <Heading lightText={lightText}>{headLine}</Heading>
                            <Subtitle darkText={darkText}>{description}</Subtitle>
                            <BtnWrap>
                                <Button 
                                onClick={() => {
                                    navigate(destination);
                                }}
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact="true"
                                offset={-80}
                                primary={primary ? 1 : 0}
                                dark={dark ? 1 : 0}
                                dark2={dark2 ? 1 : 0}
                                >{buttonLabel}</Button>
                            </BtnWrap>
                        </TextWrapper>
                    </Column1>
                    <Column2>
                        <ImgWrap>
                            <Img src={img} alt={alt}/>
                        </ImgWrap>
                    </Column2>
                </InfoRow>
            </InfoWrapper>
        </InfoContainer>
    </>
  );
};

/*
const RenderMap = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBBPqrCo6nAITVD9-TWGbAIkK-kijJZIE0"
    });

    if(!isLoaded){
        return (
            <div>Loading...</div>
        );
    }

    return(
        <Map/>
    );
}

const Map = () => {
    const center = useMemo(() => ({lat: 44, lng: -80}), []);

    return (
        <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
            <Marker position={center}/>
        </GoogleMap>
    )
}*/

export default InfoSection;
