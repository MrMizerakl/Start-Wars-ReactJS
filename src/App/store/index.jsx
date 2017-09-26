import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './../reducers';
import { customMiddleWares } from './../middlewares';
import { logger } from './../middlewares/logger';
import createHistory from 'history/CreateBrowserHistory';

export const history = createHistory();

const middleware = [customMiddleWares];
const enhancer = compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default function configureStore (initialStore) {
  return createStore(rootReducer, initialStore, enhancer);
}