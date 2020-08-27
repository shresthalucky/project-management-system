import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import User from './pages/User';
import Login from './pages/Login';
import Project from './pages/Project';
import Layout from './components/Layout';

function Routes(props) {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route
          exact
          path='/login'
          render={renderProps => <Login {...renderProps} />} />

        <AuthRoute path='/' user={props.user}>
          <Layout>
            <Route path="/projects" component={Project} />
            <Route path="/users" component={User} />
          </Layout>
        </AuthRoute>

      </Switch>
    </Router>
  );
}

function AuthRoute({ user, children, ...props }) {
  return (
    <Route {...props} render={({ location }) => (
      user.token ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
    )} />
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Routes);