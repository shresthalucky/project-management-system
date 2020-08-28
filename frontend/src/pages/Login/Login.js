import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Api from '../../api/ApiUtils';
import { setAuth } from '../../actions/authActions';

class Login extends React.Component {

  handleLogin = (e) => {
    e.preventDefault();

    Api.post('/users/login', {
      username: e.target.username.value,
      password: e.target.password.value
    })
      .then(res => {
        console.log(res.data)
        this.props.setAuth(res.data);
        localStorage.setItem('auth', JSON.stringify(res.data));
      })
      .catch(err => {

      });
  }


  render() {

    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (this.props.auth.token) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <div>
            <label>Username</label>
            <input name="username" type="text" />
          </div>
          <div>
            <label>Password</label>
            <input name="password" type="password" />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAuth: (user) => dispatch(setAuth(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
