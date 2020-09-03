import { SET_ERROR_ALERT, SET_SUCCESS_ALERT, UNSET_ALERT } from '../actions/alertActions';

const INITIAL = {
  type: '',
  message: ''
};

function alertReducer(state = INITIAL, action) {
  switch (action.type) {
    case SET_ERROR_ALERT:
      return {
        type: 'ERROR',
        message: action.payload
      };

    case SET_SUCCESS_ALERT:
      return {
        type: 'SUCCESS',
        message: action.payload
      };

    case UNSET_ALERT:
      return INITIAL;

    default:
      return state;
  }
}

export default alertReducer;
