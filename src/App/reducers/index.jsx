import { combineReducers } from 'redux';
import loader from './loader';
import repositories from './repositories';

const rootReducer = combineReducers({loader, repositories});

export default rootReducer;
