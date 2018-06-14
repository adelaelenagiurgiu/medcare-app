import { Font, Asset } from 'expo';
import axios from 'axios';

import images from '../../assets';
import { store } from './';
import { BOOK, APPOINTMENTS, USERS, SECTIONS, PATIENTS, DOCTORS } from '../endpoints';
import {
  STORE_AVAILABLE_HOURS,
  STORE_PATIENT_APPOINTMENTS,
  STORE_DOCTOR_APPOINTMENTS,
  UPDATE_APPOINTMENT,
  STORE_SECTIONS,
  DELETE_APPOINTMENT,
  STORE_PATIENT_DATA,
  STORE_DOCTOR_DATA,
  STORE_DOCTOR_PATIENTS,
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

    return Promise.all([fontAssets, imageAssets]);
  }

  static async getSections() {
    const response = await axios.get(SECTIONS).catch(() => {
      store.dispatch({
        type: ADD_ERROR,
        payload: 'Nu s-au putut incarca datele aplicatiei'
      });
    });

    if (response.status === 200) {
      store.dispatch({
        type: STORE_SECTIONS,
        payload: response.data.sections
      });
    }
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

  static async getAppointmentsForPatient(patient) {
    const state = store.getState();

    if (state.user.role === 'patient' && state.user.id !== '') {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.user.token
        }
      };

      const patientParam = encodeURIComponent(patient);

      const response = await axios
        .get(`${APPOINTMENTS}/patient/${patientParam}`, config)
        .catch(() => {
          store.dispatch({
            type: ADD_ERROR,
            payload: 'Nu s-au putut incarca programarile'
          });
        });

      if (response.status === 200) {
        store.dispatch({
          type: STORE_PATIENT_APPOINTMENTS,
          payload: response.data.appointments
        });
      }
    }
  }

  static async updateAppointment(id, body) {
    const state = store.getState();

    if (state.user.role === 'doctor' && state.user.id !== '') {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.user.token
        }
      };

      const response = await axios.put(`${APPOINTMENTS}/update/${id}`, body, config).catch(() => {
        store.dispatch({
          type: ADD_ERROR,
          payload: 'Nu s-a putut adauga vizita'
        });
      });

      if (response.status === 200) {
        store.dispatch({
          type: UPDATE_APPOINTMENT,
          payload: {
            id,
            updatedAppointment: response.data.appointment
          }
        });
      }
    }
  }

  static async deleteAppointment(id) {
    const state = store.getState();

    if (state.user.role === 'patient' && state.user.id !== '') {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.user.token
        }
      };

      // axios.interceptors.request.use(request => {
      //   console.log('Starting Request', request);
      //   return request;
      // });

      const response = await axios.delete(`${APPOINTMENTS}/delete/${id}`, config).catch(() => {
        store.dispatch({
          type: ADD_ERROR,
          payload: 'Nu s-a putut sterge programarea'
        });
      });

      if (response.status === 200 && response.data.deleted) {
        store.dispatch({
          type: DELETE_APPOINTMENT,
          payload: id
        });
      }
    }
  }

  static async addPatient(patient) {
    const state = store.getState();

    if (state.user.role === 'patient' && state.user.id !== '') {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.user.token
        }
      };

      const response = await axios.post(`${PATIENTS}/add`, patient, config).catch(() => {
        store.dispatch({
          type: ADD_ERROR,
          payload: 'Nu s-a putut creea contul'
        });
      });

      if (response.status === 200 && response.data.patient) {
        store.dispatch({
          type: STORE_PATIENT_DATA,
          payload: response.data.patient
        });
      }
    }
  }

  static async getPatient(email) {
    const state = store.getState();

    if (state.user.role === 'patient' && state.user.id !== '') {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.user.token
        }
      };

      const patientResponse = await axios.get(`${PATIENTS}/${email}`, config).catch(() => {
        store.dispatch({
          type: ADD_ERROR,
          payload: 'Nu s-au putut prelua datele dumneavoastra'
        });
      });

      if (patientResponse.status === 200 && patientResponse.data) {
        store.dispatch({
          type: STORE_PATIENT_DATA,
          payload: patientResponse.data
        });
      }

      const patientName = encodeURIComponent(patientResponse.data.patientName);

      const appointmentsResponse = await axios
        .get(`${APPOINTMENTS}/patient/${patientName}`, config)
        .catch(() => {
          store.dispatch({
            type: ADD_ERROR,
            payload: 'Nu s-au putut incarca programarile'
          });
        });

      if (appointmentsResponse.status === 200) {
        store.dispatch({
          type: STORE_PATIENT_APPOINTMENTS,
          payload: appointmentsResponse.data.appointments
        });
      }
    }
  }

  static async getDoctor(email) {
    const state = store.getState();

    if (state.user.role === 'doctor' && state.user.id !== '') {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.user.token
        }
      };

      const doctorResponse = await axios.get(`${DOCTORS}/${email}`, config).catch(() => {
        store.dispatch({
          type: ADD_ERROR,
          payload: 'Nu s-au putut prelua datele dumneavoastra'
        });
      });

      if (doctorResponse.status === 200 && doctorResponse.data) {
        store.dispatch({
          type: STORE_DOCTOR_DATA,
          payload: doctorResponse.data
        });
      }

      const doctorName = encodeURIComponent(doctorResponse.data.doctorName);

      const appointmentsResponse = await axios
        .get(`${APPOINTMENTS}/doctor/${doctorName}`, config)
        .catch(() => {
          store.dispatch({
            type: ADD_ERROR,
            payload: 'Nu s-au putut incarca programarile'
          });
        });

      if (appointmentsResponse.status === 200) {
        store.dispatch({
          type: STORE_DOCTOR_APPOINTMENTS,
          payload: appointmentsResponse.data.appointments
        });
      }

      const patientsResponse = await axios
        .get(`${DOCTORS}/patients/${doctorName}`, config)
        .catch(() => {
          store.dispatch({
            type: ADD_ERROR,
            payload: 'Nu s-au putut incarca datele pacientilor'
          });
        });

      if (patientsResponse.status === 200 && patientsResponse.data) {
        store.dispatch({
          type: STORE_DOCTOR_PATIENTS,
          payload: patientsResponse.data
        });
      }
    }
  }

  static async getAppointmentsForDoctor(doctor) {
    const state = store.getState();

    if (state.user.role === 'doctor' && state.user.id !== '') {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.user.token
        }
      };

      const doctorParam = encodeURIComponent(doctor);

      const response = await axios
        .get(`${APPOINTMENTS}/doctor/${doctorParam}`, config)
        .catch(() => {
          store.dispatch({
            type: ADD_ERROR,
            payload: 'Nu s-au putut incarca programarile'
          });
        });

      if (response.status === 200) {
        store.dispatch({
          type: STORE_DOCTOR_APPOINTMENTS,
          payload: response.data.appointments
        });
      }
    }
  }

  static async getPatientsForDoctor(name) {
    const state = store.getState();

    if (state.user.role === 'doctor' && state.user.id !== '') {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.user.token
        }
      };

      const nameParam = encodeURIComponent(name);

      const response = await axios.get(`${DOCTORS}/patients/${nameParam}`, config).catch(() => {
        store.dispatch({
          type: ADD_ERROR,
          payload: 'Nu s-au putut incarca datele pacientilor'
        });
      });

      if (response.status === 200 && response.data) {
        store.dispatch({
          type: STORE_DOCTOR_PATIENTS,
          payload: response.data
        });
      }
    }
  }
}
