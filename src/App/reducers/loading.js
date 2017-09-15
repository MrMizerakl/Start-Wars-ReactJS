import {SHOW_LOADER, HIDE_LOADER} from './../constants';

const loading = (state = [], action) => {

  if ( action.type === SHOW_LOADER){
    return [...state, [{loading: true}]];
  } else if( action.type === HIDE_LOADER){
    return [...state, [{loading: false}]];
  }
  return state;
};

export default loading;
