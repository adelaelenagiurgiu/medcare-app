import axios from 'axios';

import { store } from './';
import { BOOK, APPOINTMENTS } from '../endpoints';
import { STORE_AVAILABLE_HOURS } from '../actions/types';

export default class StoreProvider {
  static async book(body) {
    await axios.post(BOOK, body).catch(err => console.log(err));
  }

  static async updateStatus(body) {
    axios
      .put(`${APPOINTMENTS}/status`, body)
      .then(response => {
        if (response.status === 200 && response.data.updated) {
          console.log('success');
        }
      })
      .catch(err => console.log(err));
  }

  static async getAvailableHours(doctor, day) {
    axios
      .get(`${APPOINTMENTS}/${doctor}/${day}`)
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
}
