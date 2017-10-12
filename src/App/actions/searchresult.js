import { SEARCHED_SWAPI_STARTED, SEARCHED_SWAPI_SUCCESS, SEARCHED_SWAPI_FAILED } from './../constants';
import { getSearchQuery } from "./search";
import { getSearchType } from "./search";

const searchedSwapiStarted = (payload={ fetching:true }) => {
  return {
    payload,
    type: SEARCHED_SWAPI_STARTED,
  };
};

const searchedSwapiSuccess = (payload) => {
  return {
    payload: Object.assign({}, payload, { fetching:false }),
    type: SEARCHED_SWAPI_SUCCESS,
  };
};

const searchedSwapiFailed = (payload) => {
  return {
    payload: Object.assign({}, payload, { fetching:false }),
    type: SEARCHED_SWAPI_FAILED,
  };
};

export const searchSwapi = (payload) => {
  return (dispatch) => {
    dispatch(searchedSwapiStarted(payload));
    return window
      .fetch(`https://swapi.co/api/${getSearchType()}/?search=${getSearchQuery()}`)
      .then(res => res.json())
      .then(json => dispatch(searchedSwapiSuccess(json)))
      .catch(error => dispatch(searchedSwapiFailed({ error:error.message })));
  }
};

export const doLoadSwapi = (payload) => {
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
};

