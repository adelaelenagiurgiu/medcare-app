import { STORE_USER, CLEAR_USER } from '../actions/types';

const INITIAL_STATE = {
  id: '',
  email: '',
  gender: '',
  name: '',
  street: '',
  postalCode: '',
  phone: '',
  city: '',
  country: '',
  weight: '',
  height: '',
  role: '',
  token: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_USER:
      return Object.assign({}, state, action.payload);
    case CLEAR_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
