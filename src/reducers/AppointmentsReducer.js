import { STORE_AVAILABLE_HOURS } from '../actions/types';

const INITIAL_STATE = {
  availableHours: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_AVAILABLE_HOURS:
      return { ...state, availableHours: action.payload };
    default:
      return state;
  }
};
