import styled from "styled-components";

export const Button = styled.button`
    border-radius: 50px;
    background: ${({primary}) => (primary ? '#01BF71' : '#010606')};
    white-space: nowrap;
    padding: ${({ big }) => ( big ? ' 14px 48px ' : ' 12px 30px ' )};
    color: ${({dark}) => ( dark ? ' #010606 ' : ' #fff ' )};
    font-size: ${({ fontBig }) => ( fontBig ? '20px' : '16px' )};
    margin-left: ${({ marg }) => ( marg ? '2rem' : '0' )};
    margin-top: ${({ marg2 }) => ( marg2 ? '1rem' : '0' )};
    outline : none;
    border : none;
    cursor : pointer;
    justify-content : center;
    align-items : center;
    transition : all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: ${({ primary }) => ( primary ? '#fff' : '#01BF71' )};
    };
`;