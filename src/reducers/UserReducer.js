import { STORE_USER, USER_LOGOUT } from '../actions/types';

const INITIAL_STATE = {
  id: '',
  email: '',
  role: '',
  token: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_USER:
      return Object.assign({}, state, action.payload);
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
