import React from 'react'
import { Subtitle, Heading, TextWrapper, Col } from './ImprintElements'

const ImprintComponent = () => {
  return (
    <>
      <TextWrapper>
        <Heading>Imprint</Heading>

        <Col>
          <Subtitle>Informationspflicht laut §5 E-Commerce Gesetz, §14 Unternehmensgesetzbuch, 
          §63 Gewerbeordnung und Offenlegungspflicht laut §25 Mediengesetz.</Subtitle>
        </Col>

        <Col>
          <Subtitle>Kajak Center</Subtitle>
          <Subtitle>Christian Pötzelsberger</Subtitle>
          <Subtitle>Seespitzstraße 24</Subtitle>
          <Subtitle>Zell am See</Subtitle>
          <Subtitle>Österreich</Subtitle>
        </Col>
        
        <Col>
          <Subtitle>Unternehmensgegenstand: Sportgeräteverleih</Subtitle>
          <Subtitle>UID-Nummer: ATU12345678</Subtitle>
          <Subtitle>GLN: 1234567891234</Subtitle>
          <Subtitle>GISA: 12345678</Subtitle>
        </Col>
        
        <Col>
          <Subtitle>Tel.: 01234/56789</Subtitle>
          <Subtitle>E-Mail: office@musterfirma.com</Subtitle>
        </Col>

        <Col>
          <Subtitle>Bildernachweis</Subtitle>
          <Subtitle>Die Bilder, Fotos und Grafiken auf dieser Webseite sind urheberrechtlich geschützt. 
            Die Bilderrechte liegen bei den folgenden Fotografen und Unternehmen: graf Mustermann
            Alle Texte sind urheberrechtlich geschützt.</Subtitle>
        </Col>
        
        
        
      </TextWrapper>
    </>
  )
}

export default ImprintComponent






