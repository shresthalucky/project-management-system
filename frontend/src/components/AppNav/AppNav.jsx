import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import { roles } from '../../roles';

function AppNav({ auth, handleLogout }) {

  return (
    <Nav className="mr-auto">
      <Nav.Item>
        <NavLink exact to="/projects" className="nav-link">Projects</NavLink>
      </Nav.Item>
      {auth.role.id === roles.ADMIN &&
        <Nav.Item>
          <NavLink exact to="/users" className="nav-link">Users</NavLink>
        </Nav.Item>
      }
    </Nav>
  );
}

export default AppNav;
