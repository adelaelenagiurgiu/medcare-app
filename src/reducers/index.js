import { combineReducers } from 'redux';
import SectionsReducers from './SectionsReducers';
import UserReducer from './UserReducer';

export default combineReducers({
  sectionsArray: SectionsReducers,
  user: UserReducer
});
