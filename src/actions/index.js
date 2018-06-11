import {
  STORE_USER,
  CLEAR_USER,
  STORE_SECTIONS,
  DELETE_BOOKED_HOUR,
  CLEAR_AVAILABLE_HOURS,
  ADD_PATIENT_APPOINTMENT,
  CLEAR_PATIENT_APPOINTMENTS,
  CLEAR_PATIENT_DATA,
  ADD_ERROR,
  CLEAR_ERROR
} from './types';

// ====================================
// User actions
// ====================================

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

// ====================================
// Section actions
// ====================================

export const storeSections = sections => {
  return {
    type: STORE_SECTIONS,
    payload: sections
  };
};

// ====================================
// Available hours actions
// ====================================

export const deleteBookedHour = index => {
  return {
    type: DELETE_BOOKED_HOUR,
    payload: index
  };
};

export const clearAvailableHours = () => {
  return {
    type: CLEAR_AVAILABLE_HOURS
  };
};

// ====================================
// Patient actions
// ====================================

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

export const clearPatientData = () => {
  return {
    type: CLEAR_PATIENT_DATA
  };
};

// ====================================
// Error actions
// ====================================

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
