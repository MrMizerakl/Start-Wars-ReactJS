import { LOADEDPAGE, PEOPLE } from './../constants';
import { hideLoader, showLoader } from "./loader";
import { repositories } from './../store/initial-store';

export const people = () => {
  return (dispatch, getState) => {
    let data = getState();
    dispatch(showLoader());
    if( data.repositories.category && data.repositories.category !== PEOPLE){
      data.repositories = repositories;
    }
    const next = data.repositories.parameters && data.repositories.parameters.next ? data.repositories.parameters.next : 'https://swapi.co/api/people';
    return fetch(next)
      .then( res => res.json())
      .then( json => {
        const resourceData = Array.concat(data.repositories.resourceData, json.results),
              countAll = json.count,
              urlNext = json.next,
              urlPrevious = json.previous;
        dispatch(hideLoader());
        return dispatch({
          type: LOADEDPAGE,
          repositories: {
            category: PEOPLE,
            parameters: {count: countAll, next: urlNext, previous: urlPrevious},
            resourceData
          }
        });
      }
    ) ;
  }
};
