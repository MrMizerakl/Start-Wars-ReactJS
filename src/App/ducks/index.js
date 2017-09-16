import { combineReducers } from 'redux';
import search from './search';
import searchResult from './searchResult';

export default combineReducers({
  search,
  searchResult
});
