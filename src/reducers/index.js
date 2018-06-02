import { combineReducers } from 'redux';
import SectionsReducers from './SectionsReducers';
import UserReducer from './UserReducer';
import AppointmentsReducer from './AppointmentsReducer';

export default combineReducers({
  sectionsArray: SectionsReducers,
  user: UserReducer,
  appointments: AppointmentsReducer
});
