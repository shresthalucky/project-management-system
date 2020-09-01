import React from 'react';
import { connect } from 'react-redux';

import Api from '../api/ApiUtils';
import { setUsers } from '../actions/userActions';

function withUsers(Component) {

  class UsersComponent extends React.Component {

    componentDidMount() {
      Api.get('/users')
        .then(res => {

          const users = res.data.reduce((obj, user) => {
            return { ...obj, [user.id]: user }
          }, {});

          this.props.setUsers(users);
          // this.setState({
          //   users: res.data,
          //   loading: false
          // });
        })
        .catch(err => console.log(err));
    }

    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

  const mapStateToProps = state => {
    return {
      user: state.user,
      auth: state.auth
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      setUsers: (users) => dispatch(setUsers(users))
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(UsersComponent);

}

export default withUsers;