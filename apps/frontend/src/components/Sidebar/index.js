import React from 'react';
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarLink, SidebarLink2, SidebarMenu } from './SidebarElements';

const Sidebar = ({ isOpen, toggle}) => {
  return (
      <SidebarContainer isOpen={isOpen} onClick={toggle}>
          <Icon onClick={toggle}>
              <CloseIcon/>
          </Icon>
          <SidebarWrapper>
              <SidebarMenu>
                  <SidebarLink to="about" onClick={toggle}>
                      About
                  </SidebarLink>
                  <SidebarLink to="discover" onClick={toggle}>
                      Discover
                  </SidebarLink>
                  <SidebarLink to="services" onClick={toggle}>
                      Services
                  </SidebarLink>
                  <SidebarLink to="location" onClick={toggle}>
                      Location
                  </SidebarLink>
                  <SidebarLink2 to="/contact" onClick={toggle}>
                      Contact Us
                  </SidebarLink2>
              </SidebarMenu>
          </SidebarWrapper>
      </SidebarContainer>
  );
};

export default Sidebar;
