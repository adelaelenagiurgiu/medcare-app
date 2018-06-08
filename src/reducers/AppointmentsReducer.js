import {
  STORE_AVAILABLE_HOURS,
  DELETE_BOOKED_HOUR,
  STORE_PATIENT_APPOINTMENTS
} from '../actions/types';

const INITIAL_STATE = {
  availableHours: [],
  patientAppointments: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_AVAILABLE_HOURS:
      return { ...state, availableHours: action.payload };
    case DELETE_BOOKED_HOUR:
      return {
        ...state,
        availableHours: [
          ...state.availableHours.slice(0, action.payload),
          ...state.availableHours.slice(action.payload + 1)
        ]
      };
    case STORE_PATIENT_APPOINTMENTS:
      return { ...state, patientAppointments: action.payload };
    default:
      return state;
  }
};
