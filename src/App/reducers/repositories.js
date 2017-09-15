import { LOADEDPAGE } from './../constants';

const repositories = (state = [], action) => {
  if (action.type === LOADEDPAGE){
    // console.log('people-reducer', action);
    // console.log('...action.category',[...action.category]);
    // console.log('action.category',action.category);
    // console.log('...action.repositories',[...action.repositories]);
    // console.log('action.repositories',action.repositories);
    console.log('result', [...state, ...action.category, ...action.parameters, ...action.repositories]);
    console.log('result now', [...state, {'category': action.category}, {'repositories': action.repositories}]);

    return [...state, ...action.category, ...action.parameters, ...action.repositories];
  }
  return state;
};

export default repositories;