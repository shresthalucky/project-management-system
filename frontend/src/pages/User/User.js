import React from 'react';
import { connect } from 'react-redux';

import Api from '../../api/ApiUtils';
import { roles } from '../../roles';
import { setMembers, addMember } from '../../actions/memberActions';

class User extends React.Component {

  componentDidMount() {
    if (this.props.member.users.length === 0) {
      Api.get('/users')
        .then(res => {
          this.props.setMembers(res.data);
        })
        .catch(err => console.log(err));
    }
  }

  handleNewUser = (e) => {
    e.preventDefault();

    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
      roleId: e.target.role.value
    }

    Api.post('/users/register', data)
      .then(res => {
        this.props.addMember(res.data)
      })
      .catch(err => console.log(err));
  }

  render() {

    return (
      <div>
        <div>User</div>

        {this.props.user.roleId === roles.ADMIN &&

          <form onSubmit={this.handleNewUser}>
            <div>
              <label>Username</label>
              <input type="text" name="username" />
            </div>
            <div>
              <label>Password</label>
              <input type="password" name="password" />
            </div>
            <div>
              <label>Role</label>
              <select name="role">
                <option value={roles.PROJECT_MANAGER}>Project Manager</option>
                <option value={roles.TEAM_LEAD}>Team Lead</option>
                <option value={roles.ENGINEER}>Engineer</option>
              </select>
            </div>
            <button type="submit">Add User</button>
          </form>
        }

        {this.props.member.users.map(user => {
          return (
            <div key={user.id}>
              <h3>{user.username}</h3>
              <p>{user.role.type}</p>
            </div>
          );
        })}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    member: state.member,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMembers: (members) => dispatch(setMembers(members)),
    addMember: (member) => dispatch(addMember(member))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
