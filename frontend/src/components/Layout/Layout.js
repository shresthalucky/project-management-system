import React from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav';
import { logoutUser } from '../../actions/userActions';

function Layout({ children, ...props }) {

  const handleLogout = () => {
    localStorage.removeItem('user');
    props.logoutUser();
  }

  return (
    <div>
      <Nav />
      <button onClick={handleLogout}>Logout</button>
      <main>
        {children}
      </main>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(null, mapDispatchToProps)(Layout);
