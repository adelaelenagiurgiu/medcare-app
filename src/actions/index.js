import { STORE_USER, CLEAR_USER, STORE_SECTIONS } from './types';

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
