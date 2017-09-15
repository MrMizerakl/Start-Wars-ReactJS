import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './../reducers';
import { customMiddleWares } from './../middlewares';
import { logger } from './../middlewares/logger';

const middleware = [customMiddleWares, logger];
const enhancer = compose(applyMiddleware(...middleware));

export default function configureStore (initialStore) {
  return createStore(rootReducer, initialStore, enhancer);
}