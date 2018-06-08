import {
  STORE_USER,
  CLEAR_USER,
  STORE_SECTIONS,
  DELETE_BOOKED_HOUR,
  ADD_PATIENT_APPOINTMENT,
  CLEAR_PATIENT_APPOINTMENTS,
  ADD_ERROR,
  CLEAR_ERROR
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

export const addPatientAppointment = appointment => {
  return {
    type: ADD_PATIENT_APPOINTMENT,
    payload: appointment
  };
};

export const clearPatientAppointments = () => {
  return {
    type: CLEAR_PATIENT_APPOINTMENTS
  };
};

export const addError = text => {
  return {
    type: ADD_ERROR,
    payload: text
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  };
};
