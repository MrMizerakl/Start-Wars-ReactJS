import { getSearchQuery } from "./search";
import { getSearchType } from "./search";
import { getState } from "../config/store";

const initialState = {
  fetching: false,
  results: {}
};

const SEARCHED_SWAPI_STARTED = 'swapi/searchResults/SEARCHED_SWAPI_STARTED';
function searchedSwapiStarted(payload={ fetching:true }) {
  return {
    payload,
    type: SEARCHED_SWAPI_STARTED,
  };
}

const SEARCHED_SWAPI_SUCCESS = 'swapi/searchResults/SEARCHED_SWAPI_SUCCESS';
function searchedSwapiSuccess(payload) {
  return {
    payload: Object.assign({}, payload, { fetching:false }),
    type: SEARCHED_SWAPI_SUCCESS,
  };
}

const SEARCHED_SWAPI_FAILED = 'swapi/searchResults/SEARCHED_SWAPI_FAILED';
function searchedSwapiFailed(payload) {
  return {
    payload: Object.assign({}, payload, { fetching:false }),
    type: SEARCHED_SWAPI_FAILED,
  };
}

//                           action
export function searchSwapi(payload){
  return (dispatch) => {
    dispatch(searchedSwapiStarted(payload));
    return window
      .fetch(`https://swapi.co/api/${getSearchType()}/?search=${getSearchQuery()}`)
      .then(res => res.json())
      .then(json => dispatch(searchedSwapiSuccess(json)))
      .catch(error => dispatch(searchedSwapiFailed({ error:error.message })));
  }
}

export function doLoadSwapi(payload){
  return (dispatch) => {
    const { results, next } = getState().searchResults ;
    dispatch(searchedSwapiStarted(payload));
    return window
      .fetch(next)
      .then(res => res.json())
      .then(json => {
        dispatch(searchedSwapiSuccess({
          count: json.count,
          next: json.next,
          previous: json.previous,
          results: Array.concat(results, json.results)
        }));
      })
      .catch(error => dispatch(searchedSwapiFailed({ error:error.message })));
  }
}

export default (state = initialState, { type, payload }) => {
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
