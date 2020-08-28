import React from 'react';
import { connect } from 'react-redux';

import Api from '../../api/ApiUtils';
import { setTasksDetail } from '../../actions/taskActions';
import { setProjectsDetail } from '../../actions/projectActions';

class TaskDetail extends React.Component {

  constructor(props) {
    super(props);

    this.projectId = Number(props.match.params.projectId);
    this.taskId = Number(props.match.params.taskId);

    this.state = {
      project: {},
      task: {},
      projectLoading: true,
      taskLoading: true
    }
  }

  componentDidMount() {

    const project = this.props.projectsDetail[this.projectId];
    const task = this.props.tasksDetail[this.taskId];

    if (project) {
      this.setState({
        project: project,
        projectLoading: false
      });
    }

    if(task) {
      this.setState({
        task: task,
        taskLoading: false
      });
    }

    Api.get(`/projects/${this.projectId}`)
      .then(res => {

        this.setState({
          project: res.data,
          loading: false
        });

        this.props.setProjectsDetail(res.data);
      })
      .catch(err => console.log(err));


    Api.get(`/projects/${this.projectId}/tasks/${this.taskId}`)
      .then(res => {
        
        this.setState({
          task: res.data,
          taskLoading: false
        });
        
        this.props.setTasksDetail(res.data);
      })
      .catch(err => console.log(err));

  }

  render() {

    // const task = this.state.tasks;

    return (
      <div>
        <h1>{this.state.task.title}</h1>

        {/* {tasks.map(task => {
          return (
            <div key={task.id}>
              <h3><Link to={`/projects/${this.projectId}/tasks/${task.id}`}>{task.title}</Link></h3>
            </div>
          )
        })} */}

      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    projectsDetail: state.project.projectsDetail,
    tasksDetail: state.task.tasksDetail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setProjectsDetail: (project) => dispatch(setProjectsDetail(project)),
    // setProjectTasksList: (projectId, tasksList) => dispatch(setProjectTasksList(projectId, tasksList))
    setTasksDetail: (task) => dispatch(setTasksDetail(task))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);