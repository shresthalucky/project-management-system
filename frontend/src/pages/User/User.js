import React from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';

import Api from '../../api/ApiUtils';
import { roles } from '../../roles';
import { setUsers } from '../../actions/userActions';
import AppModal from '../../components/AppModal';
class User extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      showModal: false,
      loading: true,
      editUserId: '',
      edit: {
        username: '',
        roleId: '',
        password: '',
        newPassword: ''
      }
    };

  }

  componentDidMount() {

    const users = this.props.user.users;

    if (users) {
      this.setState({
        users: users,
        loading: false
      });
    }

    this.fetchUsers();
  }

  fetchUsers = () => {
    Api.get('/users')
      .then(res => {
        this.props.setUsers(res.data);
        this.setState({
          users: res.data,
          loading: false
        });
      })
      .catch(err => console.log(err));
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
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
        this.fetchUsers();
      })
      .catch(err => console.log(err));
  }

  handleEditUser = (user) => {
    this.setState({
      editUserId: user.id,
      edit: {
        username: user.username,
        roleId: user['role_id']
      }
    })
    this.toggleModal();
  }

  handleOnEditChange = (e) => {
    this.setState({
      edit: {
        ...this.state.edit,
        [e.target.name]: e.target.value
      }
    })
  }

  submitEditUser = () => {
    const data = {
      ...this.state.edit,
      roleId: Number(this.state.edit.roleId)
    }
    
    Api.put(`/users/${this.state.editUserId}`, data)
      .then(res => {
        this.fetchUsers();
      })
      .catch(err => console.log(err));
  }

  handleDeleteUser = (userId) => {

    Api.delete(`/users/${userId}`)
      .then(() => {
        console.log('deleted');
        this.fetchUsers();
      })
      .catch(err => console.log(err));
  }

  render() {

    const users = this.state.users.filter(user => user.active === true);

    return (
      <div>
        <AppModal show={this.state.showModal} hideHandler={this.toggleModal} submitHandler={this.submitEditUser} title="Edit User">
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={this.state.edit.username} onChange={this.handleOnEditChange} />
              <Form.Text className="text-muted">Must be unique</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={this.state.edit.password} onChange={this.handleOnEditChange} />
            </Form.Group>

            <Form.Group controlId="formGridState">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" name="newPassword" value={this.state.edit.newpassword} onChange={this.handleOnEditChange} />
            </Form.Group>

            <Form.Group controlId="formGridState">
              <Form.Label>Role</Form.Label>
              <Form.Control as="select" name="roleId" defaultValue={this.state.edit.roleId} onChange={this.handleOnEditChange}>
                <option value={roles.PROJECT_MANAGER}>Project Manager</option>
                <option value={roles.TEAM_LEAD}>Team Lead</option>
                <option value={roles.ENGINEER}>Engineer</option>
              </Form.Control>
            </Form.Group>

          </Form>
        </AppModal>

        <div>User</div>

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

        {users.map(user => {
          return (
            <div key={user.id}>
              <h3>{user.username}</h3>
              <p>{user.role.type}</p>
              <Button variant="primary" onClick={() => this.handleEditUser(user)}>Edit</Button>
              <Button variant="secondary" onClick={() => this.handleDeleteUser(user.id)}>Delete</Button>
            </div>
          );
        })}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(User);
