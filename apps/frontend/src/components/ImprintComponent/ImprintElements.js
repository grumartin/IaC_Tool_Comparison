import styled from "styled-components";

export const Subtitle = styled.p`
    font-size: 18px;
    line-height: 23px;
    color: #010606;
`;

export const Heading = styled.div`
    margin-bottom: 24px;
    font-size: 35px;
    line-height: 1.1;
    font-weight: 600;
    color: #010606;

    @media screen and (max-width: 480px){
        font-size: 32px;
    }
`;

export const TextWrapper = styled.div`
    margin-left: 2rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
`;

export const Col = styled.div`
    margin-bottom: 1rem;
`;