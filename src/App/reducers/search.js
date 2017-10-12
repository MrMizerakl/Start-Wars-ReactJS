import { UPDATE_SEARCHER_QUERY, UPDATE_SEARCHER_TYPE, FETCHED_SWAPI_TYPES_STARTED, FETCHED_SWAPI_TYPES_SUCCESS, FETCHED_SWAPI_TYPES_FAILED } from './../constants';
import { search as searchInit } from './../store/initial-store';

const search = (state = searchInit, { type, payload }) => {
  switch (type) {
    case UPDATE_SEARCHER_TYPE:
      return Object.assign({}, state, payload);
    case UPDATE_SEARCHER_QUERY:
      return Object.assign({}, state, payload);
    case FETCHED_SWAPI_TYPES_STARTED:
      return Object.assign({}, state, payload);
    case FETCHED_SWAPI_TYPES_SUCCESS:
      return Object.assign({}, state, payload);
    case FETCHED_SWAPI_TYPES_FAILED:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
};

export default search;