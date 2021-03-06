import { combineReducers } from 'redux';
import SectionsReducers from './SectionsReducers';
import UserReducer from './UserReducer';
import AppointmentsReducer from './AppointmentsReducer';
import ErrorReducer from './ErrorReducer';
import PatientReducer from './PatientReducer';
import DoctorReducer from './DoctorReducer';

export default combineReducers({
  sectionsArray: SectionsReducers,
  user: UserReducer,
  appointments: AppointmentsReducer,
  errors: ErrorReducer,
  patient: PatientReducer,
  doctor: DoctorReducer
});
