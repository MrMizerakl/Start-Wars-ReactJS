import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './../reducers';
import {customMiddleWares} from './../middlewares';

const middleware = [customMiddleWares];
const enhancer = compose(applyMiddleware(...middleware));

export default function configureStore (initialStore) {
  return createStore(rootReducer, initialStore, enhancer);
}