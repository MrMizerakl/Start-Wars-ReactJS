import { LOADEDPAGE } from './../constants';

const repositories = (state = [], action) => {
  if (action.type === LOADEDPAGE){
    return [...state, [action.category], ...action.repositories.resourceData];
  }
  return state;
};

export default repositories;