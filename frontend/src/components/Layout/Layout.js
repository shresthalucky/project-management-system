import React from 'react';
import { connect } from 'react-redux';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

import AppNav from '../AppNav';
import { logoutAuth } from '../../actions/authActions';

function Layout({ children, auth, ...props }) {

  const handleLogout = () => {
    localStorage.removeItem('user');
    props.logoutAuth();
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">PMS</Navbar.Brand>
          <AppNav auth={auth} />
          <Nav>
            <NavDropdown alignRight title={auth.username} id="nav-dropdown">
              <NavDropdown.Header>
                {auth.role.type}
              </NavDropdown.Header>
              <NavDropdown.Divider />
              <NavDropdown.Item>Settings</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>

      <main className="mt-5">
        <Container>
          {children}
        </Container>
      </main>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
}

const mapDispatchToProps = dispatch => {
  return {
    logoutAuth: () => dispatch(logoutAuth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
