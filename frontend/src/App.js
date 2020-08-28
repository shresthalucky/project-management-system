import React from 'react';
import { connect } from 'react-redux';

import Routes from './routes';
import { setAuth } from './actions/authActions';

class App extends React.Component {

  componentDidMount() {
    const user = localStorage.getItem('auth');
    
    if(user) {
      this.props.setAuth(JSON.parse(user));
    }
  }

  render() {
    return (
      <Routes />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAuth: (user) => dispatch(setAuth(user))
  };
};

export default connect(null, mapDispatchToProps)(App);
