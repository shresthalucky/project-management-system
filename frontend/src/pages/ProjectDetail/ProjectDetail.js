import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Api from '../../api/ApiUtils';
import { setProjectTasksList } from '../../actions/taskActions';
import { setProjectsDetail } from '../../actions/projectActions';

class ProjectDetail extends React.Component {

  constructor(props) {
    super(props);

    this.projectId = Number(props.match.params.projectId);

    this.state = {
      project: {},
      tasks: [],
      projectLoading: true,
      tasksLoading: true
    }
  }

  componentDidMount() {

    const project = this.props.projectsDetail[this.projectId];
    const tasks = this.props.projectTasksList[this.projectId];

    if (project) {
      this.setState({
        project: project,
        projectLoading: false
      });
    }

    if (tasks) {
      this.setState({
        tasks: tasks,
        tasksLoading: false
      });
    }

    Api.get(`/projects/${this.projectId}`)
      .then(res => {

        this.setState({
          project: res.data,
          projectLoading: false
        });

        this.props.setProjectsDetail(res.data);

        this.fetchTasks();
      })
      .catch(err => console.log(err));

  }

  fetchTasks = () => {
    Api.get(`/projects/${this.projectId}/tasks`)
      .then(res => {
        
        this.setState({
          tasks: res.data,
          tasksLoading: false
        });

        this.props.setProjectTasksList(this.projectId, res.data);
      })
      .catch(err => console.log(err));
  }

  render() {

    return (
      <div>
        <h1>{this.state.projectLoading ? 'loading' : this.state.project.name}</h1>

        {this.state.tasksLoading ? 'loading' : this.state.tasks.map(task => {
          return (
            <div key={task.id}>
              <h3><Link to={`/projects/${this.projectId}/tasks/${task.id}`}>{task.title}</Link></h3>
            </div>
          )
        })}
      
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    projectsDetail: state.project.projectsDetail,
    projectTasksList: state.task.projectTasksList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setProjectsDetail: (project) => dispatch(setProjectsDetail(project)),
    setProjectTasksList: (projectId, tasksList) => dispatch(setProjectTasksList(projectId, tasksList))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);