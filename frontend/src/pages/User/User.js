import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Table, Badge, Col, Card, Alert } from 'react-bootstrap';

import { roles } from '../../roles';
import Api from '../../api/ApiUtils';
import AppModal from '../../components/AppModal';
import { setUsers, addUser, disableUser } from '../../actions/userActions';
import { setErrorAlert, setSuccessAlert } from '../../actions/alertActions';
import { handleError } from '../../utils/errorHandler';
class User extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      loading: true,
      newUserError: '',
      editUser: {
        id: '',
        username: '',
        roleId: '',
        password: '',
        newPassword: '',
        errorMessage: ''
      },
      newUser: {
        username: '',
        password: '',
        roleId: roles.PROJECT_MANAGER
      }
    };
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  handleNewUserChange = (e) => {
    this.setState({
      newUser: {
        ...this.state.newUser,
        [e.target.name]: e.target.value
      }
    });
  }

  handleNewUserSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: this.state.newUser.username,
      password: this.state.newUser.password,
      roleId: Number(this.state.newUser.roleId)
    }

    Api.post('/users/register', data)
      .then(res => {
        this.props.addUser(res.data);
        this.setState({
          newUser: {
            username: '',
            password: '',
            roleId: roles.PROJECT_MANAGER
          }
        });
        this.props.setSuccessAlert('User create successful');
      })
      .catch(err => {
        handleError(err);
      });
  }

  handleEditUser = (user) => {
    this.setState({
      editUser: {
        ...this.state.editUser,
        id: user.id,
        username: user.username,
        roleId: user.role.id
      }
    })
    this.toggleModal();
  }

  handleEditChange = (e) => {
    this.setState({
      editUser: {
        ...this.state.editUser,
        [e.target.name]: e.target.value,
        errorMessage: ''
      }
    })
  }

  handleEditUserSubmit = () => {
    const data = {
      username: this.state.editUser.username,
      password: this.state.editUser.password,
      roleId: Number(this.state.editUser.roleId)
    }

    Api.put(`/users/${this.state.editUser.id}`, data)
      .then(res => {
        this.props.addUser(res.data);
        this.toggleModal();
        this.props.setSuccessAlert('User edit successful');
      })
      .catch(err => {
        this.setState({
          editUser: {
            ...this.state.editUser,
            errorMessage: err.response.data.message
          }
        })
      });
  }

  handleDeleteUser = (userId) => {

    Api.delete(`/users/${userId}`)
      .then(() => {
        this.props.disableUser(userId);
        this.props.setSuccessAlert('User delete successful');
      })
      .catch(err => {
        this.props.setErrorAlert(err.response.data.message);
      });
  }

  render() {

    const users = this.props.users;

    return (
      <div>
        <AppModal show={this.state.showModal} hideHandler={this.toggleModal} submitHandler={this.handleEditUserSubmit} title="Edit User">
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={this.state.editUser.username} onChange={this.handleEditChange} />
              <Form.Text className="text-muted">Must be unique</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Current Password</Form.Label>
              <Form.Control type="password" name="password" value={this.state.editUser.password} onChange={this.handleEditChange} />
              <Form.Text className="text-muted">Required to apply changes</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" name="newPassword" value={this.state.editUser.newPassword} placeholder="optional" onChange={this.handleEditChange} />
            </Form.Group>

            {this.state.editUser.roleId !== roles.ADMIN &&
              <Form.Group>
                <Form.Label>Role</Form.Label>
                <Form.Control as="select" name="roleId" value={this.state.editUser.roleId} onChange={this.handleEditChange}>
                  <option value={roles.PROJECT_MANAGER}>Project Manager</option>
                  <option value={roles.TEAM_LEAD}>Team Lead</option>
                  <option value={roles.ENGINEER}>Engineer</option>
                </Form.Control>
              </Form.Group>
            }

            {this.state.editUser.errorMessage &&
              <Alert variant="danger">{this.state.editUser.errorMessage}</Alert>
            }
          </Form>
        </AppModal>

        <Card body className="mb-5">
          <Form onSubmit={this.handleNewUserSubmit}>
            <Form.Row>
              <Form.Group as={Col} lg={4}>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" value={this.state.newUser.username} onChange={this.handleNewUserChange} required />
                <Form.Text className="text-muted">Must be unique</Form.Text>
              </Form.Group>

              <Form.Group as={Col} lg={4}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={this.state.newUser.password} onChange={this.handleNewUserChange} required />
              </Form.Group>

              <Form.Group as={Col} lg={4}>
                <Form.Label>Role</Form.Label>
                <Form.Control as="select" name="role" value={this.state.newUser.roleId} onChange={this.handleNewUserChange}>
                  <option value={roles.PROJECT_MANAGER}>Project Manager</option>
                  <option value={roles.TEAM_LEAD}>Team Lead</option>
                  <option value={roles.ENGINEER}>Engineer</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            {this.state.newUser.errorMessage &&
              <Alert variant="danger">{this.state.newUser.errorMessage}</Alert>
            }
            <Button type="submit">Add New User</Button>
          </Form>
        </Card>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username} {user.active ? <Badge variant="success">Active</Badge> : <Badge variant="danger">Inactive</Badge>}</td>
                  <td>{user.role.type}</td>
                  <td>
                    <Button size="sm" variant="info" onClick={() => this.handleEditUser(user)} disabled={!user.active}>Edit</Button>{' '}
                    <Button size="sm" variant="danger" onClick={() => this.handleDeleteUser(user.id)} disabled={!user.active}>Delete</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    users: Object.values(state.users),
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUsers: (users) => dispatch(setUsers(users)),
    addUser: (user) => dispatch(addUser(user)),
    disableUser: (id) => dispatch(disableUser(id)),
    setErrorAlert: (message) => dispatch(setErrorAlert(message)),
    setSuccessAlert: (message) => dispatch(setSuccessAlert(message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
