import React from 'react';
import { connect } from 'react-redux';

import Api from '../../api/ApiUtils';

class Project extends React.Component {

  render() {

    return (
      <div>
        <div>Project</div>

      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Project);
