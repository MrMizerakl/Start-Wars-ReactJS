import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
// import { customMiddleWares } from './../middlewares';
import thunk from 'redux-thunk';
import createHistory from 'history/CreateBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
// import { logger } from './../middlewares/logger';

export const history = createHistory();

const middleware = [thunk, routerMiddleware(history)];
const enhancer = compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default function configureStore (initialStore) {
  return createStore(rootReducer, initialStore, enhancer);
}