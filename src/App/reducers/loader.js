import { SHOW_LOADER, HIDE_LOADER } from './../constants';
import { loader } from './../store/initial-store';

const loading = (state = loader, action) => {
  if ( action.type === SHOW_LOADER){
    return Object.assign({}, state, { loading: true });
  } else if( action.type === HIDE_LOADER){
    return Object.assign({}, state, { loading: false });
  }
  return state;
};

export default loading;