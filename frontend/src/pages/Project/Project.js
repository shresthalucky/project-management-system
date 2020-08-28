import React from 'react';
import { connect } from 'react-redux';
import { Form, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Api from '../../api/ApiUtils';
import AppModal from '../../components/AppModal';
import { setProjectsList } from '../../actions/projectActions';
import { setUsers } from '../../actions/userActions';
import { roles } from '../../roles';

class Project extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      projects: [],
      loadingProjects: true,
      showModal: false,
      newProject: {
        name: '',
        description: '',
        projectManagerId: ''
      }
    }
  }

  componentDidMount() {
    const users = this.props.users;
    const projects = this.props.projectsList;

    if (projects) {
      this.setState({
        projects: projects,
        loadingProjects: false
      });
    }

    if (users) {
      this.setState({
        users: users,
        loading: false
      });
    }

    this.fetchProjects();
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

  fetchProjects = () => {
    Api.get('/projects')
      .then(res => {
        this.setState({
          projects: res.data,
          loadingProjects: false
        });
        this.props.setProjectsList(res.data);
      })
      .catch(err => console.log(err));

    this.fetchUsers();
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  handleNewProjectSubmit = () => {

    const data = {
      ...this.state.newProject,
      projectManagerId: Number(this.state.newProject.projectManagerId)
    }

    console.log(data);

    Api.post('/projects', data)
      .then(() => {
        this.fetchProjects();
        this.toggleModal();
      })
      .catch(err => console.log(err));
  }

  handleInputChange = (e) => {
    this.setState({
      newProject: {
        ...this.state.newProject,
        [e.target.name]: e.target.value
      }
    });
  }

  render() {

    const projects = this.props.projectsList;
    const pm = this.state.users.filter(user => user['role_id'] === roles.PROJECT_MANAGER && user['active']);
    
    return (
      <div>

        <AppModal show={this.state.showModal} hideHandler={this.toggleModal} submitHandler={this.handleNewProjectSubmit} title="Create New Project">
          <Form>
            <Form.Group>
              <Form.Label>Project Name</Form.Label>
              <Form.Control type="text" name="name" onChange={this.handleInputChange} />
              <Form.Text className="text-muted">Must be unique</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" onChange={this.handleInputChange} />
            </Form.Group>

            <Form.Group controlId="formGridState">
              <Form.Label>Project Manager</Form.Label>
              <Form.Control as="select" defaultValue="0" onChange={this.handleInputChange} name="projectManagerId">
                {pm.map((user) => <option value={user.id} key={user.id}>{user.username}</option>)}
              </Form.Control>
            </Form.Group>

          </Form>
        </AppModal>

        <Button onClick={this.toggleModal}>New Project</Button>

        {projects.map(project => {
          return (
            <Card body key={project.id} className="mt-5 mb-5">
              <h3>
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
              </h3>
            </Card>
          );
        })}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    projectsList: state.project.projectsList,
    users: state.project.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUsers: (users) => dispatch(setUsers(users)),
    setProjectsList: (projects) => dispatch(setProjectsList(projects))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
