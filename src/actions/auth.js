import { AsyncStorage } from 'react-native';
import axios from 'axios';

import StoreProvider from '../store/StoreProvider';
import { STORE_USER, STORE_PATIENT_DATA, ADD_ERROR } from './types';
import { REGISTER, LOGIN } from '../endpoints';

export const register = (user, patient) => dispatch => {
  axios
    .post(REGISTER, user)
    .then(response => {
      const { token } = response.data;
      if (token) {
        loginHelper({ email: user.email, password: user.password }, patient, dispatch);
      } else {
        dispatch({ type: ADD_ERROR, payload: 'Nu s-a putut inregistra contul' });
      }
    })
    .catch(err => {
      if (String(err).includes('422')) {
        dispatch({ type: ADD_ERROR, payload: 'Adresa de email este deja inregistrata' });
      } else {
        dispatch({ type: ADD_ERROR, payload: 'Nu s-a putut inregistra contul' });
      }
    });
};

const loginHelper = async (user, patient, dispatch) => {
  axios
    .post(LOGIN, { email: user.email, password: user.password })
    .then(async response => {
      const { _id, email, role } = response.data.user;
      const { token } = response.data;
      const userObject = {
        id: _id,
        email,
        role,
        token
      };

      await AsyncStorage.setItem('token', token);
      dispatch({ type: STORE_USER, payload: userObject });
      await StoreProvider.addPatient(patient);
      dispatch({ type: STORE_PATIENT_DATA, payload: patient });
    })
    .catch(err => {
      if (String(err).includes('401')) {
        dispatch({ type: ADD_ERROR, payload: 'Contul nu exista' });
      } else {
        dispatch({ type: ADD_ERROR, payload: 'Nu s-a putut intra in cont' });
      }
    });
};

export const login = user => dispatch => {
  axios
    .post(LOGIN, user)
    .then(async response => {
      const { _id, email, role } = response.data.user;
      const { token } = response.data;
      const userObject = {
        id: _id,
        email,
        role,
        token
      };

      await AsyncStorage.setItem('token', token);
      dispatch({ type: STORE_USER, payload: userObject });
    })
    .catch(err => {
      if (String(err).includes('401')) {
        dispatch({ type: ADD_ERROR, payload: 'Contul nu exista' });
      } else {
        dispatch({ type: ADD_ERROR, payload: 'Nu s-a putut intra in cont' });
      }
    });
};
