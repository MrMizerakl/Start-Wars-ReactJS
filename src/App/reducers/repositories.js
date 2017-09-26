import { LOADEDPAGE, UPDATE_SEARCH_TYPE, UPDATE_SEARCH_QUERY, UPDATE_SEARCH_PARAMETERS } from './../constants';
import { initialStore } from './../store/initial-store';

const repositories = (state = initialStore, action) => {
  switch(action.type){
    case LOADEDPAGE:
      return Object.assign({}, state, action.repositories);
    case UPDATE_SEARCH_PARAMETERS:
      return Object.assign({}, state, action.repositories);
  }
  return state;
};

export default repositories;