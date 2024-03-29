import styled from "styled-components";
import Popup from 'reactjs-popup';

export const Container = styled.div`
    margin: 0 auto;
    padding: 50px 0 0;
    max-width: 960px;
    width: 100%;
    margin-bottom: 5rem;
`;

export const PTable = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 15px 25px;
    position: relative;
    width: 100%;
    z-index: 10;
    box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.08), 0px 20px 31px 3px rgba(0, 0, 0, 0.09), 0px 8px 20px 7px rgba(0, 0, 0, 0.02);
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 900px) {
        flex-direction: row;
    }

    * {
        text-align: center;
        text-transform: uppercase;
    }
`;

export const PPlan = styled.div`
    border-bottom: 1px solid #e1f1ff;
    padding: 25px;

    :last-child {
        border-bottom: none;
    }

    @media screen and (min-width: 900px) {
        border-bottom: none;
        border-right: 1px solid #e1f1ff;
        flex-basis: 100%;
        padding: 25px 50px;
      
        :last-child {
          border-right: none;
        }
    }
      
`;

export const StyledPopup = styled(Popup)`
  &-content {
    border-radius: 10px !important;
    border: 3px solid #000;
    width: 50%;
    text-align: center;
  }
`;

export const Img = styled.img`
    margin-bottom: 25px;
    max-width: 60%;
`;

export const Pad = styled.div`
    height: 1.2rem;
`;

export const Header = styled.h2`
    color: #888;
    font-weight: 600;
    letter-spacing: 1px;
`;

export const Features = styled.ul`
    color: #000;
    font-weight: 600;
    letter-spacing: 1px;
    margin: 50px 0 25px;
    list-style: none;
`;

export const FeaturesItem = styled.li`
    border-top: 1px solid #000;
    font-size: 12px;
    line-height: 1.5;
    padding: 15px 0;
    

    :last-child {
        border-bottom: 1px solid #000;
    }
`;

export const Price = styled.span`
    color: #000;
    display: block;
    font-size: 32px;
    font-weight: 700;
`;