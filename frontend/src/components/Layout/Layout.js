import React from 'react';
import { connect } from 'react-redux';
import { Container, Button } from 'react-bootstrap';

import Nav from '../Nav';
import { logoutAuth } from '../../actions/authActions';

function Layout({ children, ...props }) {

  const handleLogout = () => {
    localStorage.removeItem('user');
    props.logoutAuth();
  }

  return (
    <Container>
      <Nav logoutHandler={handleLogout} />
      <main className="mt-5">
        {children}
      </main>
    </Container>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    logoutAuth: () => dispatch(logoutAuth()),
  };
};

export default connect(null, mapDispatchToProps)(Layout);
