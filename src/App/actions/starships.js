import { LOADEDPAGE, STARSHIPS } from './../constants';
import { hideLoader, showLoader } from "./loader";

export const starships = () => {
  return (dispatch, getState) => {
    const url = 'https://swapi.co/api/starships';
    dispatch(showLoader);
    return fetch(url)
      .then( res => res.json())
      .then( json => {
        const resourceData = json;
        const countData = json.results.length;
        dispatch(hideLoader);
        return dispatch({
          type: LOADEDPAGE,
          category: STARSHIPS,
          repositories: {
            resourceData,
            countData
          }
        });
      });

  }
};