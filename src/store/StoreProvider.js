import { Font, Asset } from 'expo';
import axios from 'axios';

import images from '../../assets';
import { store } from './';
import { BOOK, APPOINTMENTS, USERS, SECTIONS } from '../endpoints';
import {
  STORE_AVAILABLE_HOURS,
  STORE_PATIENT_APPOINTMENTS,
  STORE_SECTIONS,
  ADD_ERROR
} from '../actions/types';

export default class StoreProvider {
  static loadAssets() {
    const fontAssets = Font.loadAsync({
      enrBold: require('../../assets/fonts/Enriqueta-Bold.ttf'),
      enrRegular: require('../../assets/fonts/Enriqueta-Regular.ttf'),
      light: require('../../assets/fonts/open-sans.light.ttf'),
      'semi-bold': require('../../assets/fonts/open-sans.semibold.ttf'),
      regular: require('../../assets/fonts/open-sans.regular.ttf'),
      PTregular: require('../../assets/fonts/PT_Serif-Web-Regular.ttf'),
      PTbold: require('../../assets/fonts/PT_Serif-Web-Bold.ttf')
    });

    const imageAssets = () => {
      return images.map(image => {
        return Asset.fromModule(image).downloadAsync();
      });
    };

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

    return Promise.all([fontAssets, imageAssets]);
  }

  static async book(body) {
    const state = store.getState();

    if (state.user.role === 'patient' && state.user.id !== '') {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.user.token
        }
      };

      await axios.post(BOOK, body, config).catch(() => {
        store.dispatch({
          type: ADD_ERROR,
          payload: 'Nu s-a putut realiza programarea'
        });
      });
    }
  }

  static updateStatus(body) {
    const state = store.getState();

    if (state.user.role === 'patient' && state.user.id !== '') {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.user.token
        }
      };

      axios
        .put(`${APPOINTMENTS}/status`, body, config)
        .then(response => {
          if (response.status === 200 && response.data.updated) {
            console.log('success');
          }
        })
        .catch(() => {
          store.dispatch({
            type: ADD_ERROR,
            payload: 'Nu s-a putut realiza programarea'
          });
        });
    }
  }

  static async getAvailableHours(doctor, day, date) {
    const state = store.getState();

    if (state.user.role === 'patient' && state.user.id !== '') {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.user.token
        }
      };

      const response = await axios.get(`${USERS}/${doctor}/${day}/${date}`, config).catch(() => {
        store.dispatch({
          type: ADD_ERROR,
          payload: 'Nu s-au putut incarca orele disponibile'
        });
      });

      if (response.status === 200) {
        store.dispatch({
          type: STORE_AVAILABLE_HOURS,
          payload: response.data.hours
        });
      }
    }
  }

  static getAppointmentsForPatient(patient) {
    const state = store.getState();

    if (state.user.role === 'patient' && state.user.id !== '') {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.user.token
        }
      };

      const patientParam = encodeURIComponent(patient);
      axios
        .get(`${APPOINTMENTS}/patient/${patientParam}`, config)
        .then(response => {
          if (response.status === 200) {
            store.dispatch({
              type: STORE_PATIENT_APPOINTMENTS,
              payload: response.data.appointments
            });
          }
        })
        .catch(() => {
          store.dispatch({
            type: ADD_ERROR,
            payload: 'Nu s-au putut incarca programarile'
          });
        });
    }
  }
}
