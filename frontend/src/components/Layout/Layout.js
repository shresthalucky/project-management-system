import React from 'react';
import { connect } from 'react-redux';
import { Container, Navbar, Nav, NavDropdown, Alert } from 'react-bootstrap';

import AppNav from '../AppNav';
import { logoutAuth } from '../../actions/authActions';
import { unsetAlert } from '../../actions/alertActions';

function Layout({ children, auth, ...props }) {

  const handleLogout = () => {
    localStorage.removeItem('auth');
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

      <Alert
        variant={props.alert.type === 'ERROR' ? 'danger' : 'success'}
        show={Boolean(props.alert.message)}
        onClose={props.unsetAlert}
        transition={false}
        dismissible>
        {props.alert.message}
      </Alert>

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
    auth: state.auth,
    alert: state.alert
  };
}

const mapDispatchToProps = dispatch => {
  return {
    logoutAuth: () => dispatch(logoutAuth()),
    unsetAlert: () => dispatch(unsetAlert())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
