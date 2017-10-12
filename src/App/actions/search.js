import { UPDATE_SEARCHER_QUERY, UPDATE_SEARCHER_TYPE, FETCHED_SWAPI_TYPES_STARTED, FETCHED_SWAPI_TYPES_SUCCESS, FETCHED_SWAPI_TYPES_FAILED } from './../constants';

export const getSearch = () => {
  return getState().search;
};

export const getSearchQuery = () => {
  return getSearch().query;
};

export const getSearchType = () => {
  return getSearch().type;
};

const fetchSwapiTypesStarted = (payload={ fetch:true }) => {
  return {
    payload,
    type: FETCHED_SWAPI_TYPES_STARTED,
  };
};

const fetchSwapiTypesSuccess = (payload) => {
  return {
    payload: Object.assign({}, payload, { fetch:false }),
    type: FETCHED_SWAPI_TYPES_SUCCESS,
  };
};

const fetchSwapiTypesFailed = (payload) => {
  return {
    payload: Object.assign({}, payload, { fetch:false }),
    type: FETCHED_SWAPI_TYPES_FAILED,
  };
};

export const updateSearchType = (payload) => {
  return {
    payload,
    type: UPDATE_SEARCHER_TYPE,
  };
};

export const updateSearchQuery = (payload) => {
  return {
    payload,
    type: UPDATE_SEARCHER_QUERY,
  };
};

export const fetchSwapiTypes = (payload) => {
  return (dispatch) => {
    dispatch(fetchSwapiTypesStarted(payload));
    return window
      .fetch('https://swapi.co/api/')
      .then(res => res.json())
      .then((json) => {
        const types = Object.keys(json);
        dispatch(updateSearchType({type: types[0] || ''}));
        dispatch(fetchSwapiTypesSuccess({ types }));
      })
      .catch(error => dispatch(fetchSwapiTypesFailed({ error:error.message })));
  }
};