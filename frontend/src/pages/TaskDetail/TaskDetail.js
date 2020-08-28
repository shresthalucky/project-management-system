import React from 'react';
import { connect } from 'react-redux';

import Api from '../../api/ApiUtils';
import { setTasksDetail } from '../../actions/taskActions';
import { setCommentsList } from '../../actions/commentActions';
import { setProjectsDetail } from '../../actions/projectActions';

class TaskDetail extends React.Component {

  constructor(props) {
    super(props);

    this.projectId = Number(props.match.params.projectId);
    this.taskId = Number(props.match.params.taskId);

    this.state = {
      project: {},
      task: {},
      comments: [],
      projectLoading: true,
      taskLoading: true,
      commentsLoading: true
    }
  }

  componentDidMount() {

    const project = this.props.projectsDetail[this.projectId];
    const task = this.props.tasksDetail[this.taskId];
    const comments = this.props.commentsList[this.taskId];

    if (project) {
      this.setState({
        project: project,
        projectLoading: false
      });
    }

    if (task) {
      this.setState({
        task: task,
        taskLoading: false
      });
    }

    if (comments) {
      this.setState({
        comments: comments,
        commentsLoading: false
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


    Api.get(`/projects/${this.projectId}/tasks/${this.taskId}/comments`)
      .then(res => {

        this.setState({
          comments: res.data,
          commentsLoading: false
        });

        this.props.setCommentsList(this.taskId, res.data);

      })
      .catch(err => console.log(err));
  }

  render() {

    const comments = this.state.comments;

    return (
      <div>
        <h1>{this.state.task.title}</h1>

        <div>
          <p>Comments</p>
          {this.state.commentsLoading ? 'loading' : comments.map(comment => {
            return (
              <div key={comment.id}>
                <p>{comment.text}</p>
              </div>
            )
          })}
        </div>

      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    projectsDetail: state.project.projectsDetail,
    tasksDetail: state.task.tasksDetail,
    commentsList: state.comment.commentsList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setProjectsDetail: (project) => dispatch(setProjectsDetail(project)),
    setTasksDetail: (task) => dispatch(setTasksDetail(task)),
    setCommentsList: (taskId, comments) => dispatch(setCommentsList(taskId, comments))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);