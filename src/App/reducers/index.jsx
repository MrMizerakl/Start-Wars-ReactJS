import { combineReducers } from 'redux';
import loader from './loader';
import repositories from './repositories';
import { routerReducer as router } from 'react-router-redux';

const rootReducer = combineReducers({router, loader, repositories});

export default rootReducer;
