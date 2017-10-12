import { SEARCHED_SWAPI_STARTED, SEARCHED_SWAPI_SUCCESS, SEARCHED_SWAPI_FAILED } from './../constants';
import { searchResult as searchResultInit } from './../store/initial-store'

const searchResult = (state = searchResultInit, { type, payload }) => {
  switch (type) {
    case SEARCHED_SWAPI_STARTED:
      return Object.assign({}, state, payload);
    case SEARCHED_SWAPI_SUCCESS:
      return Object.assign({}, state, payload);
    case SEARCHED_SWAPI_FAILED:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
};

export default searchResult;