import React from 'react'
import { HeaderBar,Heading } from './HeaderElements';
import { Button } from '../ButtonElement';
import { BtnWrap } from '../InfoSection/InfoElements';
import { useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();
  return (
    <>
        <HeaderBar>
        <BtnWrap>
            <Button 
                onClick={() => {
                    navigate("/");
                }}
                smooth={true}
                duration={500}
                spy={true}
                marg= "true"
                exact="true"
                primary={ 1 }
                dark={ 1 }
                dark2={ 0 }>Go Back</Button>
        </BtnWrap>
        <Heading>Kajak Center</Heading>
        </HeaderBar>
        
    </>
  )
}

export default Header