import { LOADEDPAGE, PEOPLE } from './../constants';
import { hideLoader, showLoader } from "./loader";

export const people = () => {
  return (dispatch, getState) => {
    const url = 'https://swapi.co/api/people';
    dispatch(showLoader);
    return fetch(url)
      .then( res => res.json())
      .then( json => {


        const resourceData = json.results,
              countAll = json.count,
              urlNext = json.next,
              urlPrevious = json.previous;
        // const countData = json.results.length;
        console.log('people-action-4', json.results);
        dispatch(hideLoader);
        return dispatch({
          type: LOADEDPAGE,
          category: [{category:PEOPLE}],
          repositories: [{resourceData}],
          parameters: [{parameters:{count: countAll, next: urlNext, previous: urlPrevious}}]
        });
      });

  }
};