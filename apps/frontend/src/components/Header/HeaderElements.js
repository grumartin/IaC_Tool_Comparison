import styled from "styled-components";

export const HeaderBar = styled.div`
    background-color: #101522;
    display: flex;
    height: 4rem;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 0;
`;

export const Heading = styled.h1`
    font-size: 25px;
    color: #fff;
    margin: 0;
    margin-right: 2rem;
    padding: 0;

    @media screen and (max-width: 480px){
        font-size: 20px;
    }
`;