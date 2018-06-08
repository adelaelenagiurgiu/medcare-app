import axios from 'axios';

import { store } from './';
import { BOOK, APPOINTMENTS, USERS, SECTIONS } from '../endpoints';
import {
  STORE_AVAILABLE_HOURS,
  STORE_PATIENT_APPOINTMENTS,
  STORE_SECTIONS
} from '../actions/types';

export default class StoreProvider {
  static getSections() {
    axios
      .get(SECTIONS)
      .then(response => {
        if (response.status === 200) {
          store.dispatch({
            type: STORE_SECTIONS,
            payload: response.data.sections
          });
        }
      })
      .catch(err => console.log(err));
  }

  static async book(body) {
    await axios.post(BOOK, body).catch(err => console.log(err));
  }

  static updateStatus(body) {
    axios
      .put(`${APPOINTMENTS}/status`, body)
      .then(response => {
        if (response.status === 200 && response.data.updated) {
          console.log('success');
        }
      })
      .catch(err => console.log(err));
  }

  static getAvailableHours(doctor, day) {
    axios
      .get(`${USERS}/${doctor}/${day}`)
      .then(response => {
        if (response.status === 200) {
          store.dispatch({
            type: STORE_AVAILABLE_HOURS,
            payload: response.data.hours
          });
        }
      })
      .catch(err => console.log(err));
  }

  static getAppointmentsForPatient(patient) {
    axios
      .get(`${APPOINTMENTS}/patient/${patient}`)
      .then(response => {
        if (response.status === 200) {
          store.dispatch({
            type: STORE_PATIENT_APPOINTMENTS,
            payload: response.data.appointments
          });
        }
      })
      .catch(err => console.log(err));
  }
}
