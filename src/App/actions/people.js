import { LOADEDPAGE, PEOPLE } from './../constants';
import { hideLoader, showLoader } from "./loader";

export const people = () => {
  return (dispatch, getState) => {
    const url = 'https://swapi.co/api/people';
    dispatch(showLoader);
    return fetch(url)
      .then( res => res.json())
      .then( json => {
        const resourceData = json;
        const countData = json.results.length;
        dispatch(hideLoader);
        return dispatch({
          type: LOADEDPAGE,
          category: PEOPLE,
          repositories: {
            resourceData,
            countData
          }
        });
      });

  }
};