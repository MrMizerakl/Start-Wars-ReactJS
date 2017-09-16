import { getState } from "./../config/store";

const initialState = {
  type: '',
  query: '',
  types: [],
  fetch: false,
};

export function getSearch() {
  return getState().search;
}

export function getSearchQuery(){
  console.log('query', getSearch() );
  return getSearch().query;
}

export function getSearchType(){
  return getSearch().type;
}

const FETCHED_SWAPI_TYPES_STARTED = 'swapi/search/FETCHED_SWAPI_TYPES_STARTED';
function fetchSwapiTypesStarted(payload={ fetch:true }) {
  return {
    payload,
    type: FETCHED_SWAPI_TYPES_STARTED,
  };
}

const FETCHED_SWAPI_TYPES_SUCCESS = 'swapi/search/FETCHED_SWAPI_TYPES_SUCCESS';
function fetchSwapiTypesSuccess(payload) {
  return {
    payload: Object.assign({}, payload, { fetch:false }),
    type: FETCHED_SWAPI_TYPES_SUCCESS,
  };
}

const FETCHED_SWAPI_TYPES_FAILED = 'swapi/search/FETCHED_SWAPI_TYPES_FAILED';
function fetchSwapiTypesFailed(payload) {
  return {
    payload: Object.assign({}, payload, { fetch:false }),
    type: FETCHED_SWAPI_TYPES_FAILED,
  };
}

const UPDATE_SEARCH_TYPE = 'swapi/search/UPDATE_SEARCH_TYPE';
export function updateSearchType(payload) {
  return {
    payload,
    type: UPDATE_SEARCH_TYPE,
  };
}

const UPDATE_SEARCH_QUERY = 'swapi/search/UPDATE_SEARCH_QUERY';
export function updateSearchQuery(payload) {
  return {
    payload,
    type: UPDATE_SEARCH_QUERY,
  };
}

//                              action
export function fetchSwapiTypes(payload){
  return (dispatch) => {
    dispatch(fetchSwapiTypesStarted(payload));

    return   window
      .fetch('https://swapi.co/api/')
      .then(res => res.json())
      .then((json) => {
        const types = Object.keys(json);
        dispatch(updateSearchType({type: types[0] || ''}));
        dispatch(fetchSwapiTypesSuccess({ types }));
      })
      .catch(error => dispatch(fetchSwapiTypesFailed({ error:error.message })));
  }
}

export default (state = initialState, { type, payload }) => {
  console.log('action', type, payload);
  switch (type) {
    case UPDATE_SEARCH_TYPE:
      return Object.assign({}, state, payload);
    case UPDATE_SEARCH_QUERY:
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
