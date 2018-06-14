import { STORE_DOCTOR_DATA, STORE_DOCTOR_PATIENTS, USER_LOGOUT } from '../actions/types';

const INITIAL_STATE = {
  doctor: {},
  patients: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_DOCTOR_DATA:
      return { ...state, patient: Object.assign(state.doctor, action.payload) };
    case STORE_DOCTOR_PATIENTS:
      return { ...state, patients: action.payload };
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
