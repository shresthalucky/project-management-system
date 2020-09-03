import store from '../store';
import { setErrorAlert } from '../actions/alertActions';

export function handleError(err) {
  if (err.response) {
    store.dispatch(setErrorAlert(err.response.data.message));
  } else {
    store.dispatch(setErrorAlert('Connection error'));
  }
}
