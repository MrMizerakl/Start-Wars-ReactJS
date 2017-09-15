import {SHOW_LOADER, HIDE_LOADER} from './../constants';

const repositories = (state = false, action) => {

  if ( action.type === SHOW_LOADER){
    return true;
  } else if( action.type === HIDE_LOADER){
    return false;
  }
  return state;
};

export default repositories;
