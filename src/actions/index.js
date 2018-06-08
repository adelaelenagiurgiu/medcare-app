import {
  STORE_USER,
  CLEAR_USER,
  STORE_SECTIONS,
  DELETE_BOOKED_HOUR,
  STORE_PATIENT_APPOINTMENTS
} from './types';

export const storeUser = user => {
  return {
    type: STORE_USER,
    payload: user
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER
  };
};

export const storeSections = sections => {
  return {
    type: STORE_SECTIONS,
    payload: sections
  };
};

export const deleteBookedHour = index => {
  return {
    type: DELETE_BOOKED_HOUR,
    payload: index
  };
};

// export const storePatientAppointments = appointments => {
//   return {
//     type: STORE_PATIENT_APPOINTMENTS,
//     payload: appointments
//   };
// };
