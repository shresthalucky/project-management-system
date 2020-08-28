import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Api from '../../api/ApiUtils';
import { setProjectsList } from '../../actions/projectActions';

class Project extends React.Component {

  componentDidMount() {
    Api.get('/projects')
      .then(res => {        
        this.props.setProjectsList(res.data);
      })
      .catch(err => console.log(err));
  }

  render() {

    const projects = this.props.projectsList;

    return (
      <div>
        {projects.map(project => {
          return (
            <div key={project.id}>
              <h3>
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
              </h3>
            </div>
          );
        })}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    projectsList: state.project.projectsList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setProjectsList: (projects) => dispatch(setProjectsList(projects))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
