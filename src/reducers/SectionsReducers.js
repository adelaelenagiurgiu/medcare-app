import { STORE_SECTIONS, USER_LOGOUT } from '../actions/types';

const INITIAL_STATE = {
  sections: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_SECTIONS:
      return { ...state, sections: action.payload };
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
