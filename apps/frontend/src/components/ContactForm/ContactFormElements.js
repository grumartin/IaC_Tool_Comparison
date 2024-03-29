import styled from "styled-components";

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

export const FormContainer = styled.form`
    width:380px;
    height:500px;
    background:#e6e6e6;
    border-radius:8px;
    box-shadow:0 0 40px -10px #000;
    margin:calc(50vh - 260px) auto;
    padding:20px 30px;
    max-width:calc(100vw - 40px);
    box-sizing:border-box;
    font-family:'Montserrat',sans-serif;
    position:relative
`;

export const Input = styled.input`
    width:100%;
    padding:10px;
    box-sizing:border-box;
    background:none;
    outline:none;
    resize:none;border:0;
    font-family:'Montserrat',sans-serif;
    transition:all .3s;
    border-bottom:2px solid #bebed2;

    :focus{
        border-bottom:2px solid #78788c;
    }
`;

export const Textarea = styled.textarea`
    width:100%;
    padding:10px;
    box-sizing:border-box;
    background:none;
    outline:none;
    resize:none;
    border:0;
    font-family:'Montserrat',sans-serif;
    transition:all .3s;
    border-bottom:2px solid #bebed2;

    :focus{
        border-bottom:2px solid #78788c;
    }
`;

export const Par = styled.p`
    :before{
        content:attr(type);
        display:block;margin:28px 0 0;
        font-size:14px;color:#5a5a5a;
    }
`;

export const InfoField = styled.div`
    position:absolute;
    bottom:-15px;
    right:-20px;
    background:#50505a;
    color:#fff;
    width:350px;
    padding:16px 4px 16px 0;
    border-radius:6px;
    font-size:13px;
    box-shadow:10px 10px 40px -14px #000;
`;

export const InfoData = styled.span`
    margin:0 5px 0 15px
`;


export const Button = styled.button`
    border-radius: 50px;
    background: ${({primary}) => (primary ? '#01BF71' : '#010606')};
    white-space: nowrap;
    padding: ${({ big }) => ( big ? ' 14px 48px ' : ' 12px 30px ' )};
    color: ${({dark}) => ( dark ? ' #010606 ' : ' #fff ' )};
    font-size: ${({ fontBig }) => ( fontBig ? '20px' : '16px' )};
    margin: ${({ marg }) => ( marg ? '0.7rem 2rem' : '0' )};
    margin-top: ${({ marg2 }) => ( marg2 ? '2rem' : '')};
    margin-left: ${({ marg3 }) => ( marg3 ? '10rem' : '')};
    outline : none;
    border : none;
    cursor : pointer;
    display : flex;
    justify-content : center;
    align-items : center;
    transition : all 0.2s ease-in-out;

    @media screen and (max-width: 400px){
        margin-left: 7rem;
    }

    @media screen and (max-width: 360px){
        margin-left: 4rem;
    }

    &:hover {
        transition: all 0.2s ease-in-out;
        background: ${({ primary }) => ( primary ? '#fff' : '#01BF71' )};
    };
`;

export const Message = styled.div`
    margin-top: 0.5rem;
    color: ${({color}) => ( color ? ' #01BF71 ' : ' #8a0104 ' )};
`;

export const ErrorMsg = styled.p`
    margin: 0;
    padding: 0;
    color: #8a0104;
    font-size: 0.7rem;
`;