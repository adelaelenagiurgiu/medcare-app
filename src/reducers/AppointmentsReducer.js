import {
  STORE_AVAILABLE_HOURS,
  DELETE_BOOKED_HOUR,
  CLEAR_AVAILABLE_HOURS,
  STORE_PATIENT_APPOINTMENTS,
  ADD_PATIENT_APPOINTMENT,
  DELETE_APPOINTMENT,
  CLEAR_PATIENT_APPOINTMENTS
} from '../actions/types';

const INITIAL_STATE = {
  availableHours: [],
  patientAppointments: []
};

const DEFAULT_APPOINTMENT = {
  patient: '',
  doctor: '',
  doctorImage: '',
  weekDay: '',
  date: {
    day: '',
    month: '',
    year: ''
  },
  start: '',
  end: '',
  analysis: '',
  disease: '',
  medication: '',
  results: []
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
    case CLEAR_AVAILABLE_HOURS: {
      return {
        ...state,
        availableHours: []
      };
    }
    case STORE_PATIENT_APPOINTMENTS:
      return { ...state, patientAppointments: action.payload };
    // eslint-disable-next-line
    case ADD_PATIENT_APPOINTMENT:
      const newAppointment = Object.assign({}, DEFAULT_APPOINTMENT, action.payload);
      return Object.assign({}, state, {
        patientAppointments: [...state.patientAppointments, newAppointment]
      });
    case DELETE_APPOINTMENT: {
      return {
        ...state,
        patientAppointments: state.patientAppointments.filter(
          appointment => appointment._id !== action.payload
        )
      };
    }
    case CLEAR_PATIENT_APPOINTMENTS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
