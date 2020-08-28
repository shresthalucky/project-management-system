import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, Button } from 'react-bootstrap';

import { roles } from '../../roles';

function AppNav({ handleLogout }) {

  const user = JSON.parse(localStorage.getItem('auth'));

  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
        <Nav.Item>
          <NavLink exact to="/projects" className="navlink">Projects</NavLink>
        </Nav.Item>
        {user.roleId === roles.ADMIN &&
          <Nav.Item>
            <NavLink exact to="/users" className="navlink">Users</NavLink>
          </Nav.Item>
        }
        <Nav>
          <Button onClick={handleLogout}>Logout</Button>
        </Nav>
      </Nav>
    </Navbar >
  );
}

export default AppNav;
