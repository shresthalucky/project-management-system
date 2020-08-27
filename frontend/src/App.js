import React from 'react';
import { connect } from 'react-redux';

import Routes from './routes';
import { setUser } from './actions/userActions';

class App extends React.Component {

  componentDidMount() {
    const user = localStorage.getItem('user');
    
    if(user) {
      this.props.setUser(JSON.parse(user));
    }
  }

  render() {
    return (
      <Routes />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => dispatch(setUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
