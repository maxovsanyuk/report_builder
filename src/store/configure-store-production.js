import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import promise from 'redux-promise';
import rootReducer from '../reducers';

const enhancer = applyMiddleware(promise);


const configureStore = initialState => createStore(rootReducer, initialState, enhancer);

export default configureStore();