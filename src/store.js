import { combineReducers, createStore } from 'redux';
import nameReducer from './Reducers/CartReducer'
import authReducer from './Reducers/AuthReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: nameReducer
});

const store = createStore(rootReducer);

export default store;
