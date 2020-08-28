import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import User from './pages/User';
import Login from './pages/Login';
import Project from './pages/Project';
import Layout from './components/Layout';
import TaskDetail from './pages/TaskDetail';
import ProjectDetail from './pages/ProjectDetail';

function Routes(props) {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route
          exact
          path='/login'
          render={renderProps => <Login {...renderProps} />} />

        <AuthRoute path='/' auth={props.auth}>
          <Layout>
            <Route exact path="/projects" component={Project} />
            <Route exact path="/users" component={User} />
            <Route exact path="/projects/:projectId" component={ProjectDetail} />
            <Route exact path="/projects/:projectId/tasks/:taskId" component={TaskDetail} />
          </Layout>
        </AuthRoute>

      </Switch>
    </Router>
  );
}

function AuthRoute({ auth, children, ...props }) {
  return (
    <Route {...props} render={({ location }) => (
      auth.token ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
    )} />
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Routes);