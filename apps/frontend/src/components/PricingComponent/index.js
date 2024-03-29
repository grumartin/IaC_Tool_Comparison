import React, { useEffect, useState } from "react";
import { Subtitle } from "../ImprintComponent/ImprintElements";
import {
  Price,
  Container,
  PPlan,
  PTable,
  Img,
  Features,
  FeaturesItem,
  Header,
  Pad,
  StyledPopup,
} from "./PComponentElements";
import { Button } from "../ButtonElement";
import "reactjs-popup/dist/index.css";
import { Heading } from "../ContactForm/ContactFormElements";

const PricingComponent = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRentals() {
      try {
        const response = await fetch(
          `${process.env.APPLICATION_LOAD_BALANCER}/rentals`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRentals(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    }
    fetchRentals();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(rentals);

  return (
    <>
      <Container>
        <PTable>
          {rentals.map((rental, index) => (
            <PPlan key={index}>
              <Pad />
              <Img
                src={
                  rental.name === "KAJAK"
                    ? require("../../images/kayak.webp")
                    : require("../../images/SUP.jpg")
                }
                alt=""
              />
              <Pad />
              <Header>{rental.name}</Header>
              <Features>
                <FeaturesItem>{rental.info_primary}</FeaturesItem>
                <FeaturesItem>{rental.info_secondary}</FeaturesItem>
              </Features>
              <Price>{rental.prices[0]}</Price>
              <Button
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                marg2="true"
                primary={0}
                dark={0}
                dark2={1}
              >
                Check Prices
              </Button>
            </PPlan>
          ))}
        </PTable>
      </Container>
    </>
  );
};

export default PricingComponent;
