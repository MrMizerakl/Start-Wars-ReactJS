import { combineReducers } from 'redux';
import loader from './loader';
import search from './search';
import searchResult from './searchresult';
import repositories from './repositories';
import { routerReducer as router } from 'react-router-redux';

const rootReducer = combineReducers({router, loader, search, searchResult, repositories});

export default rootReducer;
