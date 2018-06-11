import { STORE_PATIENT_DATA, CLEAR_PATIENT_DATA } from '../actions/types';

const INITIAL_STATE = {
  patient: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_PATIENT_DATA:
      return { ...state, patient: Object.assign(state.patient, action.payload) };
    case CLEAR_PATIENT_DATA:
      return INITIAL_STATE;
    default:
      return state;
  }
};
