import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import rootReducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = applyMiddleware(promise);

const configureStore = initialState => createStore(rootReducer, initialState, composeEnhancers(enhancer));
export default configureStore();
