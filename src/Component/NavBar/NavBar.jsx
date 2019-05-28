// Modules
import React from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from 'reactstrap';
import client from '../../request/client';

const NavBar = ({ location }) => (
  <div className={location.pathname === '/' ? "NavBarHomePage" : "NavBar"}>
  <Navbar light expand="md">
    <NavItem>
      <NavLink to="/" >Plage DashBoard</NavLink>
    </NavItem>
    <Nav className="ml-auto" navbar>
      {!client.me ? 
        <div>
      <NavItem>
        <NavLink to="/login" >Login</NavLink>
      </NavItem>
      </div>
      :
      <div>
        <NavItem>
          <NavLink to="/logout" >Log out</NavLink>
        </NavItem>
      </div>
      }  
    </Nav>
  </Navbar>
</div>
);
export default NavBar;