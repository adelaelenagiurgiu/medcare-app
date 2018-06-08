import {
  STORE_AVAILABLE_HOURS,
  DELETE_BOOKED_HOUR,
  STORE_PATIENT_APPOINTMENTS,
  ADD_PATIENT_APPOINTMENT,
  CLEAR_PATIENT_APPOINTMENTS
} from '../actions/types';

const INITIAL_STATE = {
  availableHours: [],
  patientAppointments: []
};

const DEFAULT_APPOINTMENT = {
  patient: '',
  doctor: '',
  weekDay: '',
  date: {
    day: '',
    month: '',
    year: ''
  },
  start: '',
  end: ''
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
    // eslint-disable-next-line
    case ADD_PATIENT_APPOINTMENT:
      const newAppointment = Object.assign({}, DEFAULT_APPOINTMENT, action.payload);
      return Object.assign({}, state, {
        patientAppointments: [...state.patientAppointments, newAppointment]
      });
    case CLEAR_PATIENT_APPOINTMENTS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
