import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="nav">
      <NavLink exact to="/projects">Projects</NavLink>
      <NavLink exact to="/tasks">Tasks</NavLink>
      <NavLink exact to="/users">Users</NavLink>
    </nav>
  );
}

export default Nav;
